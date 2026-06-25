function arrayToBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function verifyToken(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const encoder = new TextEncoder();
    const data = encoder.encode(parts[0] + '.' + parts[1]);
    const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    let sigStr = parts[2].replace(/-/g, '+').replace(/_/g, '/');
    while (sigStr.length % 4) sigStr += '=';
    const sigBytes = Uint8Array.from(atob(sigStr), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, data);
    if (!valid) return null;
    let payloadStr = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (payloadStr.length % 4) payloadStr += '=';
    return JSON.parse(atob(payloadStr));
  } catch { return null; }
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization' },
    });
  }

  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const payload = await verifyToken(token, env.JWT_SECRET || 'alla-secret-key-change-me');
  if (!payload) {
    return r({ error: 'unauthorized' }, 401);
  }

  let gitPath = url.pathname.replace(/^\/api\/git\//, '');
  gitPath = gitPath.replace(/^github\//, '');
  const githubToken = env.GITHUB_PAT;
  if (!githubToken) return r({ error: 'github_pat_not_set' }, 500);

  const repoApiBase = 'https://api.github.com/repos/porustzi/alla';
  let targetUrl, targetMethod = request.method;

  if (gitPath === 'branches') {
    targetUrl = `${repoApiBase}/branches`;
    targetMethod = 'GET';
  } else if (gitPath.startsWith('contents/')) {
    const filePath = gitPath.replace('contents/', '');
    if (request.method === 'GET') {
      targetUrl = `${repoApiBase}/contents/${filePath}?ref=${url.searchParams.get('ref') || 'master'}`;
    } else {
      targetUrl = `${repoApiBase}/contents/${filePath}`;
      targetMethod = 'PUT';
    }
  } else {
    targetUrl = `${repoApiBase}/${gitPath}`;
  }

  if (!targetUrl) return r({ error: 'invalid_path' }, 400);

  const ghHeaders = {
    'Authorization': `Bearer ${githubToken}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'alla-cms',
    'Content-Type': 'application/json',
  };

  let ghBody = null;
  if (request.method === 'POST' || targetMethod === 'PUT') {
    try {
      const reqText = await request.text();
      const reqBody = JSON.parse(reqText);
      ghBody = { ...reqBody };
      if (ghBody.content && typeof ghBody.content === 'string') {
        const bytes = new TextEncoder().encode(ghBody.content);
        ghBody.content = arrayToBase64(bytes);
      }
    } catch (e) {
      return r({ error: 'body_parse_error', detail: e.message }, 400);
    }
  }

  try {
    const ghRes = await fetch(targetUrl, {
      method: targetMethod,
      headers: ghHeaders,
      body: ghBody ? JSON.stringify(ghBody) : null,
    });
    const ghData = await ghRes.json();
    if (!ghRes.ok) {
      return r({ error: 'github_error', status: ghRes.status, details: ghData }, ghRes.status);
    }

    if (targetMethod === 'PUT') {
      const cfToken = env.CF_API_TOKEN;
      const cfAccount = env.CF_ACCOUNT_ID;
      const ghPat = env.GITHUB_PAT;
      if (cfToken && cfAccount && ghPat) {
        context.waitUntil((async () => {
          try {
            await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccount}/pages/projects/alla-v/deployments`, {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${cfToken}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ branch: 'master' }),
            });
          } catch {}
        })());
      }
    }

    return r(ghData);
  } catch (e) {
    return r({ error: 'proxy_error', detail: e.message }, 502);
  }
}

function r(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

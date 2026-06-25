async function verifyToken(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const encoder = new TextEncoder();
  const data = encoder.encode(parts[0] + '.' + parts[1]);
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const sigBytes = Uint8Array.from(atob(parts[2].replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
  const valid = await crypto.subtle.verify('HMAC', key, sigBytes, data);
  if (!valid) return null;
  const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

function atobUrl(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const payload = await verifyToken(token, env.JWT_SECRET || 'alla-secret-key-change-me');
  if (!payload) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  let gitPath = url.pathname.replace(/^\/api\/git\//, '');
  gitPath = gitPath.replace(/^github\//, '');
  const githubToken = env.GITHUB_PAT;

  if (!githubToken) {
    return new Response(JSON.stringify({ error: 'GitHub PAT not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const repoApiBase = 'https://api.github.com/repos/porustzi/alla';

  let targetUrl;
  let targetMethod = request.method;

  if (gitPath === 'branches') {
    targetUrl = `${repoApiBase}/branches`;
    targetMethod = 'GET';
  } else if (gitPath.startsWith('contents/')) {
    const filePath = gitPath.replace('contents/', '');
    if (request.method === 'GET') {
      const branch = url.searchParams.get('ref') || 'master';
      targetUrl = `${repoApiBase}/contents/${filePath}?ref=${branch}`;
    } else if (request.method === 'POST') {
      targetUrl = `${repoApiBase}/contents/${filePath}`;
      targetMethod = 'PUT';
    }
  } else if (gitPath.startsWith('pulls')) {
    targetUrl = `${repoApiBase}/pulls${gitPath.replace('pulls', '')}`;
    if (request.method === 'POST') {
      targetUrl = `${repoApiBase}/pulls`;
    }
  } else {
    targetUrl = `${repoApiBase}/${gitPath}`;
  }

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'invalid path' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const ghHeaders = {
    'Authorization': `Bearer ${githubToken}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'alla-cms-gateway',
  };

  let body = null;
  if (request.method === 'POST' || request.method === 'PUT') {
    const ct = request.headers.get('content-type');
    if (ct && ct.includes('application/json')) {
      const reqBody = await request.json();
      const ghBody = { ...reqBody };

      if (targetMethod === 'PUT' && ghBody.branch) {
        ghBody.branch = ghBody.branch;
      }
      if (ghBody.content && typeof ghBody.content === 'string') {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(ghBody.content);
        ghBody.content = btoa(String.fromCharCode(...bytes));
      }

      body = JSON.stringify(ghBody);
      ghHeaders['Content-Type'] = 'application/json';
    }
  }

  try {
    const ghResponse = await fetch(targetUrl, {
      method: targetMethod || request.method,
      headers: ghHeaders,
      body,
    });

    const ghData = await ghResponse.json();

    if (!ghResponse.ok) {
      return new Response(JSON.stringify({ error: 'github_error', details: ghData }), {
        status: ghResponse.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    return new Response(JSON.stringify(ghData), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'proxy_error', message: err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

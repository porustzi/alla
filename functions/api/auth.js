const VALID_USERNAME = 'portfolio';
const VALID_PASSWORD = 'alla123';

async function signToken(payload, secret) {
  const encoder = new TextEncoder();
  const header = { alg: 'HS256', typ: 'JWT' };
  const parts = [
    btoaUrl(JSON.stringify(header)),
    btoaUrl(JSON.stringify(payload)),
  ];
  const data = encoder.encode(parts.join('.'));
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, data);
  return parts.join('.') + '.' + btoaUrl(String.fromCharCode(...new Uint8Array(sig)));
}

function btoaUrl(str) {
  return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (url.pathname.endsWith('/token') && request.method === 'POST') {
    const contentType = request.headers.get('content-type') || '';
    let username, password;

    if (contentType.includes('application/json')) {
      const body = await request.json();
      username = body.username;
      password = body.password;
    } else {
      const body = await request.text();
      const params = new URLSearchParams(body);
      username = params.get('username');
      password = params.get('password');
      const grantType = params.get('grant_type');
      if (grantType !== 'password') {
        return json({ error: 'unsupported_grant_type' }, 400);
      }
    }

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const payload = {
        sub: username,
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + 86400,
      };
      const token = await signToken(payload, env.JWT_SECRET || 'alla-secret-key-change-me');
      return json({ access_token: token, token_type: 'bearer', expires_in: 86400 });
    }

    return json({ error: 'invalid_credentials' }, 401);
  }

  return json({ error: 'not_found' }, 404);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

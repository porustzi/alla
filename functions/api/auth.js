export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;
  const origin = url.origin;

  if (!clientId || !clientSecret) {
    return new Response(
      renderError('GitHub OAuth не налаштовано. Додай GITHUB_CLIENT_ID і GITHUB_CLIENT_SECRET в змінні середовища Cloudflare Pages.'),
      { headers: { 'content-type': 'text/html;charset=utf-8' } }
    );
  }

  if (code) {
    return handleCallback(code, clientId, clientSecret, origin);
  }

  return handleAuth(clientId, origin);
}

function handleAuth(clientId, origin) {
  const redirectUri = `${origin}/api/auth`;
  const githubAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&scope=${encodeURIComponent('repo,user')}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return Response.redirect(githubAuthUrl, 302);
}

async function handleCallback(code, clientId, clientSecret, origin) {
  try {
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      }
    );

    const data = await tokenResponse.json();

    if (data.error) {
      return new Response(
        renderError(`GitHub помилка: ${data.error_description || data.error}`),
        { headers: { 'content-type': 'text/html;charset=utf-8' } }
      );
    }

    if (!data.access_token) {
      return new Response(
        renderError('Не отримано токен доступу від GitHub.'),
        { headers: { 'content-type': 'text/html;charset=utf-8' } }
      );
    }

    return new Response(
      renderSuccess(data.access_token, origin),
      { headers: { 'content-type': 'text/html;charset=utf-8' } }
    );
  } catch (err) {
    return new Response(
      renderError(`Помилка сервера: ${err.message}`),
      { headers: { 'content-type': 'text/html;charset=utf-8' } }
    );
  }
}

function renderSuccess(token, origin) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Авторизація успішна</title>
<style>body{font-family:Inter,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f1f5f9;margin:0}.card{text-align:center;padding:32px;background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,.08)}h1{color:#1D3557;font-size:20px;margin-bottom:8px}p{color:#64748b;font-size:14px}.check{font-size:48px;margin-bottom:16px}</style></head>
<body><div class="card"><div class="check">&#10003;</div><h1>Авторизація успішна</h1><p>Це вікно закриється автоматично...</p></div>
<script>
(function() {
  if (window.opener) {
    window.opener.postMessage(
      { token: ${JSON.stringify(token)}, provider: 'github', backendName: 'github' },
      ${JSON.stringify(origin)}
    );
  } else {
    document.querySelector('p').textContent = 'Можете закрити це вікно.';
  }
})();
</script></body></html>`;
}

function renderError(message) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Помилка авторизації</title>
<style>body{font-family:Inter,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#fef2f2;margin:0}.card{text-align:center;padding:32px;background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,.08);max-width:420px}h1{color:#dc2626;font-size:20px;margin-bottom:8px}p{color:#64748b;font-size:14px;line-height:1.6;word-break:break-word}</style></head>
<body><div class="card"><h1>Помилка</h1><p>${message.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p></div></body></html>`;
}

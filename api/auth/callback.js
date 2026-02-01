export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
        client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
        code
      })
    });

    const data = await tokenResponse.json();

    if (data.error) {
      return res.status(400).send(`OAuth error: ${data.error_description || data.error}`);
    }

    // Send the token back to the CMS via postMessage
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Authorization Complete</title>
      </head>
      <body>
        <script>
          (function() {
            function recieveMessage(e) {
              console.log("recieveMessage %o", e);
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
                e.origin
              );
              window.removeEventListener("message", recieveMessage, false);
            }
            window.addEventListener("message", recieveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
          })();
        </script>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(content);
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).send('Authentication failed');
  }
}

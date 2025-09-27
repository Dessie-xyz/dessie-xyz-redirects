addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/example') {
      return Response.redirect('https://example.com', 301);
    }else if (url.pathname === '/CTDisc') {
      return Response.redirect('https://discord.gg/Yw2Dwdty7b', 301);
    } else {
      const assetUrl = new URL('nourl.html', request.url).toString();
      const response = await env.ASSETS.fetch(assetUrl); // Use the constructed URL
      if (!response.ok) {
        return new Response("File not found", { status: 404 });
      }
      return new Response(await response.text(), {
        headers: { 'Content-Type': 'text/html' },
      });
    }
  },
};
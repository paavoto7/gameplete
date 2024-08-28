# Gameplete

This is the fullstack app for gameplete frontend and backend.

This uses Cloudflare pages for the backend. The function directory serves as the
entrypoint for that.

Cloudflare pages/workers does not support Node and thus Express so I decided to
migrate to Hono instead of using their native approach. Migrating from Express
to Hono on such small project seemed very straightforward and manageable, which
is precisely was.
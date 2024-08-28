import { Hono } from 'hono';
import { handle } from "hono/cloudflare-pages";
import { secureHeaders } from 'hono/secure-headers';
import Api from "../../services_func/api";

type Bindings = {
  CLIENT_SECRET: string,
  CLIENT_ID: string
}

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");
app.use(secureHeaders())

const api = new Api();

app.get("/game/:id", async (c) => {
  await api.getToken(c.env);
  try {
      const game_data = await api.getGame(c.req.param("id"));
      return c.json(game_data);
  } catch (error) {
      c.status(500)
  }
})

app.get("/popular", async (c) => {
  await api.getToken(c.env);
  try {
      const game_data = await api.getPopular();
      return c.json(game_data);
  } catch (error) {
      return c.status(500)
  }
})

app.get("/upcoming", async (c) => {
  await api.getToken(c.env);
  try {
      const game_data = await api.getUpcoming(~~Date.now());
      return c.json(game_data);
  } catch (error) {
    return c.status(500)
  }
})

app.get("/search", async (c) => {
  await api.getToken(c.env);
  try {
      const game_data = await api.searchGame(c.req.query("query"));
      return c.json(game_data);
  } catch (error) {
    return c.status(500)
  }
})

app.get("/top", async (c) => {
  await api.getToken(c.env);
  try {
      const game_data = await api.getTop();
      return c.json(game_data);
  } catch (error) {
    return c.status(500)
  }
})

export const onRequest = handle(app);

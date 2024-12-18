import { Hono } from 'hono';
import { handle } from "hono/cloudflare-pages";
import { secureHeaders } from 'hono/secure-headers';
import { cache } from 'hono/cache';
import { z } from "zod";
import { zValidator } from '@hono/zod-validator';
import Api from "../../services_func/api";
import ZodErrorHandler from "../../utils/zodErrorHandler";

const searchSchema = z.object({
  query: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(100, { message: "Must be 100 characters or less" })
});

const gameSchema = z.object({
  id: z.coerce.number({ message: "The id must be an integer" }).int()
});

const upcomingSchema = z.object({
  platid: z.enum(["6", "48", "49", "130", "167", "169"], { message: "Must be one of the given choices" }).optional()
})

type Bindings = {
  CLIENT_SECRET: string,
  CLIENT_ID: string
}

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");
app.use(secureHeaders())

const api = new Api();

app.get(
  "*",
  cache({
    cacheName: "games",
    cacheControl: "max-age=3600",
  })
)

app.get("/game/:id",
  zValidator(
    "param",
    gameSchema,
    ZodErrorHandler
  ),
  async (c) => {
    await api.getToken(c.env);
    const { id } = c.req.valid("param");
    try {
        const game_data = await api.getGame(id);
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

app.get("/anticipated", async (c) => {
  await api.getToken(c.env);
  const date = ~~(Date.now() / 1000);
  try {
      const game_data = await api.getAnticipated(date);
      return c.json(game_data);
  } catch (error) {
    return c.status(500)
  }
})

app.get("/upcoming",
  zValidator(
    "query",
    upcomingSchema,
    ZodErrorHandler
  ),
  async (c) => {
    await api.getToken(c.env);
    const date = ~~(Date.now() / 1000);
    const { platid } = c.req.valid("query");
    try {
        const game_data = await api.getUpcoming(date, platid);
        return c.json(game_data);
    } catch (error) {
      return c.status(500)
    }
})

app.get("/search", 
  zValidator(
    "query",
    searchSchema,
    ZodErrorHandler
  ),
  async (c) => {
    await api.getToken(c.env);
    const { query } = c.req.valid("query");
    try {
        const game_data = await api.searchGame(query);
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

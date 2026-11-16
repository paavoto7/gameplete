import { Hono } from 'hono';
import { handle } from "hono/cloudflare-pages";
import { HTTPException } from 'hono/http-exception';
import { secureHeaders } from 'hono/secure-headers';
import { cache } from 'hono/cache';
import { z } from "zod";
import { zValidator } from '@hono/zod-validator';
import Api from "../../services_func/api";
import ZodErrorHandler from "../../utils/zodErrorHandler";

const searchSchema = z.object({
  // Quotes and backslashes are stripped first so the length rules apply
  // to the term that is actually sent to IGDB
  query: z
    .string()
    .transform((value) => value.replace(/["\\]/g, ""))
    .pipe(
      z
        .string()
        .min(3, { message: "Must be 3 or more characters long" })
        .max(100, { message: "Must be 100 characters or less" })
    )
});

const gameSchema = z.object({
  id: z.coerce
    .number({ message: "The id must be a positive integer" })
    .int({ message: "The id must be a positive integer" })
    .positive({ message: "The id must be a positive integer" })
});

const upcomingSchema = z.object({
  platid: z.enum(["6", "48", "49", "130", "167", "169"], { message: "Must be one of the given choices" }).optional()
})

type Bindings = {
  CLIENT_SECRET: string,
  CLIENT_ID: string,
  AUTH_URL: string
}

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");
app.use(secureHeaders())

const api = new Api();

// Anything thrown while talking to Twitch or IGDB ends up here
app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return error.getResponse();
  }
  console.error(error);
  return c.json({ error: "Could not fetch data from IGDB" }, 502);
})

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
    const { id } = c.req.valid("param");
    const game_data = await api.getGame(c.env, id);
    if (game_data.length === 0) {
      return c.json({ error: "Game not found" }, 404);
    }
    return c.json(game_data);
})

app.get("/popular", async (c) => {
  const game_data = await api.getPopular(c.env);
  return c.json(game_data);
})

app.get("/anticipated", async (c) => {
  const date = ~~(Date.now() / 1000);
  const game_data = await api.getAnticipated(c.env, date);
  return c.json(game_data);
})

app.get("/upcoming",
  zValidator(
    "query",
    upcomingSchema,
    ZodErrorHandler
  ),
  async (c) => {
    const date = ~~(Date.now() / 1000);
    const { platid } = c.req.valid("query");
    const game_data = await api.getUpcoming(c.env, date, platid);
    return c.json(game_data);
})

app.get("/search",
  zValidator(
    "query",
    searchSchema,
    ZodErrorHandler
  ),
  async (c) => {
    const { query } = c.req.valid("query");
    const game_data = await api.searchGame(c.env, query);
    return c.json(game_data);
})

app.get("/top", async (c) => {
  const game_data = await api.getTop(c.env);
  return c.json(game_data);
})

export const onRequest = handle(app);

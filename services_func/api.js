const BASE_URL = "https://api.igdb.com/v4/";
const TOKEN_MARGIN_S = 60;

const SEARCH_PARAMS = {
    "top_oat": `fields name, total_rating, cover.image_id;
                sort total_rating desc;
                where total_rating_count > 20 & aggregated_rating_count >= 4;
                limit 10;`, 
    "anticipated": `fields name, rating, hypes, cover.image_id, release_dates.human, first_release_date;
                sort hypes desc;
                limit 20;
                where cover.image_id != null & first_release_date > `,
    "upcoming": `fields name, rating, hypes, cover.image_id, release_dates.human, first_release_date;
                sort first_release_date asc;
                limit 20;`,
    "game": `fields name, summary, aggregated_rating, rating, platforms.name, cover.image_id,
                artworks.image_id, artworks.width, involved_companies.company.name, involved_companies.developer,
                genres.name, release_dates.human, expansions.name, similar_games.cover.image_id, similar_games.name,
                game_modes.name, game_engines.name, screenshots.image_id;`,
    "search": `fields name, cover.image_id;
                where cover.image_id != null & game_type = (0,2,4,8,9,10,13);
                limit 40;`,
    "popular": `fields game_id; sort value desc; where popularity_type = 1;`
}

class Api {
    constructor() {
        this.token = null;
        this.expires = 0;
    }

    async getToken(env) {
        if (this.token && this.expires > Date.now()) {
            return this.token;
        }

        if (!env?.CLIENT_ID || !env?.CLIENT_SECRET || !env?.AUTH_URL) {
            throw new Error("CLIENT_ID, CLIENT_SECRET or AUTH_URL is not set");
        }

        const response = await fetch(env.AUTH_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                client_id: env.CLIENT_ID,
                client_secret: env.CLIENT_SECRET,
                grant_type: "client_credentials"
            })
        });
        if (!response.ok) {
            throw new Error(`Token request failed with status ${response.status}`);
        }

        const creds = await response.json();
        this.token = creds.access_token;
        // Renew a minute early so a token can't expire mid-request
        this.expires = Date.now() + (creds.expires_in - TOKEN_MARGIN_S) * 1000;
        return this.token;
    }

    async request(env, resource, body, retry=true) {
        const token = await this.getToken(env);

        const response = await fetch(`${BASE_URL}${resource}/`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Client-ID": env.CLIENT_ID,
                "Authorization": `Bearer ${token}`,
            },
            body: body
        });

        if (response.status === 401 && retry) {
            // The cached token was rejected, so fetch a new one and try once more
            this.token = null;
            return await this.request(env, resource, body, false);
        }
        if (!response.ok) {
            throw new Error(`IGDB request to ${resource} failed with status ${response.status}`);
        }
        return await response.json();
    }

    async getGame(env, game_id) {
        return await this.request(env, "games",
            `${SEARCH_PARAMS["game"]}
            where id = ${game_id} & cover.image_id != null;`
        )
    }

    async getPopular(env) {
        // Need to fetch in two goes as the multiquery doesn't seem to support dynamic queries

        const pop = await this.request(env, "popularity_primitives",
            SEARCH_PARAMS["popular"]
        );

        if (pop.length === 0) {
            return [];
        }

        return await this.request(env, "games",
            `fields name, cover.image_id;
            where id = (${pop.map(game => game.game_id)}) & themes.slug != "erotic";`
        )
    }

    async getUpcoming(env, date, platid="6,48,49,130,167,169") {
        // Date needs to be added this way because in global it is zero

        return await this.request(env, "games",
            `${SEARCH_PARAMS["upcoming"]}
            where cover.image_id != null & platforms = (${platid}) & first_release_date > ${date};`
        )
    }

    async getAnticipated(env, date) {
        // Date needs to be added this way because in global it is zero
        return await this.request(env, "games",
            `${SEARCH_PARAMS["anticipated"]}${date};`
        )
    }

    async searchGame(env, search_param) {
        // Strip quotes and backslashes so the term can't break out of the
        // quoted string and append its own query clauses
        const term = search_param.replace(/["\\]/g, "");
        return await this.request(env, "games",
            `${SEARCH_PARAMS["search"]}search "${term}";`
        )
    }

    async getTop(env) {
        return await this.request(env, "games",
            SEARCH_PARAMS["top_oat"]
        )
    }
}

export default Api
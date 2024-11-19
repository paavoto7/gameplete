const BASE_URL = "https://api.igdb.com/v4/";

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
                where cover.image_id != null & category = (0,2,4,8,9,10,13);
                limit 40;`,
    "popular": `fields game_id; sort value desc; where popularity_type = 1;`
}

class Api {
    constructor() {
        this.url = null;
        this.id = null;
        this.token = null;
        this.expires = 0;
    }
    async getToken(env=null) {
        if (this.token && this.expires > Date.now()) {
            return;
        }

        let body;

        if (env) {
            body = {
                client_id: env.CLIENT_ID,
                client_secret: env.CLIENT_SECRET,
                grant_type: "client_credentials"
            };
            this.id = env.CLIENT_ID;
            this.url = `${env.AUTH_URL}`;
        } else {
            throw new Error("Could not form the URL.")
        }

        if (!this.id) throw new Error(`Problem fetching data`); 

        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers:  {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(body)

            });
            if (!response.ok) {
                throw new Error(`Problem occured`);
            }
            const creds = await response.json();
            this.token = creds.access_token;
            this.expires = Date.now() + creds.expires_in * 1000;
        } catch (error) {
            console.log(error);
        }
    }

    async request(resource, body) {
        try {
            const response = await fetch(`${BASE_URL}${resource}/`,
                { 
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Client-ID": this.id,
                        "Authorization": `Bearer ${this.token}`,
                    },
                    body: body
                 });
            if (!response.ok) {
                throw new Error(`Problem fetching data ${response.statusText}`);
            }
            const game_data = await response.json();
            return game_data
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getGame(game_id) {
        return await this.request("games",
            `${SEARCH_PARAMS["game"]}
            where id = ${game_id} & cover.image_id != null;`
        )
    }

    async getPopular() {
        // Need to fetch in two goes as the multiquery doesn't seem to support dynamic queries
        
        const pop = await this.request("popularity_primitives",
            SEARCH_PARAMS["popular"]
        );

        return await this.request("games", 
            `fields name, cover.image_id;
            where id = (${pop.map(game => game.game_id)}) & themes.slug != "erotic";`
        )
    }

    async getUpcoming(date, platid="6,48,49,130,167,169") {
        // Date needs to be added this way because in global it is zero

        return await this.request("games",
            `${SEARCH_PARAMS["upcoming"]}
            where cover.image_id != null & platforms = (${platid}) & first_release_date > ${date};`
        )
    }

    async getAnticipated(date) {
        // Date needs to be added this way because in global it is zero
        return await this.request("games",
            `${SEARCH_PARAMS["anticipated"]}${date};`
        )
    }

    async searchGame(search_param) {
        return await this.request("games",
            `${SEARCH_PARAMS["search"]}search "${search_param}";`
        )
    }

    async getTop() {
        return await this.request("games",
            SEARCH_PARAMS["top_oat"]
        )
    }
}

export default Api
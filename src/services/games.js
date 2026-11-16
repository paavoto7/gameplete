const baseUrl = "/api";

const request = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        // The status lets callers tell a missing resource from a failed request
        const error = new Error(`Response status ${response.status}`);
        error.status = response.status;
        throw error;
    }
    return await response.json();
}

const getGameById = async ( game_id ) => {
    return await request(`${baseUrl}/game/${game_id}`);
}

const getPopular = async () => {
    return await request(`${baseUrl}/popular`);
}

const getAnticipated = async () => {
    return await request(`${baseUrl}/anticipated`);
}

const getUpcoming = async (platid) => {
    const query = platid ? `?platid=${platid}` : ``;
    return await request(`${baseUrl}/upcoming${query}`);
}

const getTop = async () => {
    return await request(`${baseUrl}/top`);
}

const searchGames = async (params) => {
    if (!params.trim() || params.length < 3) {
        return [];
    }
    return await request(`${baseUrl}/search?query=${params}`);
}

export default { getGameById, getUpcoming, getPopular, searchGames, getTop, getAnticipated }
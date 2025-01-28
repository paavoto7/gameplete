const baseUrl = "http://localhost:3001";

const request = async (url) => {
    try {
        const response = await fetch(url, {
                headers: {"Content-Type": "application/json"} 
            });
        if (!response.ok) {
            throw new Error(`Reponse status ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
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
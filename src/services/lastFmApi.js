const API_KEY = 'your_api_key';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0';

export const lastFmApi = {
    searchArtist: async (query) => {
        const response = await fetch(
            `${BASE_URL}/?method=artist.search&artist=${query}&api_key=${API_KEY}&format=json`
        );
        return response.json();
    },
    // Other methods...
};

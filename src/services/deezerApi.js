const BASE_URL = 'https://api.deezer.com';

export const deezerApi = {
    searchArtist: async (query) => {
        const response = await fetch(`${BASE_URL}/search/artist?q=${query}`);
        return response.json();
    },
    // Other methods...
};

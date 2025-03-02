const BASE_URL = 'https://api.spotify.com/v1';
const AUTH_URL = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = 'your_client_id';
const CLIENT_SECRET = 'your_client_secret';

let accessToken = null;

const getAccessToken = async () => {
    if (accessToken) return accessToken;

    const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    accessToken = data.access_token;
    return accessToken;
};

export const spotifyApi = {
    searchArtist: async (query) => {
        const token = await getAccessToken();
        const response = await fetch(
            `${BASE_URL}/search?q=${encodeURIComponent(query)}&type=artist`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.json();
    },

    getArtistTopTracks: async (artistId) => {
        const token = await getAccessToken();
        const response = await fetch(
            `${BASE_URL}/artists/${artistId}/top-tracks?market=US`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.json();
    },

    getArtistAlbums: async (artistId) => {
        const token = await getAccessToken();
        const response = await fetch(
            `${BASE_URL}/artists/${artistId}/albums?include_groups=album,single`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.json();
    },

    getRecommendations: async (seedArtists) => {
        const token = await getAccessToken();
        const response = await fetch(
            `${BASE_URL}/recommendations?seed_artists=${seedArtists.join(',')}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.json();
    },
};

const API_KEY = '2'; // Free test API key from TheAudioDB
const BASE_URL = 'https://www.theaudiodb.com/api/v1/json';

export const audioDBApi = {
    // Search for artist
    searchArtist: async (artistName) => {
        try {
            const response = await fetch(
                `${BASE_URL}/${API_KEY}/search.php?s=${encodeURIComponent(
                    artistName
                )}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error searching artist:', error);
            throw error;
        }
    },

    // Get artist details by ID
    getArtistById: async (artistId) => {
        try {
            const response = await fetch(
                `${BASE_URL}/${API_KEY}/artist.php?i=${artistId}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching artist details:', error);
            throw error;
        }
    },

    // Get all albums by artist ID
    getAlbumsByArtistId: async (artistId) => {
        try {
            const response = await fetch(
                `${BASE_URL}/${API_KEY}/album.php?i=${artistId}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching albums:', error);
            throw error;
        }
    },

    // Get tracks by album ID
    getTracksByAlbumId: async (albumId) => {
        try {
            const response = await fetch(
                `${BASE_URL}/${API_KEY}/track.php?m=${albumId}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching tracks:', error);
            throw error;
        }
    },

    // Get top 10 tracks by artist ID
    getTopTracksByArtistId: async (artistId) => {
        try {
            const response = await fetch(
                `${BASE_URL}/${API_KEY}/track-top10.php?s=${artistId}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching top tracks:', error);
            throw error;
        }
    },

    // Search for tracks by track name
    searchTrack: async (trackName) => {
        try {
            const response = await fetch(
                `${BASE_URL}/${API_KEY}/searchtrack.php?s=${encodeURIComponent(
                    trackName
                )}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error searching track:', error);
            throw error;
        }
    },

    // Get music videos by artist ID
    getMusicVideosByArtistId: async (artistId) => {
        try {
            const response = await fetch(
                `${BASE_URL}/${API_KEY}/mvid.php?i=${artistId}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching music videos:', error);
            throw error;
        }
    },
};

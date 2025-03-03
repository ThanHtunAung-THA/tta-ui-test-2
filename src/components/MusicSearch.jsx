import React, { useState } from 'react';
import axios from 'axios';

const MusicSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [artist, setArtist] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [recentTracks, setRecentTracks] = useState([]);

    const searchArtist = async () => {
        try {
            setLoading(true);
            setError('');
            // Note: In free tier, only 'coldplay' search works
            const response = await axios.get(`http://localhost:3001/api/search.php?s=${searchTerm}`);
            
            if (response.data.artists) {
                setArtist(response.data.artists[0]);
                // Get tracks for the artist
                const tracksResponse = await axios.get(`http://localhost:3001/api/track-top10.php?s=${response.data.artists[0].strArtist}`);
                setRecentTracks(tracksResponse.data.track || []);
            } else {
                setError('No artist found. Note: Free API only works with "coldplay" search.');
            }
        } catch (error) {
            setError('Error searching for artist. Please try again.');
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 p-8">
            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for artists or tracks..."
                        className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:border-pink-500"
                    />
                    <svg
                        className="absolute w-5 h-5 text-gray-400 left-3 top-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="flex mb-8 space-x-6">
                {/* GET LOST card */}
                <div className="flex flex-col justify-between flex-1 h-48 p-6 transition-transform duration-300 cursor-pointer bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl hover:scale-105">
                    <h2 className="text-3xl font-bold text-white">GET LOST</h2>
                    <p className="text-pink-200">in your music</p>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>

                {/* MELLOW card */}
                <div className="flex flex-col justify-between flex-1 h-48 p-6 transition-transform duration-300 cursor-pointer bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl hover:scale-105">
                    <h2 className="text-3xl font-bold text-white">MELLOW</h2>
                    <p className="text-blue-200">beats.</p>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Recently Played Section */}
            <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Recently Played</h2>
                <div className="space-y-2">
                    {loading ? (
                        // Loading skeleton
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center p-3 space-x-4 rounded-lg animate-pulse">
                                <div className="w-12 h-12 bg-gray-200 rounded"></div>
                                <div className="flex-1">
                                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                                    <div className="w-16 h-3 mt-2 bg-gray-200 rounded"></div>
                                </div>
                                <div className="w-12 h-4 bg-gray-200 rounded"></div>
                            </div>
                        ))
                    ) : (
                        recentTracks.slice(0, 4).map((track, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center flex-1">
                                    <div className="w-12 h-12 bg-gray-200 rounded">
                                        {track.strTrackThumb && (
                                            <img
                                                src={track.strTrackThumb}
                                                alt={track.strTrack}
                                                className="object-cover w-full h-full rounded"
                                            />
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <div className="font-medium">{track.strTrack}</div>
                                        <div className="text-sm text-gray-500">{track.strArtist}</div>
                                    </div>
                                </div>
                                <div className="text-gray-400">3:45</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {error && (
                <div className="p-4 mb-4 text-red-500 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}

            {/* Recommended Section */}
            {artist && (
                <div>
                    <h2 className="mb-4 text-xl font-semibold">Recommended For You</h2>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="relative overflow-hidden transition-transform duration-300 bg-gray-200 rounded-lg cursor-pointer aspect-square hover:scale-105">
                            {artist.strArtistThumb && (
                                <>
                                    <img
                                        src={artist.strArtistThumb}
                                        alt={artist.strArtist}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute inset-0 flex items-end transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100">
                                        <div className="p-4 text-white">
                                            <h3 className="font-bold">{artist.strArtist}</h3>
                                            <p className="text-sm">{artist.strGenre}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MusicSearch; 
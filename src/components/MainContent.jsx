import React, { useState, useEffect } from 'react';
import { audioDBApi } from '../services/audioDBApi';

function MainContent() {
    const [recentTracks, setRecentTracks] = useState([]);
    const [recommendedArtists, setRecommendedArtists] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [setCurrentTrack] = useState(null);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    // Initial data fetch
    const fetchInitialData = async () => {
        setLoading(true);
        try {
            // Get initial artists for recommendations
            const initialArtists = [
                'coldplay',
                'ed sheeran',
                'imagine dragons',
            ];
            const artistsData = await Promise.all(
                initialArtists.map((name) => audioDBApi.searchArtist(name))
            );

            const artists = artistsData
                .map((data) => data.artists?.[0])
                .filter((artist) => artist);

            setRecommendedArtists(artists);

            // Get tracks for Recently Played
            if (artists[0]) {
                const tracksData = await audioDBApi.getTopTracksByArtistId(
                    artists[0].idArtist
                );
                setRecentTracks(tracksData.track || []);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle track selection
    const handleTrackSelect = (track) => {
        setCurrentTrack(track);
    };

    // Handle search
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const artistResult = await audioDBApi.searchArtist(searchQuery);

            if (artistResult.artists?.length) {
                const artist = artistResult.artists[0];
                setRecommendedArtists(artistResult.artists.slice(0, 3));

                // Get artist's tracks
                const tracksData = await audioDBApi.getTopTracksByArtistId(
                    artist.idArtist
                );
                const tracks = tracksData.track || [];
                setRecentTracks(tracks);

                // Automatically play the first track
                if (tracks.length > 0) {
                    setCurrentTrack(tracks[0]);
                }
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    return (
        <div className="flex-1 p-8 overflow-y-auto">
            {/* Search Bar */}
            <div className="relative mb-8 flex">
                <div className={`flex items-center transition-all duration-300 ease-in-out ${isSearchExpanded ? 'w-full' : 'w-10'}`}>
                    <form onSubmit={handleSearch} className="flex items-center w-full">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for songs, artists, albums..."
                            className={`
                                transition-all duration-300 ease-in-out
                                border border-gray-300 rounded-full
                                focus:outline-none focus:border-pink-500
                                py-2 px-4
                                ${isSearchExpanded ? 'w-1/2 opacity-100' : 'w-0 opacity-0 p-0 border-0'}
                            `}
                        />
                        <button
                            type="button"
                            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
                {/* <div className={`absolute right-0 mt-12 ${isSearchExpanded ? 'block' : 'hidden'}`}>
                    <button
                        type="submit"
                        onClick={handleSearch}
                        className="px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600"
                    >
                        Search
                    </button>
                </div> */}
            </div>

            {/* Feature Cards */}
            <div className="flex mb-8 space-x-6 overflow-visible">
                {/* GET LOST card */}
                <div className="flex flex-col justify-between flex-1 h-48 p-6 cursor-pointer transform transition-all duration-300 ease-in-out bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl hover:scale-105 hover:shadow-xl">
                    <h2 className="text-3xl font-bold text-white">GET LOST</h2>
                    <p className="text-pink-200">in your music</p>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>

                {/* MELLOW card */}
                <div className="flex flex-col justify-between flex-1 h-48 p-6 cursor-pointer transform transition-all duration-300 ease-in-out bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl hover:scale-105 hover:shadow-xl">
                    <h2 className="text-3xl font-bold text-white">MELLOW</h2>
                    <p className="text-blue-200">beats.</p>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="flex gap-8">
                {/* Recently Played Section */}
                <div className="flex-1">
                    <h2 className="mb-4 text-xl font-semibold">Recently Played</h2>
                    <div className="space-y-2">
                        {loading
                            ? // Loading skeleton
                              [...Array(4)].map((_, i) => (
                                  <div
                                      key={i}
                                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                                  >
                                      <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                                      <div className="flex-1 ml-4">
                                          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                                          <div className="w-24 h-3 mt-2 bg-gray-100 rounded animate-pulse"></div>
                                      </div>
                                      <div className="text-gray-400">--:--</div>
                                  </div>
                              ))
                            : recentTracks.slice(0, 4).map((track) => (
                                  <div
                                      key={track.idTrack}
                                      className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50"
                                      onClick={() => handleTrackSelect(track)}
                                  >
                                      <div className="w-12 h-12 mr-4 bg-gray-200 rounded">
                                          {track.strTrackThumb && (
                                              <img
                                                  src={track.strTrackThumb}
                                                  alt={track.strTrack}
                                                  className="object-cover w-full h-full rounded"
                                              />
                                          )}
                                      </div>
                                      <div className="flex-1">
                                          <div className="font-medium">
                                              {track.strTrack}
                                          </div>
                                          <div className="text-sm text-gray-500">
                                              {track.strArtist}
                                          </div>
                                      </div>
                                      <div className="text-gray-400">
                                          {track.intDuration || '--:--'}
                                      </div>
                                  </div>
                              ))}
                    </div>
                </div>

                {/* Recommended Section */}
                <div className="flex-1">
                    <h2 className="mb-4 text-xl font-semibold">
                        Recommended For You
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {loading
                            ? // Loading skeleton
                              [...Array(3)].map((_, i) => (
                                  <div
                                      key={i}
                                      className="bg-gray-200 rounded-lg aspect-square animate-pulse"
                                  ></div>
                              ))
                            : recommendedArtists.map((artist) => (
                                  <div
                                      key={artist.idArtist}
                                      className="relative overflow-hidden bg-gray-200 rounded-lg cursor-pointer aspect-square group"
                                  >
                                      {artist.strArtistThumb && (
                                          <>
                                              <img
                                                  src={artist.strArtistThumb}
                                                  alt={artist.strArtist}
                                                  className="object-cover w-full h-full"
                                              />
                                              <div className="absolute inset-0 flex items-end transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-50">
                                                  <div className="p-4 text-white transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
                                                      <h3 className="font-bold">
                                                          {artist.strArtist}
                                                      </h3>
                                                      <p className="text-sm text-gray-300">
                                                          {artist.strGenre}
                                                      </p>
                                                  </div>
                                              </div>
                                          </>
                                      )}
                                  </div>
                              ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContent;

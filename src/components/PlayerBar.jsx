import React, { useState, useRef, useEffect } from 'react';

function PlayerBar({ currentTrack }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        if (currentTrack?.strMusicVid) {
            audioRef.current.src = currentTrack.strMusicVid;
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play();
            }
        }

        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentTrack]);

    const togglePlay = () => {
        if (audioRef.current.src) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleProgressClick = (e) => {
        const progressBar = e.currentTarget;
        const clickPosition =
            (e.clientX - progressBar.getBoundingClientRect().left) /
            progressBar.offsetWidth;
        const newTime = clickPosition * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="flex items-center h-20 px-4 bg-gradient-to-r from-pink-500 to-pink-600">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded bg-white/20">
                    {currentTrack?.strTrackThumb && (
                        <img
                            src={currentTrack.strTrackThumb}
                            alt={currentTrack.strTrack}
                            className="object-cover w-full h-full rounded"
                        />
                    )}
                </div>
                <div>
                    <div className="font-medium text-white">
                        {currentTrack?.strTrack || 'No track selected'}
                    </div>
                    <div className="text-sm text-pink-200">
                        {currentTrack?.strArtist || 'Unknown Artist'}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center flex-1">
                <div className="flex items-center space-x-6 text-white">
                    <button className="flex items-center justify-center w-8 h-8 hover:text-pink-200">
                        ⏮
                    </button>
                    <button
                        onClick={togglePlay}
                        className="flex items-center justify-center w-10 h-10 text-pink-500 bg-white rounded-full"
                        disabled={!currentTrack?.strMusicVid}
                    >
                        {isPlaying ? '⏸' : '▶'}
                    </button>
                    <button className="flex items-center justify-center w-8 h-8 hover:text-pink-200">
                        ⏭
                    </button>
                </div>
                <div className="flex items-center w-full max-w-xl mt-2 space-x-4">
                    <span className="text-sm text-pink-200">
                        {formatTime(currentTime)}
                    </span>
                    <div
                        className="flex-1 h-1 rounded-full cursor-pointer bg-white/20"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="h-full bg-white rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="text-sm text-pink-200">
                        {formatTime(duration)}
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-4 text-white">
                <button className="hover:text-pink-200">🔁</button>
                <button className="hover:text-pink-200">🔊</button>
            </div>
        </div>
    );
}

export default PlayerBar;

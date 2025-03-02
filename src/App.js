import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import PlayerBar from './components/PlayerBar';

function App() {
    const [currentTrack, setCurrentTrack] = useState(null);

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <MainContent setCurrentTrack={setCurrentTrack} />
            </div>
            <PlayerBar currentTrack={currentTrack} />
        </div>
    );
}

export default App;

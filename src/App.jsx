import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import PlayerBar from './components/PlayerBar';

function App() {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Main container */}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <MainContent />
            </div>
            <PlayerBar />
        </div>
    );
}

export default App;

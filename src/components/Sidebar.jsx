import React from 'react'

function Sidebar() {
  return (
    <div className="w-64 bg-white p-4 flex flex-col">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        <span className="font-semibold">Joshua</span>
      </div>
      
      <nav className="space-y-1">
        <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
          <span>Home</span>
        </div>
        <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
          <span>Songs</span>
        </div>
        <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
          <span>Playlists</span>
        </div>
        <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
          <span>Just for You</span>
        </div>
        <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
          <span>Top Charts</span>
        </div>
      </nav>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">YOUR PLAYLISTS</h3>
        <nav className="space-y-1">
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <span>Workout Mix</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <span>Chillin' at Home</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <span>Booping at Adobe</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <span>XD 4 Life</span>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
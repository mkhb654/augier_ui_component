

import React from 'react';
export default  function SideBar(){
    return (    
    <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-purple-700">Augier AI</h1>
          </div>
          <nav className="mt-10">
            <a href="#" className="flex items-center py-2 px-6 text-gray-700 hover:bg-purple-100">
              <span className="material-icons-outlined">notifications</span>
              <span className="ml-3">Daily Bids</span>
            </a>
            <a href="#" className="flex items-center py-2 px-6 text-gray-700 hover:bg-purple-100">
              <span className="material-icons-outlined">chat</span>
              <span className="ml-3">AI Chat</span>
            </a>
            <a href="#" className="flex items-center py-2 px-6 text-gray-700 hover:bg-purple-100">
              <span className="material-icons-outlined">search</span>
              <span className="ml-3">New Search</span>
            </a>
            <a href="#" className="flex items-center py-2 px-6 text-gray-700 hover:bg-purple-100">
              <span className="material-icons-outlined">folder</span>
              <span className="ml-3">Bid Pipeline</span>
            </a>
            <a href="#" className="flex items-center py-2 px-6 text-gray-700 hover:bg-purple-100">
              <span className="material-icons-outlined">history</span>
              <span className="ml-3">Recent Search</span>
            </a>
          </nav>
        </aside>
        </div>
        );
}
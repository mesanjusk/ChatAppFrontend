import React from 'react'

export default function Footer() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-100 border-t border-gray-300">
        <div className="flex justify-around p-2">
          <button className="flex flex-col items-center">
            <span className="material-icons">home</span>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons">search</span>
            <span className="text-xs">Search</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons">notifications</span>
            <span className="text-xs">Notifications</span>
          </button>
          <button className="flex flex-col items-center">
            <span className="material-icons">person</span>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    )
}
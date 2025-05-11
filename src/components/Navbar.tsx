import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useMood } from '../context/MoodContext';

const Navbar = () => {
  const { favoriteMovies } = useMood();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">MovieMood</h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium
                          ${location.pathname === '/' ? 'text-white bg-gray-800/50' : ''}`}
              >
                Discover
              </Link>
              <Link 
                to="/favorites" 
                className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium
                          ${location.pathname === '/favorites' ? 'text-white bg-gray-800/50' : ''}`}
              >
                My Favorites
              </Link>
            </div>
          </div>

          {/* Search and Favorites */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-full 
                         bg-gray-800 text-gray-300 placeholder-gray-400
                         focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-blue-500
                         sm:text-sm"
                placeholder="Search by mood or title..."
              />
            </div>
            <Link 
              to="/favorites"
              className="relative p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white group"
            >
              <HeartIcon className="h-6 w-6" />
              {favoriteMovies.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {favoriteMovies.length}
                </span>
              )}
              <span className="sr-only">Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
import React from 'react';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useMood } from '../../context/MoodContext';

const Favorites = () => {
  const { favoriteMovies, toggleFavorite } = useMood();

  // This should be moved to a central location or context in a real app
  const allMovies = [
    {
      id: 1,
      title: 'La La Land',
      rating: 8.0,
      year: 2016,
      mood: 'Romantic',
      image: 'https://via.placeholder.com/300x400'
    },
    {
      id: 2,
      title: 'The Secret Life of Walter Mitty',
      rating: 7.3,
      year: 2013,
      mood: 'Inspirational',
      image: 'https://via.placeholder.com/300x400'
    },
    // ... other movies
  ];

  const favoriteMovieDetails = allMovies.filter(movie => 
    favoriteMovies.includes(movie.id)
  );

  if (favoriteMovieDetails.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <HeartIcon className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No favorites yet</h2>
        <p className="text-gray-400 max-w-md">
          Start adding movies to your favorites by clicking the heart icon on any movie card.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">My Favorite Movies</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {favoriteMovieDetails.map((movie) => (
          <div key={movie.id} className="group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden mb-2">
              <img 
                src={movie.image} 
                alt={movie.title}
                className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center space-x-1">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-white">{movie.rating}</span>
                  <span className="text-sm text-gray-300 ml-2">{movie.year}</span>
                </div>
              </div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <span className="px-2 py-1 rounded-full bg-gray-900/80 text-xs text-white backdrop-blur-sm">
                  {movie.mood}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(movie.id);
                  }}
                  className="p-1 rounded-full bg-gray-900/80 backdrop-blur-sm"
                >
                  <HeartIcon className="h-4 w-4 text-pink-500" />
                </button>
              </div>
            </div>
            <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites; 
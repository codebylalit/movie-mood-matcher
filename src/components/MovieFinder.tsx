import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, HeartIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { getMoviesByMood, getImageUrl, getWatchProviders, Movie, TMDBResponse, MovieFilters, WatchProviderData } from '../services/tmdb';
import { MOOD_MAPPINGS, TMDB_IMAGE_BASE_URL } from '../config/api';
import { useMood } from '../context/MoodContext';

const streamingServices = [
  'Netflix',
  'Amazon Prime',
  'Disney+',
  'Hulu',
  'HBO Max',
  'Apple TV+'
];

interface FinderFilters extends MovieFilters {
  mood: keyof typeof MOOD_MAPPINGS;
  timeRange?: string;
  service?: string;
}

const WatchProviders: React.FC<{ providers: WatchProviderData }> = ({ providers }) => {
  if (!providers) return null;

  const allProviders = [
    ...(providers.flatrate || []),
    ...(providers.rent || []),
    ...(providers.buy || [])
  ];

  if (allProviders.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-white mb-2">Where to Watch:</h4>
      <div className="flex flex-wrap gap-2">
        {allProviders.map((provider) => (
          <div
            key={provider.provider_id}
            className="flex items-center bg-gray-700 rounded-lg p-2 text-sm"
          >
            <img
              src={`${TMDB_IMAGE_BASE_URL}/original${provider.logo_path}`}
              alt={provider.provider_name}
              className="w-6 h-6 rounded mr-2"
            />
            <span className="text-white">{provider.provider_name}</span>
          </div>
        ))}
      </div>
      {providers.link && (
        <a
          href={providers.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
        >
          View all watching options →
        </a>
      )}
    </div>
  );
};

const MovieCard: React.FC<{
  movie: Movie;
  isSelected: boolean;
  onSelect: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  watchProviders: any;
  mood: string;
}> = ({ movie, isSelected, onSelect, isFavorite, onToggleFavorite, watchProviders, mood }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
    className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 ${
      isSelected ? 'ring-2 ring-blue-500' : ''
    }`}
    onClick={onSelect}
  >
    <div className="relative group">
      <img
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover transition-opacity group-hover:opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-2 right-2 flex space-x-2">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="p-2 rounded-full bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800 transition-colors"
        >
          <HeartIcon 
            className={`h-5 w-5 ${
              isFavorite ? 'text-pink-500' : 'text-gray-400'
            } transition-colors`} 
          />
        </motion.button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white font-medium line-clamp-2">{movie.overview}</p>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-white font-medium text-lg truncate">{movie.title}</h3>
      <div className="flex items-center text-sm text-gray-400 mt-2">
        <span>{new Date(movie.release_date).getFullYear()}</span>
        <span className="mx-2">•</span>
        <div className="flex items-center">
          <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 border-t border-gray-700 pt-4"
          >
            <p className="text-sm text-gray-300 leading-relaxed">
              {movie.overview}
            </p>
            
            {watchProviders?.US && (
              <WatchProviders providers={watchProviders.US} />
            )}
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-400">Perfect for {mood.toLowerCase()} moments</span>
              <a 
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                More Info
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

const FilterSection: React.FC<{
  filters: FinderFilters;
  onFilterChange: (key: keyof FinderFilters, value: string) => void;
}> = ({ filters, onFilterChange }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 mb-8 shadow-lg"
  >
    <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
      Find Your Perfect Movie
      <span className="ml-3 text-sm font-normal text-gray-400">
        Tailored to your mood
      </span>
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          I'm feeling...
        </label>
        <select
          value={filters.mood}
          onChange={(e) => onFilterChange('mood', e.target.value as keyof typeof MOOD_MAPPINGS)}
          className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all"
        >
          {Object.keys(MOOD_MAPPINGS).map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Time Period
        </label>
        <select
          value={filters.timeRange}
          onChange={(e) => onFilterChange('timeRange', e.target.value)}
          className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="all">All Time</option>
          {Array.from({ length: 5 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Streaming Service
        </label>
        <select
          value={filters.service}
          onChange={(e) => onFilterChange('service', e.target.value)}
          className="w-full bg-gray-700/50 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="all">All Services</option>
          {streamingServices.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>
    </div>
  </motion.div>
);

const MovieFinder: React.FC = () => {
  const { currentMood, favoriteMovies, toggleFavorite } = useMood();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [watchProviders, setWatchProviders] = useState<{[key: number]: any}>({});
  const [filters, setFilters] = useState<FinderFilters>({
    mood: 'Happy',
    language: 'en',
    timeRange: 'all',
    service: 'all',
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getMoviesByMood(filters.mood || 'Happy', {
          language: filters.language || 'en',
          year: filters.timeRange && filters.timeRange !== 'all' ? parseInt(filters.timeRange) : undefined,
        });
        setMovies(response.results);

        const providerPromises = response.results.map(movie => 
          getWatchProviders(movie.id)
            .then(data => ({ [movie.id]: data.results }))
            .catch(() => ({ [movie.id]: null }))
        );
        
        const providers = await Promise.all(providerPromises);
        setWatchProviders(Object.assign({}, ...providers));
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [filters]);

  const handleFilterChange = (key: keyof FinderFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setSelectedMovie(null);
  };

  const handleMovieClick = (movieId: number) => {
    setSelectedMovie(selectedMovie === movieId ? null : movieId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FilterSection filters={filters} onFilterChange={handleFilterChange} />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-64 space-y-4"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-gray-400">Finding the perfect movies for you...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="bg-red-500/10 rounded-lg p-4 inline-block">
              <p className="text-red-400">{error}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="movies"
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            <AnimatePresence>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isSelected={selectedMovie === movie.id}
                  onSelect={() => handleMovieClick(movie.id)}
                  isFavorite={favoriteMovies.includes(movie.id)}
                  onToggleFavorite={() => toggleFavorite(movie.id)}
                  watchProviders={watchProviders[movie.id]}
                  mood={filters.mood}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieFinder; 
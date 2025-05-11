import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
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

        // Fetch watch providers for each movie
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
  };

  const handleMovieClick = (movieId: number) => {
    setSelectedMovie(selectedMovie === movieId ? null : movieId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Find Your Perfect Movie</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              I'm feeling...
            </label>
            <select
              value={filters.mood}
              onChange={(e) => handleFilterChange('mood', e.target.value as keyof typeof MOOD_MAPPINGS)}
              className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
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
              onChange={(e) => handleFilterChange('timeRange', e.target.value)}
              className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
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
              onChange={(e) => handleFilterChange('service', e.target.value)}
              className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
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
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-400 py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="relative">
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(movie.id);
                    }}
                    className="p-1 rounded-full bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800"
                  >
                    <HeartIcon 
                      className={`h-4 w-4 ${
                        favoriteMovies.includes(movie.id) ? 'text-pink-500' : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium truncate">{movie.title}</h3>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>

                {selectedMovie === movie.id && (
                  <div className="mt-4 border-t border-gray-700 pt-4">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {movie.overview}
                    </p>
                    
                    {watchProviders[movie.id]?.US && (
                      <WatchProviders providers={watchProviders[movie.id].US} />
                    )}
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-400">Perfect for {filters.mood.toLowerCase()} moments</span>
                      <a 
                        href={`https://www.themoviedb.org/movie/${movie.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        More Info
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieFinder; 
import React, { useState, useEffect } from 'react';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useMood } from '../context/MoodContext';
import { getMoviesByMood, searchMovies, getWatchProviders, Movie, WatchProviderData } from '../services/tmdb';
import { LANGUAGES, TMDB_IMAGE_BASE_URL } from '../config/api';

interface Filters {
  language: string;
  year: number | '';
  page: number;
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

const MovieGrid: React.FC = () => {
  const { currentMood, favoriteMovies, toggleFavorite } = useMood();
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [watchProviders, setWatchProviders] = useState<{[key: number]: any}>({});
  
  const [filters, setFilters] = useState<Filters>({
    language: 'en',
    year: '',
    page: 1
  });

  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getMoviesByMood(currentMood || 'Happy', {
          language: filters.language,
          year: filters.year || undefined,
          page: filters.page
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
        setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentMood, filters]);

  const handleMovieClick = (movieId: number) => {
    setSelectedMovie(selectedMovie === movieId ? null : movieId);
  };

  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-white">
          {currentMood ? `${currentMood} Movies` : 'All Movies'}
        </h2>

        <div className="flex flex-wrap gap-4">
          <select
            value={filters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            className="bg-gray-800 text-white rounded-md px-3 py-2 text-sm"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <select
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value ? parseInt(e.target.value) : '')}
            className="bg-gray-800 text-white rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div 
              className="relative cursor-pointer"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img 
                src={`${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover hover:opacity-75 transition-opacity"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x750?text=No+Image';
                }}
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <span className="px-2 py-1 rounded-full bg-gray-900/80 text-xs text-white backdrop-blur-sm">
                  {currentMood}
                </span>
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
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-white">{movie.title}</h3>
                <div className="flex items-center space-x-1">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-400 mb-2">
                <span>{new Date(movie.release_date).getFullYear()}</span>
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
                    <span className="text-sm text-gray-400">Perfect for {currentMood?.toLowerCase()} moments</span>
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
          </div>
        ))}
      </div>

      {movies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No movies found for {currentMood} mood. Try adjusting your filters.
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => handleFilterChange('page', filters.page - 1)}
          disabled={filters.page === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded-l-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handleFilterChange('page', filters.page + 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-r-md border-l border-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieGrid; 
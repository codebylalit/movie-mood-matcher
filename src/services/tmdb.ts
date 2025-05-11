import { TMDB_API_KEY, TMDB_ACCESS_TOKEN, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL, MOOD_MAPPINGS } from '../config/api';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  original_language: string;
  genres?: { id: number; name: string }[];
}

export interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieFilters {
  language?: string;
  year?: number;
  mood?: string;
  page?: number;
}

export type ImageSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';

export const getImageUrl = (path: string | null, size: ImageSize = 'w500'): string => {
  if (!path) {
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

const headers = {
  'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
  'accept': 'application/json'
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`TMDB API Error: ${response.status} - ${errorData.status_message || response.statusText}`);
  }
  return response.json();
};

const appendApiKey = (url: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}api_key=${TMDB_API_KEY}`;
};

export const searchMovies = async (query: string, page = 1): Promise<TMDBResponse> => {
  const url = appendApiKey(`${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
  const response = await fetch(url, { headers });
  return handleResponse(response);
};

export const getMoviesByMood = async (mood: string, filters: MovieFilters = {}): Promise<TMDBResponse> => {
  const moodMapping = MOOD_MAPPINGS[mood as keyof typeof MOOD_MAPPINGS];
  if (!moodMapping) {
    throw new Error(`Invalid mood: ${mood}`);
  }

  const { genres } = moodMapping;
  const { language = 'en', year, page = 1 } = filters;

  const params = new URLSearchParams({
    with_genres: genres.join(','),
    language,
    page: page.toString(),
    sort_by: 'popularity.desc',
    include_adult: 'false',
    'vote_count.gte': '50'  // Ensure we get movies with sufficient votes
  });

  if (year) {
    params.append('primary_release_year', year.toString());
  }

  const url = appendApiKey(`${TMDB_BASE_URL}/discover/movie?${params}`);
  const response = await fetch(url, { headers });
  return handleResponse(response);
};

export const getMovieKeywords = async (movieId: number): Promise<any> => {
  const url = appendApiKey(`${TMDB_BASE_URL}/movie/${movieId}/keywords`);
  const response = await fetch(url, { headers });
  return handleResponse(response);
};

export const getMovieDetails = async (movieId: number): Promise<any> => {
  const url = appendApiKey(`${TMDB_BASE_URL}/movie/${movieId}?append_to_response=videos,credits`);
  const response = await fetch(url, { headers });
  return handleResponse(response);
};

export const getMovieGenres = async (): Promise<any> => {
  const url = appendApiKey(`${TMDB_BASE_URL}/genre/movie/list`);
  const response = await fetch(url, { headers });
  return handleResponse(response);
};

export interface WatchProviderData {
  link: string;
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
}

export interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface WatchProviderResponse {
  id: number;
  results: {
    [country: string]: WatchProviderData;
  };
}

export const getWatchProviders = async (movieId: number): Promise<WatchProviderResponse> => {
  const url = appendApiKey(`${TMDB_BASE_URL}/movie/${movieId}/watch/providers`);
  const response = await fetch(url, { headers });
  return handleResponse(response);
};

// Natural language mood detection
export const detectMoodFromText = (text: string): string => {
  const moodKeywords = {
    Happy: ['happy', 'joy', 'excited', 'cheerful', 'great'],
    Sad: ['sad', 'down', 'depressed', 'unhappy', 'blue'],
    Energetic: ['energetic', 'pumped', 'active', 'energized'],
    Calm: ['calm', 'relaxed', 'peaceful', 'tranquil'],
    Romantic: ['romantic', 'love', 'passionate', 'dreamy'],
    Stressed: ['stressed', 'anxious', 'worried', 'tense'],
    Inspired: ['inspired', 'motivated', 'determined', 'ambitious'],
  };

  const lowercaseText = text.toLowerCase();
  
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    if (keywords.some(keyword => lowercaseText.includes(keyword))) {
      return mood;
    }
  }

  return 'Happy'; // Default mood
}; 
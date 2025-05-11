export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  runtime: number;
  genres: Genre[];
  streaming_services?: string[];
}

export interface Genre {
  id: number;
  name: string;
}

export type Mood = 'Happy' | 'Sad' | 'Romantic' | 'Excited' | 'Relaxed' | 'Thrilled' | 'Nostalgic';

export type TimeRange = '<30 min' | '1-1.5 hrs' | '2+ hrs';

export interface StreamingService {
  id: string;
  name: string;
  logo: string;
}

export interface MovieFilters {
  mood: Mood;
  timeRange: TimeRange;
  streamingServices: string[];
  genres: number[];
} 
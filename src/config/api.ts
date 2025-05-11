export const TMDB_API_KEY = '2cc55c677ecabb765164079222ca1a54';
export const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2M1NWM2NzdlY2FiYjc2NTE2NDA3OTIyMmNhMWE1NCIsIm5iZiI6MS43NDY5ODA3MDA2ODk5OTk4ZSs5LCJzdWIiOiI2ODIwY2Y1Y2JmNmMyMDU0ODE3ZTc4M2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rF9jYXGMqiAFjWW45UXMTC3f4pMFS4fmjOzlpQQ3ASY';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Mood to genre mapping for better movie recommendations
export const MOOD_MAPPINGS = {
  Happy: {
    genres: [35, 10751], // Comedy, Family
  },
  Sad: {
    genres: [18, 10749], // Drama, Romance
  },
  Energetic: {
    genres: [28, 12], // Action, Adventure
  },
  Calm: {
    genres: [99, 36], // Documentary, History
  },
  Romantic: {
    genres: [10749], // Romance
  },
  Stressed: {
    genres: [35, 16], // Comedy, Animation
  },
  Inspired: {
    genres: [18, 36], // Drama, History
  },
};

// Language options
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'hi', name: 'Hindi' },
]; 
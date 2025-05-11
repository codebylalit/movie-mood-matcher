export interface Movie {
  id: number;
  title: string;
  rating: number;
  year: number;
  mood: string;
  image: string;
  description: string;
  genres: string[];
}

export const movies: Movie[] = [
  {
    id: 1,
    title: 'La La Land',
    rating: 8.0,
    year: 2016,
    mood: 'Romantic',
    image: 'https://via.placeholder.com/300x400',
    description: 'A jazz pianist and an aspiring actress fall in love while pursuing their dreams in Los Angeles.',
    genres: ['Musical', 'Romance', 'Drama']
  },
  {
    id: 2,
    title: 'The Secret Life of Walter Mitty',
    rating: 7.3,
    year: 2013,
    mood: 'Inspirational',
    image: 'https://via.placeholder.com/300x400',
    description: 'A daydreaming office worker embarks on a global journey to find a missing photograph.',
    genres: ['Adventure', 'Comedy', 'Drama']
  },
  {
    id: 3,
    title: 'Inside Out',
    rating: 8.2,
    year: 2015,
    mood: 'Happy',
    image: 'https://via.placeholder.com/300x400',
    description: 'The emotions inside a young girl\'s head help her deal with moving to a new city.',
    genres: ['Animation', 'Adventure', 'Comedy']
  },
  {
    id: 4,
    title: 'The Pursuit of Happyness',
    rating: 8.0,
    year: 2006,
    mood: 'Inspirational',
    image: 'https://via.placeholder.com/300x400',
    description: 'A struggling salesman takes custody of his son as he embarks on a life-changing journey.',
    genres: ['Biography', 'Drama']
  },
  {
    id: 5,
    title: 'Amélie',
    rating: 8.3,
    year: 2001,
    mood: 'Whimsical',
    image: 'https://via.placeholder.com/300x400',
    description: 'A shy waitress decides to change the lives of those around her for the better.',
    genres: ['Comedy', 'Romance']
  },
  {
    id: 6,
    title: 'Good Will Hunting',
    rating: 8.3,
    year: 1997,
    mood: 'Inspirational',
    image: 'https://via.placeholder.com/300x400',
    description: 'A janitor at MIT has a gift for mathematics and must choose between success and loyalty.',
    genres: ['Drama', 'Romance']
  },
  {
    id: 7,
    title: '500 Days of Summer',
    rating: 7.7,
    year: 2009,
    mood: 'Romantic',
    image: 'https://via.placeholder.com/300x400',
    description: 'An offbeat romantic comedy about a woman who doesn\'t believe true love exists.',
    genres: ['Comedy', 'Drama', 'Romance']
  },
  {
    id: 8,
    title: 'The Intouchables',
    rating: 8.5,
    year: 2011,
    mood: 'Happy',
    image: 'https://via.placeholder.com/300x400',
    description: 'A quadriplegic aristocrat develops an unlikely friendship with his caregiver.',
    genres: ['Biography', 'Comedy', 'Drama']
  },
  {
    id: 9,
    title: 'Dead Poets Society',
    rating: 8.1,
    year: 1989,
    mood: 'Inspirational',
    image: 'https://via.placeholder.com/300x400',
    description: 'An English teacher inspires his students through poetry and seizing the day.',
    genres: ['Comedy', 'Drama']
  },
  {
    id: 10,
    title: 'Big Hero 6',
    rating: 7.8,
    year: 2014,
    mood: 'Happy',
    image: 'https://via.placeholder.com/300x400',
    description: 'A young prodigy and his healthcare companion robot uncover a criminal plot.',
    genres: ['Animation', 'Action', 'Adventure']
  }
]; 
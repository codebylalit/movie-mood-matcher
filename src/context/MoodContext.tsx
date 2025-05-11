import React, { createContext, useContext, useState, useEffect } from 'react';

interface MoodContextType {
  currentMood: string | null;
  setCurrentMood: (mood: string) => void;
  favoriteMovies: number[];
  toggleFavorite: (movieId: number) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMood, setCurrentMood] = useState<string | null>(() => {
    const saved = localStorage.getItem('currentMood');
    return saved || null;
  });

  const [favoriteMovies, setFavoriteMovies] = useState<number[]>(() => {
    const saved = localStorage.getItem('favoriteMovies');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('currentMood', currentMood || '');
  }, [currentMood]);

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  const toggleFavorite = (movieId: number) => {
    setFavoriteMovies(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <MoodContext.Provider value={{
      currentMood,
      setCurrentMood,
      favoriteMovies,
      toggleFavorite
    }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}; 
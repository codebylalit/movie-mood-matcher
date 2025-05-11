import React from 'react';
import { 
  HeartIcon, // Happy/Romantic
  CloudIcon, // Calm/Relaxed
  SparklesIcon, // Excited
  FaceSmileIcon, // Feel-good
  FireIcon, // Energetic
  MoonIcon, // Melancholic
  LightBulbIcon // Inspirational
} from '@heroicons/react/24/outline';
import { useMood } from '../context/MoodContext';

const Categories = () => {
  const { currentMood, setCurrentMood } = useMood();

  const moods = [
    { id: 1, name: 'Happy', icon: FaceSmileIcon, color: 'text-yellow-400' },
    { id: 2, name: 'Romantic', icon: HeartIcon, color: 'text-pink-400' },
    { id: 3, name: 'Calm', icon: CloudIcon, color: 'text-blue-400' },
    { id: 4, name: 'Excited', icon: SparklesIcon, color: 'text-purple-400' },
    { id: 5, name: 'Energetic', icon: FireIcon, color: 'text-red-400' },
    { id: 6, name: 'Melancholic', icon: MoonIcon, color: 'text-indigo-400' },
    { id: 7, name: 'Inspirational', icon: LightBulbIcon, color: 'text-green-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-xl font-bold text-white mb-4">How are you feeling today?</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = currentMood === mood.name;
          return (
            <button
              key={mood.id}
              onClick={() => setCurrentMood(mood.name)}
              className={`flex items-center space-x-2 px-6 py-3
                       ${isSelected ? 'bg-gray-700/70' : 'bg-gray-800/50'}
                       hover:bg-gray-700/50 rounded-full backdrop-blur-sm
                       text-gray-300 hover:text-white transition duration-300
                       whitespace-nowrap flex-shrink-0 hover:scale-105 
                       ${isSelected ? 'ring-2 ring-blue-500' : ''}
                       ${mood.color}`}
            >
              <Icon className="h-5 w-5" />
              <span>{mood.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories; 
import React, { useState } from 'react';
import { useMood } from '../context/MoodContext';
import MoodQuiz from './MoodQuiz/MoodQuiz';

const Hero = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const { currentMood } = useMood();

  return (
    <>
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Movie Match
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Let your mood guide you to the perfect movie. Tell us how you're feeling,
              and we'll recommend the best films for your current state of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl p-6 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-4">😊</div>
              <h3 className="text-xl font-bold text-white mb-2">Happy Mood</h3>
              <p className="text-gray-300">Feel-good movies that will keep your spirits high</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-4">😌</div>
              <h3 className="text-xl font-bold text-white mb-2">Calm Mood</h3>
              <p className="text-gray-300">Relaxing films for your peaceful moments</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Energetic Mood</h3>
              <p className="text-gray-300">Action-packed movies to match your energy</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => setShowQuiz(true)}
              className="btn btn-primary text-lg px-8 py-3 hover:scale-105 transform transition-transform duration-200"
            >
              {currentMood ? 'Retake Mood Quiz' : 'Take the Mood Quiz'}
            </button>
          </div>
        </div>
      </div>

      {showQuiz && <MoodQuiz onClose={() => setShowQuiz(false)} />}
    </>
  );
};

export default Hero; 
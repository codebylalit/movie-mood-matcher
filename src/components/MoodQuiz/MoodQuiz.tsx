import React, { useState } from 'react';
import { useMood } from '../../context/MoodContext';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    mood: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How are you feeling right now?",
    options: [
      { text: "Excited and energetic", mood: "Energetic", score: 5 },
      { text: "Peaceful and relaxed", mood: "Calm", score: 5 },
      { text: "Happy and cheerful", mood: "Happy", score: 5 },
      { text: "Romantic and dreamy", mood: "Romantic", score: 5 }
    ]
  },
  {
    id: 2,
    text: "What kind of ending would you prefer?",
    options: [
      { text: "Something uplifting and inspiring", mood: "Inspirational", score: 4 },
      { text: "A happy, feel-good ending", mood: "Happy", score: 4 },
      { text: "A thoughtful, meaningful conclusion", mood: "Melancholic", score: 4 },
      { text: "An exciting, thrilling finale", mood: "Energetic", score: 4 }
    ]
  },
  {
    id: 3,
    text: "What's your ideal pace for a movie right now?",
    options: [
      { text: "Fast-paced and action-packed", mood: "Energetic", score: 3 },
      { text: "Slow and contemplative", mood: "Calm", score: 3 },
      { text: "Balanced with emotional moments", mood: "Romantic", score: 3 },
      { text: "Light and entertaining", mood: "Happy", score: 3 }
    ]
  }
];

const MoodQuiz: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [moodScores, setMoodScores] = useState<Record<string, number>>({});
  const { setCurrentMood } = useMood();

  const handleAnswer = (selectedOption: { mood: string; score: number }) => {
    setMoodScores(prev => ({
      ...prev,
      [selectedOption.mood]: (prev[selectedOption.mood] || 0) + selectedOption.score
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quiz completed, determine dominant mood
      const dominantMood = Object.entries(moodScores).reduce((a, b) => 
        (a[1] > b[1] ? a : b)
      )[0];
      setCurrentMood(dominantMood);
      onClose();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <div className="mb-8">
          <div className="h-1 w-full bg-gray-800 rounded-full mb-4">
            <div 
              className="h-1 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">
          {questions[currentQuestion].text}
        </h2>

        <div className="grid gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-left
                       text-gray-300 hover:text-white transition-all duration-200
                       hover:translate-x-2"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodQuiz; 
import React from 'react';

interface MoodQuizProps {
  // Add props here as needed
}

const MoodQuiz: React.FC<MoodQuizProps> = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Mood Quiz</h2>
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          Take our quiz to find movies that match your current mood!
        </p>
        <button className="btn btn-primary">
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default MoodQuiz;

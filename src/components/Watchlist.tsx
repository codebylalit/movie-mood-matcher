import React from 'react';

interface WatchlistProps {
  // Add props here as needed
}

const Watchlist: React.FC<WatchlistProps> = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">My Watchlist</h2>
      <div className="space-y-4">
        {/* Placeholder for watchlist items */}
        <p className="text-gray-600 dark:text-gray-300">Your watchlist is empty. Add some movies!</p>
      </div>
    </div>
  );
};

export default Watchlist;

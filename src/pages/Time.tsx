import React, { useEffect, useState } from "react";

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const formatDate = (date: Date) =>
  date.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Time: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-responsive-2xl font-bold text-darkslate dark:text-vanilla mb-4">
        Time
      </h1>
      <p className="text-darkslate/80 dark:text-vanilla/80 text-responsive-base mb-8">
        A simple local time view for the app route.
      </p>
      <div className="bg-white/90 dark:bg-darkslate/90 border border-darkslate/10 dark:border-vanilla/10 rounded-3xl shadow-lg p-8 sm:p-12">
        <div className="text-4xl sm:text-6xl font-bold text-mustard dark:text-vanilla font-mono tracking-tight">
          {formatTime(currentTime)}
        </div>
        <div className="mt-4 text-lg sm:text-xl text-darkslate/80 dark:text-vanilla/80">
          {formatDate(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default Time;

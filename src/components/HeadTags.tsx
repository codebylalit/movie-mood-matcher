import React from 'react';
import { Helmet } from 'react-helmet-async';

const HeadTags: React.FC = () => {
  return (
    <Helmet>
      {/* AdSense Script */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2484863449091466"
        crossOrigin="anonymous"
      />
      
      {/* Meta tags for better SEO */}
      <meta name="description" content="Discover movies that match your mood with MovieMood - Your personalized movie companion for every emotion." />
      <meta name="keywords" content="movies, mood, recommendations, watch movies, movie finder, emotional movies" />
      <meta property="og:title" content="MovieMood - Find Movies That Match Your Mood" />
      <meta property="og:description" content="Discover the perfect movie for your current mood with MovieMood." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="MovieMood - Mood-Based Movie Recommendations" />
      <meta name="twitter:description" content="Find the perfect movie based on your mood with MovieMood." />
    </Helmet>
  );
};

export default HeadTags; 
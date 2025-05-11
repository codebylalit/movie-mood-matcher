import React from 'react';
import AdSense from '../components/AdSense';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">About MovieMood</h1>

      <div className="grid gap-8">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            At MovieMood, we believe that every emotion deserves its perfect movie match. Our mission
            is to help you discover films that resonate with your current mood, making your movie
            watching experience more personal and meaningful.
          </p>
        </div>

        <AdSense
          slot="6802457913"
          format="auto"
          className="my-8"
        />

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
          <div className="space-y-4 text-gray-300">
            <p className="leading-relaxed">
              Our innovative mood-based recommendation system analyzes various aspects of films,
              including genre, tone, themes, and viewer reactions, to suggest movies that match
              your emotional state.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Select your current mood</li>
              <li>Choose your preferred genres</li>
              <li>Filter by release year or streaming service</li>
              <li>Get personalized movie recommendations</li>
            </ul>
          </div>
        </div>

        <AdSense
          slot="7913568024"
          format="auto"
          className="my-8"
        />

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Our Technology</h2>
          <p className="text-gray-300 leading-relaxed">
            We leverage the powerful TMDB API to provide you with accurate and up-to-date movie
            information. Our platform combines this data with sophisticated mood mapping algorithms
            to deliver precise recommendations tailored to your emotional state.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">The Team</h2>
          <p className="text-gray-300 leading-relaxed">
            MovieMood is created by a passionate team of movie enthusiasts and technology experts.
            We're dedicated to continuously improving our platform to provide you with the best
            possible movie discovery experience.
          </p>
        </div>

        <AdSense
          slot="8024679135"
          format="auto"
          className="my-8"
        />

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-300 leading-relaxed">
            We love hearing from our users! If you have any questions, suggestions, or just want
            to say hello, don't hesitate to contact us at support@moviemood.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 
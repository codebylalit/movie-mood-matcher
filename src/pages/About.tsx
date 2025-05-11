import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">About Movie Mood</h1>
      
      <div className="space-y-8 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="leading-relaxed">
            Movie Mood was created with a simple yet powerful idea: to help people find the perfect movie that matches their current emotional state. We believe that movies have the unique ability to resonate with our feelings, whether we're seeking comfort, inspiration, or pure entertainment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
          <p className="leading-relaxed mb-4">
            Our innovative mood-matching algorithm considers various factors to recommend movies that align with your current emotional state:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Emotional resonance and thematic elements</li>
            <li>Pacing and narrative style</li>
            <li>Visual and musical atmosphere</li>
            <li>User feedback and ratings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Our Team</h2>
          <p className="leading-relaxed">
            Movie Mood is maintained by a passionate team of film enthusiasts, data scientists, and developers who believe in the power of cinema to transform moods and create meaningful experiences. We continuously update our movie database and refine our recommendation system to provide you with the best possible matches.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Join Our Community</h2>
          <p className="leading-relaxed">
            We invite you to be part of our growing community of movie lovers. Share your experiences, discover new films, and help others find their perfect mood match. Follow us on social media to stay updated with the latest features and movie recommendations.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About; 
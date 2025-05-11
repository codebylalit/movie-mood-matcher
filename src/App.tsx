import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import MovieGrid from './components/MovieGrid';
import MovieFinder from './components/MovieFinder';
import Favorites from './components/Favorites/Favorites';
import { MoodProvider } from './context/MoodContext';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <MoodProvider>
                <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">
                    <Navbar />
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={
                                <main>
                                    <Hero />
                                    <Categories />
                                    <MovieFinder />
                                </main>
                            } />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/terms" element={<Terms />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </MoodProvider>
        </Router>
    );
}

export default App; 
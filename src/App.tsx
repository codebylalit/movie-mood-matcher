import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import HeadTags from './components/HeadTags';
import AdSense from './components/AdSense';

function App() {
    return (
        <HelmetProvider>
            <Router>
                <MoodProvider>
                    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">
                        <HeadTags />
                        <Navbar />
                        <div className="flex-grow">
                            <Routes>
                                <Route path="/" element={
                                    <>
                                        <Hero />
                                        <Categories />
                                        <div className="my-8">
                                            <AdSense
                                                slot="1234567890"
                                                format="auto"
                                                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                                            />
                                        </div>
                                        <MovieFinder />
                                        <div className="my-8">
                                            <AdSense
                                                slot="0987654321"
                                                format="auto"
                                                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                                            />
                                        </div>
                                    </>
                                } />
                                <Route path="/favorites" element={
                                    <>
                                        <Favorites />
                                        <div className="my-8">
                                            <AdSense
                                                slot="1357924680"
                                                format="auto"
                                                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                                            />
                                        </div>
                                    </>
                                } />
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
        </HelmetProvider>
    );
}

export default App; 
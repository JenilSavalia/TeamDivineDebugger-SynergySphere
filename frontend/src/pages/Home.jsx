// src/components/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative w-full h-screen bg-gray-50 overflow-hidden">
            {/* Floating Icons */}
            <motion.div
                initial={{ x: '-100vw', y: '-100vh' }}
                animate={{ x: '100vw', y: '100vh' }}
                transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                className="absolute top-0 left-0 z-0 opacity-20"
            >
                <svg
                    width="100"
                    height="100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="animate-pulse text-blue-300 opacity-30"
                >
                    <circle cx="50" cy="50" r="40" stroke="blue" strokeWidth="5" fill="none" />
                </svg>
            </motion.div>

            <motion.div
                initial={{ x: '100vw', y: '-50vh' }}
                animate={{ x: '-100vw', y: '50vh' }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute top-0 left-0 z-0 opacity-25"
            >
                <svg
                    width="80"
                    height="80"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="animate-pulse text-blue-400 opacity-30"
                >
                    <rect x="10" y="10" width="80" height="80" stroke="blue" strokeWidth="5" fill="none" />
                </svg>
            </motion.div>

            <motion.div
                initial={{ x: '-50vw', y: '50vh' }}
                animate={{ x: '50vw', y: '-50vh' }}
                transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                className="absolute top-0 left-0 z-0 opacity-30"
            >
                <svg
                    width="60"
                    height="60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="animate-pulse text-blue-500 opacity-30"
                >
                    <polygon points="50,15 61,35 80,35 66,50 71,80 50,62 29,80 34,50 20,35 39,35" stroke="blue" strokeWidth="5" fill="none" />
                </svg>
            </motion.div>

            {/* Main Hero Content */}
            <div className="flex items-center justify-center h-full px-6 relative z-10">
                <div className="text-center text-blue-700">
                    {/* Hero Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-5xl font-semibold leading-tight mb-6"
                    >
                        Elevate Your Team's Potential
                    </motion.h1>

                    {/* Hero Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="text-lg md:text-xl mb-8 text-gray-600"
                    >
                        SynergySphere empowers teams to stay aligned, make smarter decisions, and collaborate seamlessly.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="flex justify-center gap-6"
                    >
                        <Link to="/auth">
                            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-800 transition ease-in-out duration-300">
                                Get Started
                            </button>
                        </Link>
                        {/* <button className="bg-transparent border-2 border-blue-700 text-blue-700 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 hover:text-white transition ease-in-out duration-300">
                            Learn More
                        </button> */}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;

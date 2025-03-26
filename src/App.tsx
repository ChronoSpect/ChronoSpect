import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingAnimation from './components/LoadingAnimation';
import Navbar from './components/Navbar';
import Section from './components/Section';
import LandingPage from './components/LandingPage';
import { ArrowRight, Clock, Brain, Radio, Users, ChevronDown } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterClick = useCallback(() => {
    setShowMainContent(true);
    // Use requestAnimationFrame to ensure the DOM has updated
    requestAnimationFrame(() => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <AnimatePresence mode="wait">
        {loading && <LoadingAnimation />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showMainContent ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onEnterClick={handleEnterClick} />
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            id="main-content" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.5,
              ease: "easeOut"
            }}
            className="relative"
          >
            <Navbar />
            <Section id="home" className="relative flex items-center min-h-screen">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                  <motion.h1 
                    className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Experience History Like Never Before
                  </motion.h1>
                  <motion.p 
                    className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Step into the past with ChronoSpect. Relive historical moments through immersive AR/VR technology.
                  </motion.p>
                  <motion.div 
                    className="mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <a 
                      href="#about" 
                      className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                    >
                      Explore Now <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </Section>

            <Section id="about" className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <motion.h2 
                    className="text-3xl font-bold mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    About ChronoSpect
                  </motion.h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div 
                      className="p-6 bg-gray-800 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <Clock className="w-12 h-12 text-purple-500 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Time Travel</h3>
                      <p className="text-gray-300">Experience historical events as if you were there, with our cutting-edge time travel technology.</p>
                    </motion.div>
                    <motion.div 
                      className="p-6 bg-gray-800 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <Brain className="w-12 h-12 text-purple-500 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Immersive Learning</h3>
                      <p className="text-gray-300">Learn history through interactive experiences that engage all your senses.</p>
                    </motion.div>
                    <motion.div 
                      className="p-6 bg-gray-800 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <Radio className="w-12 h-12 text-purple-500 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Historical Accuracy</h3>
                      <p className="text-gray-300">Every detail is meticulously researched and verified by historical experts.</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="features" className="py-20 bg-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <motion.h2 
                    className="text-3xl font-bold mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Features
                  </motion.h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div 
                      className="p-6 bg-gray-900 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xl font-semibold mb-4">Virtual Time Machine</h3>
                      <p className="text-gray-300">Step into any historical period with our advanced VR technology.</p>
                    </motion.div>
                    <motion.div 
                      className="p-6 bg-gray-900 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold mb-4">Interactive Scenarios</h3>
                      <p className="text-gray-300">Make decisions and see how they affect historical outcomes.</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="contact" className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <motion.h2 
                    className="text-3xl font-bold mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Get Started
                  </motion.h2>
                  <motion.div 
                    className="max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-gray-300 mb-6">
                      Ready to experience history like never before? Sign up now and get early access to our platform.
                    </p>
                    <button className="px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200">
                      Sign Up Now
                    </button>
                  </motion.div>
                </div>
              </div>
            </Section>

            <footer className="py-8 bg-gray-900 border-t border-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center text-gray-400">
                  <p>© {new Date().getFullYear()} ChronoSpect. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
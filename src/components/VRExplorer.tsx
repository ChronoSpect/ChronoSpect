import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, RefreshCw } from 'lucide-react';

// Import destination images
import hampiImage from '../assets/hampi.png';
import nalandaImage from '../assets/nalanda.png';

interface Destination {
  title: string;
  image: string;
  description: string;
}

const destinations: Record<string, Destination> = {
  'hampi': {
    title: 'Hampi',
    image: hampiImage,
    description: 'Experience the ancient ruins of Hampi in stunning VR. Walk among the historical temples and structures of this UNESCO World Heritage Site, dating back to the Vijayanagara Empire of the 14th century. Explore the stone chariot, Vittala Temple, and the beautiful riverside landscapes in an immersive virtual reality experience.'
  },
  'nalanda': {
    title: 'Nalanda',
    image: nalandaImage,
    description: 'Step into the ancient learning center of Nalanda, one of the world\'s oldest universities. In this VR experience, you can explore the vast complex of monasteries, temples, and learning halls that once housed thousands of students and teachers. Discover the rich educational heritage of this UNESCO World Heritage Site through an immersive virtual journey.'
  }
};

const VRExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [destination, setDestination] = useState<Destination | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    if (destinations[query]) {
      setDestination(destinations[query]);
      setShowResult(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const resetSearch = () => {
    setSearchQuery('');
    setShowResult(false);
  };

  const handleViewMore = () => {
    // You can replace this with actual navigation
    window.location.href = '/experiences';
  };

  // Create particle elements for background animation
  useEffect(() => {
    const container = document.querySelector('.vr-background');
    if (!container) return;

    // Clear previous particles
    const existingParticles = container.querySelectorAll('.vr-particle');
    existingParticles.forEach(particle => particle.remove());

    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.classList.add('vr-particle');
      
      // Random properties
      const size = Math.random() * 100 + 50;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      container.appendChild(particle);
    }
  }, []);

  return (
    <div className="vr-explorer relative w-full overflow-hidden pt-10">
      {/* Background Animation */}
      <div className="vr-background absolute inset-0 z-0 overflow-hidden"></div>
      
      {/* VR Explorer Content */}
      <div className="relative z-10">
        <motion.h3 
          className="text-4xl font-bold mb-6 glitch-text text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          VIRTUAL REALITY EXPLORER
        </motion.h3>
        
        <motion.p 
          className="text-xl text-purple-300 text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Discover Ancient Wonders in VR
        </motion.p>
        
        {/* Search Box */}
        <motion.div 
          className="max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className={`search-container flex items-center bg-gray-800/50 backdrop-blur-sm border-2 ${error ? 'border-red-500' : 'border-purple-500'} rounded-full px-5 py-3 shadow-lg transition-all duration-300 hover:shadow-purple-500/20`}>
            <Search className="w-6 h-6 text-purple-400 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search a destination to explore in VR..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
            />
            <button 
              onClick={handleSearch}
              className="search-btn bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full transition-transform duration-300 hover:scale-110"
            >
              <MapPin className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center text-gray-400 text-sm mt-2">
            Try searching: "Hampi" or "Nalanda"
          </div>
        </motion.div>
        
        {/* Results Section */}
        {showResult && destination && (
          <motion.div 
            className="result-container max-w-4xl mx-auto bg-gray-800/40 backdrop-blur-md rounded-xl overflow-hidden border border-purple-500/50 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              type: "spring", 
              stiffness: 100 
            }}
          >
            <div className="result-header flex justify-between items-center p-5 border-b border-purple-500/30">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {destination.title}
              </h3>
              <div className="badge bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                VR READY
              </div>
            </div>
            
            <div className="image-wrapper relative overflow-hidden h-[350px]">
              <motion.img 
                src={destination.image} 
                alt={destination.title}
                className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 10 }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 flex items-end justify-center p-5">
                <div className="bg-black/50 px-4 py-2 rounded border-l-2 border-r-2 border-l-purple-500 border-r-blue-500 text-sm">
                  IMMERSIVE EXPERIENCE
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <p className="text-gray-300 mb-6">
                {destination.description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={handleViewMore}
                  className="vr-btn flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-1"
                >
                  <span>VIEW MORE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={resetSearch}
                  className="vr-btn-secondary flex items-center gap-2 bg-transparent border border-purple-500 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:bg-purple-500/10"
                >
                  <span>NEW SEARCH</span>
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VRExplorer;

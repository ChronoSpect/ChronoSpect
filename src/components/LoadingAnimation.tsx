import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="relative w-32 h-32"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      >
        <motion.div 
          className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full"
          animate={{ 
            rotate: [0, 180],
            borderWidth: [4, 2, 4],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute inset-2 border-4 border-transparent border-t-blue-500 rounded-full"
          animate={{ 
            rotate: [180, 0],
            borderWidth: [4, 2, 4],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation;
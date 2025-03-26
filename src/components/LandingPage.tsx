import { motion, useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onEnterClick: () => void;
}

const LandingPage = ({ onEnterClick }: LandingPageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showEnter, setShowEnter] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 12, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig) as MotionValue<number>;
  const cursorYSpring = useSpring(cursorY, springConfig) as MotionValue<number>;

  const moveCursor = useCallback((e: MouseEvent) => {
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    setMouseSpeed(distance);
    setLastMousePos({ x: e.clientX, y: e.clientY });
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [lastMousePos, cursorX, cursorY]);

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [moveCursor]);

  const letters = "CHRONOSPECT".split("");

  const getLetterScale = useCallback((index: number) => {
    if (!isHovered || hoveredIndex === null) return 1;
    
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 20;
    if (distance === 1) return 15;
    if (distance === 2) return 10;
    return 1;
  }, [isHovered, hoveredIndex]);

  const getLetterOpacity = useCallback((index: number) => {
    if (!isHovered || hoveredIndex === null) return 1;
    
    const distance = Math.abs(index - hoveredIndex);
    if (distance <= 2) return 1;
    return 0.2;
  }, [isHovered, hoveredIndex]);

  const getCursorScale = useCallback(() => {
    const baseScale = isHovered ? 2.5 : 1;
    const speedScale = Math.min(1 + mouseSpeed * 0.01, 1.2);
    return baseScale * speedScale;
  }, [isHovered, mouseSpeed]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setShowEnter(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setShowEnter(false);
    setHoveredIndex(null);
  }, []);

  const handleLetterHoverStart = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleLetterHoverEnd = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 relative overflow-hidden">
      <motion.div
        className="relative z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-center items-center">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-[4rem] font-black tracking-tight bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: getLetterOpacity(index),
                y: 0,
                scaleY: getLetterScale(index),
                scaleX: 1,
                transition: {
                  type: "spring",
                  stiffness: 20,
                  damping: 12,
                  mass: 1.5,
                  delay: index * 0.01
                }
              }}
              whileHover={{ 
                scaleY: getLetterScale(index),
                transition: {
                  type: "spring",
                  stiffness: 20,
                  damping: 12,
                  mass: 1.5
                }
              }}
              onHoverStart={() => handleLetterHoverStart(index)}
              onHoverEnd={handleLetterHoverEnd}
              style={{
                transformOrigin: "center center",
                zIndex: hoveredIndex === index ? 20 : 10,
                position: "relative",
                display: "inline-block",
                whiteSpace: "nowrap",
                willChange: "transform"
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.button
        className="fixed w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full mix-blend-difference flex items-center justify-center cursor-pointer z-50 border border-white/20"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: getCursorScale(),
          opacity: isHovered ? 1 : 0.7
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          mass: 0.5
        }}
        onClick={onEnterClick}
      >
        <motion.div
          className="w-full h-full flex items-center justify-center text-white"
          animate={{
            opacity: showEnter ? 1 : 0,
            scale: showEnter ? 1 : 0
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 20,
            mass: 0.3
          }}
        >
          <ArrowRight className="w-3 h-3" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default LandingPage; 
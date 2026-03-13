import { motion } from 'motion/react';

interface SphereProps {
  text: string;
  size: number;
  position: { x: number; y: number };
  state: 'green' | 'yellow' | 'red';
  onClick: () => void;
}

const stateColors = {
  green: {
    bg: '#A8DF09',
    shadow: '0 20px 40px rgba(168, 223, 9, 0.3)'
  },
  yellow: {
    bg: '#FFCD00',
    shadow: '0 20px 40px rgba(255, 205, 0, 0.3)'
  },
  red: {
    bg: '#FF5689',
    shadow: '0 20px 40px rgba(255, 86, 137, 0.3)'
  }
};

export function Sphere({ text, size, position, state, onClick }: SphereProps) {
  const colors = stateColors[state];
  
  // Responsive size - smaller on mobile
  const responsiveSize = typeof window !== 'undefined' && window.innerWidth < 640 
    ? size * 0.6 
    : size;

  return (
    <motion.div
      className="absolute rounded-full cursor-pointer flex items-center justify-center p-4 sm:p-6 select-none"
      style={{
        width: `${responsiveSize}px`,
        height: `${responsiveSize}px`,
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        backgroundColor: colors.bg,
        boxShadow: colors.shadow
      }}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      animate={{
        y: [0, -15, 0],
        transition: {
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5 }
      }}
    >
      <div className="text-center">
        <p className="text-white drop-shadow-md leading-snug px-2 sm:px-4 text-xs sm:text-base">
          {text}
        </p>
      </div>
    </motion.div>
  );
}
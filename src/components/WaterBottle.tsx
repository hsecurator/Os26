import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import dropImage from 'figma:asset/892de908feeea9a2e86107df78e31de1e7da13e0.png';

interface WaterBottleProps {
  label: string;
  icon: React.ReactNode;
  color: string;
  value: number;
  onChange: (value: number) => void;
}

interface WaterDrop {
  id: number;
  delay: number;
}

export function WaterBottle({ label, icon, color, value, onChange }: WaterBottleProps) {
  const maxRating = 10;
  const [previousValue, setPreviousValue] = useState(value);
  const [waterDrops, setWaterDrops] = useState<WaterDrop[]>([]);
  const [dropCounter, setDropCounter] = useState(0);
  
  useEffect(() => {
    if (value > previousValue) {
      // Water is being added, create falling water drops
      const drops: WaterDrop[] = [];
      const dropCount = (value - previousValue) * 4; // More drops for chaotic effect
      
      for (let i = 0; i < dropCount; i++) {
        drops.push({
          id: dropCounter + i,
          delay: i * 0.03 + Math.random() * 0.1 // More randomized timing
        });
      }
      
      setWaterDrops(drops);
      setDropCounter(prev => prev + dropCount);
      
      // Clear drops after animation completes
      setTimeout(() => {
        setWaterDrops([]);
      }, 2000);
    }
    setPreviousValue(value);
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 flex-1 min-w-[80px] sm:min-w-[100px]">
      <div className="relative w-12 sm:w-16 h-48 sm:h-80 bg-white/80 backdrop-blur-sm rounded-full shadow-lg overflow-hidden border-2 border-white">
        {/* Water drops falling */}
        <AnimatePresence>
          {waterDrops.map((drop) => {
            // Random horizontal offset for chaotic effect
            const randomOffset = (Math.random() - 0.5) * 30;
            const randomRotation = Math.random() * 360;
            const randomScale = 0.7 + Math.random() * 0.6;
            
            return (
              <motion.div
                key={drop.id}
                className="absolute w-3 sm:w-4 h-3 sm:h-4"
                style={{
                  left: '50%',
                  top: '-15px',
                  backgroundColor: color,
                  maskImage: `url(${dropImage})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url(${dropImage})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
                initial={{ 
                  y: 0, 
                  opacity: 0.8,
                  x: randomOffset,
                  rotate: randomRotation,
                  scale: randomScale,
                }}
                animate={{ 
                  y: window.innerWidth < 640 ? 192 : 320,
                  opacity: [0.8, 1, 0],
                  x: randomOffset + (Math.random() - 0.5) * 10,
                  rotate: randomRotation + (Math.random() - 0.5) * 180,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.6 + Math.random() * 0.4,
                  delay: drop.delay,
                  ease: "easeIn"
                }}
              />
            );
          })}
        </AnimatePresence>

        {/* Water level with wave animation */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{ backgroundColor: color }}
          initial={false}
          animate={{ 
            height: `${(value / maxRating) * 100}%`,
          }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          {/* Wave effect on top */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ overflow: 'visible' }}>
            <motion.div
              className="absolute w-[200%] h-2 sm:h-3"
              style={{
                backgroundColor: color,
                borderRadius: '50%',
                filter: 'blur(1px)',
                opacity: 0.6
              }}
              animate={{
                x: ['-50%', '0%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.div>

        {/* Rating segments (clickable areas) */}
        {Array.from({ length: maxRating }).map((_, index) => {
          const segmentValue = maxRating - index;
          
          return (
            <div
              key={index}
              className="absolute left-0 right-0 h-[10%] cursor-pointer hover:bg-white/10 transition-colors z-10"
              style={{ top: `${index * 10}%` }}
              onClick={() => onChange(segmentValue)}
            />
          );
        })}

        {/* Segment dividers */}
        {Array.from({ length: maxRating - 1 }).map((_, index) => (
          <div
            key={index}
            className="absolute left-0 right-0 h-[1px] bg-gray-200/40"
            style={{ top: `${(index + 1) * 10}%` }}
          />
        ))}
      </div>
      
      <div className="flex flex-col items-center gap-1 sm:gap-2 max-w-[100px] sm:max-w-[120px] text-center">
        <div style={{ color: color }} className="w-5 h-5 sm:w-6 sm:h-6">
          {icon}
        </div>
        <p className="text-xs sm:text-sm leading-tight text-slate-700">
          {label}
        </p>
        <span className="text-[10px] sm:text-xs font-medium text-slate-500">{value}/10</span>
      </div>
    </div>
  );
}
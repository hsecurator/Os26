import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  direction?: 'forward' | 'backward';
}

export function PageTransition({ children, direction = 'forward' }: PageTransitionProps) {
  const variants = {
    initial: {
      x: direction === 'forward' ? '100%' : '-100%',
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: direction === 'forward' ? '-100%' : '100%',
      opacity: 0
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

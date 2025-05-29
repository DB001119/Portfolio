import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CursorGlow = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX - 32);
      cursorY.set(event.clientY - 32);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      style={{ x: cursorX, y: cursorY }}
    >
      {/* Primary glow */}
      <div className="w-24 h-24 rounded-full bg-primary-500/20 dark:bg-primary-400/30 blur-2xl" />
      
      {/* Secondary glow */}
      <div className="absolute inset-0 w-16 h-16 rounded-full bg-primary-600/30 dark:bg-primary-300/40 blur-xl" />
      
      {/* Core glow */}
      <div className="absolute inset-0 w-8 h-8 rounded-full bg-primary-700/40 dark:bg-primary-200/50 blur-md" />
    </motion.div>
  );
};

export default CursorGlow; 
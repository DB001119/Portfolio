import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MicroInteractionProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

const MicroInteraction: React.FC<MicroInteractionProps> = ({ 
  children, 
  className = '',
  strength = 15 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = event;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const x = (clientX - centerX) / 4;
    const y = (clientY - centerY) / 4;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    handleMouse(event);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
};

export default MicroInteraction; 
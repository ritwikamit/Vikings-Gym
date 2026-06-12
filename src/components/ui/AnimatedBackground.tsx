'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  speed: number;
  type: 'circle' | 'diamond' | 'triangle';
  color: string;
}

function generateShapes(count: number): Shape[] {
  const colors = ['#0EA5E9', '#8B5CF6', '#06B6D4', '#38BDF8', '#A78BFA'];
  const types: Shape['type'][] = ['circle', 'diamond', 'triangle'];
  const shapes: Shape[] = [];

  for (let i = 0; i < count; i++) {
    shapes.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.08 + 0.02,
      speed: Math.random() * 20 + 10,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  return shapes;
}

export function AnimatedBackground({ count = 12 }: { count?: number }) {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    setShapes(generateShapes(count));
  }, [count]);

  if (shapes.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity,
          }}
          animate={{
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
            rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
            scale: [1, Math.random() * 0.5 + 0.8, 1],
          }}
          transition={{
            duration: shape.speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {shape.type === 'circle' && (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, ${shape.color}, transparent)`,
              }}
            />
          )}
          {shape.type === 'diamond' && (
            <div
              className="w-full h-full"
              style={{
                background: shape.color,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              className="w-full h-full"
              style={{
                background: shape.color,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

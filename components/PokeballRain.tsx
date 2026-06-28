'use client';

import { useEffect, useState } from 'react';

const BALL_COUNT = 18;

interface Ball {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function PokeballRain() {
  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    setBalls(
      Array.from({ length: BALL_COUNT }, (_, i) => ({
        id: i,
        left: randomBetween(0, 100),
        size: randomBetween(20, 44),
        duration: randomBetween(12, 26),
        delay: randomBetween(-20, 0),
      })),
    );
  }, []);

  return (
    <div className="pokeball-rain" aria-hidden="true">
      {balls.map((ball) => (
        <span
          key={ball.id}
          style={{
            left: `${ball.left}%`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            animationDuration: `${ball.duration}s`,
            animationDelay: `${ball.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
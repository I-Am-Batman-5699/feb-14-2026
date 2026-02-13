import React, { useState } from "react";

interface Heart {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  icon: string;
}

export const FloatingHearts: React.FC<{ count: number }> = ({ count }) => {
  // Use a lazy initializer function. React runs this once on the very first render.
  const [hearts] = useState<Heart[]>(() => {
    const icons = ["❤️", "💖", "✨", "🌸", "💕", "💘", "🌹"];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 5,
      size: Math.random() * (1.5 - 0.7) + 0.7,
      icon: icons[Math.floor(Math.random() * icons.length)],
    }));
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute bottom-[-10%] animate-float text-pink-500/40"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}rem`,
          }}
        >
          {heart.icon}
        </span>
      ))}
    </div>
  );
};
import React, { useEffect, useRef, useState } from "react";
import { FloatingHearts } from "../ui/FloatingHearts";

interface CelebrationProps {
  you: string;
  partner: string;
  lang: "en" | "de";
  strings: {
    [key: string]: {
      party_title: string;
    };
  };
}

export const Celebration: React.FC<CelebrationProps> = ({ you, partner, lang, strings }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/La-Vie-En-Rose.mp3");

    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const attemptPlay = () => {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log("Waiting for user interaction..."));
    };

    attemptPlay();

    // Handlers for mobile and desktop interaction
    window.addEventListener("click", attemptPlay, { once: true });
    window.addEventListener("touchstart", attemptPlay, { once: true });

    return () => {
      audio.pause();
      window.removeEventListener("click", attemptPlay);
      window.removeEventListener("touchstart", attemptPlay);
    };
  }, []);

  const toggleManualPlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#050510] overflow-hidden text-white">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#4c1d95_0%,#050510_100%)]"></div>

      <FloatingHearts count={40} />

      <div className="relative z-10 flex flex-col items-center text-center p-8 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-[0_0_100px_rgba(139,92,246,0.3)] max-w-lg mx-4">
        <div className="text-6xl mb-6 animate-bounce select-none">👑</div>

        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
          {strings[lang].party_title}
        </h1>

        <p className="text-2xl font-light text-pink-300 mb-8">
          {you} <span className="text-red-500 animate-pulse">❤️</span> {partner}
        </p>

        {/* Music Control / Visualizer */}
        <button
          onClick={toggleManualPlay}
          className="mt-4 relative group transition-transform active:scale-90"
        >
          <div className={`absolute inset-0 bg-pink-500/20 blur-xl rounded-full transition-opacity ${isPlaying ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>

          <div className={`relative w-28 h-28 border-[6px] border-white/10 rounded-full flex items-center justify-center shadow-2xl ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <div className="w-12 h-12 bg-linear-to-tr from-pink-600 to-indigo-600 rounded-full flex items-center justify-center border-2 border-[#050510]">
              {isPlaying ? (
                <div className="flex gap-1 items-end h-4">
                  <div className="w-1 bg-white animate-music-bar-1"></div>
                  <div className="w-1 bg-white animate-music-bar-2"></div>
                  <div className="w-1 bg-white animate-music-bar-3"></div>
                </div>
              ) : (
                <div className="pl-1 w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent"></div>
              )}
            </div>
          </div>
        </button>

        <p className="mt-6 text-[10px] text-pink-400 font-black tracking-[.4em] uppercase">
          {isPlaying ? "Now Playing: La Vie En Rose" : "Click to play music"}
        </p>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }

        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .animate-music-bar-1 { animation: music-bar 0.6s ease-in-out infinite; }
        .animate-music-bar-2 { animation: music-bar 0.9s ease-in-out infinite; }
        .animate-music-bar-3 { animation: music-bar 0.7s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
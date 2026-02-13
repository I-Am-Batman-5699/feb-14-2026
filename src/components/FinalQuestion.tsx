import React, { useRef, useState } from "react";
import { FloatingHearts } from "../ui/FloatingHearts";

interface FinalProps {
  onYes: () => void;
  partner: string;
  lang: "en" | "de";
  strings: {
    [key: string]: {
      final_title: string;
      yes_btn: string;
      no_btn: string;
      quotes: string[];
    };
  };
}

export const FinalQuestion: React.FC<FinalProps> = ({ onYes, lang, strings }) => {
  const [noStyle, setNoStyle] = useState<React.CSSProperties>({});
  const [message, setMessage] = useState("");
  const yesBtnRef = useRef<HTMLButtonElement>(null);

  // Shortcut for translations
  const t = strings[lang];

  const moveButton = () => {
    const yesRect = yesBtnRef.current?.getBoundingClientRect();

    let x, y;
    do {
      x = Math.random() * (window.innerWidth - 120);
      y = Math.random() * (window.innerHeight - 60);
    } while (
      yesRect &&
      x < yesRect.right + 50 &&
      x + 100 > yesRect.left - 50 &&
      y < yesRect.bottom + 50 &&
      y + 50 > yesRect.top - 50
    );

    setNoStyle({
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      zIndex: 100,
    });

    // Pull random quote from the JSON
    const randomQuote = t.quotes[Math.floor(Math.random() * t.quotes.length)];
    setMessage(randomQuote);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#050510] overflow-hidden p-6">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#2e1065_0%,#050510_100%)]"></div>

      <FloatingHearts count={15} />

      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          {t.final_title}?
        </h1>

        <div className="h-12 mb-8">
          {message && (
            <p className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-yellow-300 font-mono text-sm md:text-base border border-white/20 animate-bounce">
              {message}
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full">
          <button
            ref={yesBtnRef}
            onClick={onYes}
            className="group relative px-16 py-5 bg-linear-to-r from-pink-600 to-rose-500 text-white text-3xl font-black rounded-2xl shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-all hover:scale-110 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">{t.yes_btn}</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>

          <button
            onMouseEnter={moveButton}
            onClick={moveButton}
            style={noStyle}
            className="px-8 py-3 bg-white/5 backdrop-blur-sm text-white/50 text-xl font-bold rounded-xl border border-white/10 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            {t.no_btn}
          </button>
        </div>
      </div>
    </div>
  );
};
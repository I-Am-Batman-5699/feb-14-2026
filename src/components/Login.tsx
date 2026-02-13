import React, { useState } from "react";
import { validNamePairs } from "../model/validNames";
import { FloatingHearts } from "../ui/FloatingHearts";

interface LoginProps {
  onLogin: (you: string, partner: string, guest?: boolean) => void;
  lang: "en" | "de";
  setLang: (lang: "en" | "de") => void;
  strings: {
    [key: string]: {
      login_title: string;
      login_subtitle: string;
      login_btn: string;
      login_guest_btn: string;
    };
  };
}

export const Login: React.FC<LoginProps> = ({ onLogin, lang, setLang, strings }) => {
  const [you, setYou] = useState("");
  const [partner, setPartner] = useState("");
  const [error, setError] = useState("");
  const [improper, setImproper] = useState(false);

  const t = strings[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanYou = you.trim();
    const cleanPartner = partner.trim();

    const valid = validNamePairs.some(
      (pair) =>
        pair.you.toLowerCase() === cleanYou.toLowerCase() &&
        pair.partner.toLowerCase() === cleanPartner.toLowerCase()
    );
    
    if (valid) {
      const officialPair = validNamePairs.find(
        (p) => p.you.toLowerCase() === cleanYou.toLowerCase()
      );
      onLogin(officialPair?.you || cleanYou, officialPair?.partner || cleanPartner, false);
    } else {
      setError(lang === "en" ? "Not in records!" : "Nicht in den Aufzeichnungen!");
      setImproper(true);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#050510] z-9999">
      
      {/* Dynamic Background - Removed underscores for canonical syntax */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#1e1b4b_0%,#050510_100%)]"></div>
      
      <FloatingHearts count={25} />

      <div className="absolute top-6 right-6 z-20 flex gap-2">
        {["en", "de"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l as "en" | "de")}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
              lang === l 
                ? "bg-pink-500 text-white" 
                : "bg-white/10 text-white/40 hover:bg-white/20"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      
      {/* max-w-100 is the canonical for 400px, bg-white/3 for 0.03 opacity */}
      <form
        className="relative z-10 w-11/12 max-w-100 bg-white/3 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] p-10 flex flex-col gap-8 border border-white/10"
        onSubmit={handleSubmit}
      >
        <div className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white">
            {t.login_title.split(' ')[0]} <span className="text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">{t.login_title.split(' ')[1]}</span>
          </h2>
          <p className="text-pink-200/40 text-[10px] uppercase tracking-[0.5em] font-bold">
            {t.login_subtitle}
          </p>
        </div>

        <div className="space-y-4">
          <input
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-lg"
            placeholder={lang === "en" ? "Your Name" : "Dein Name"}
            value={you}
            onChange={(e) => setYou(e.target.value)}
            required
          />
          <input
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-lg"
            placeholder={lang === "en" ? "Your other half's name" : "Der Name deiner besseren Hälfte"}
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            required
          />
        </div>

        {/* Updated bg-gradient-to-r to bg-linear-to-r */}
        <button
          type="submit"
          className="w-full bg-linear-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-pink-900/20 active:scale-95 transition-all text-sm tracking-widest uppercase"
        >
          {t.login_btn}
        </button>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-center animate-in fade-in duration-300">
            <p className="text-red-300 text-xs mb-2 italic">"{error}"</p>
            {improper && (
              <button
                type="button"
                className="text-[10px] font-bold uppercase tracking-widest text-pink-400 hover:text-white underline decoration-pink-500/50 underline-offset-4"
                onClick={() => onLogin(you, partner, true)}
              >
                {t.login_guest_btn}
              </button>
            )}
          </div>
        )}
      </form>

      {/* w-full instead of w-[100%] */}
      <div className="absolute bottom-[-20%] w-full h-[40%] bg-pink-600/10 blur-[150px] rounded-full"></div>
    </div>
  );
};
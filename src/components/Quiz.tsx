import React, { useState, useMemo } from "react";
import questionsData from "../model/questions.json";

interface QuizProps {
  you: string;
  partner: string;
  lang: "en" | "de";
  isGuest: boolean;
  onFinish: () => void;
}

interface QuestionSet {
  question: string;
  options: string[];
  answer: number;
  wittyRemark: string;
  funnyRemark: string;
}

interface LanguageData {
  [key: string]: QuestionSet[];
}

export const Quiz: React.FC<QuizProps> = ({ you, partner, lang, onFinish }) => {
  // Select the correct set of questions
  const quizQuestions = useMemo(() => {
    const langSet =(questionsData as Record<string, LanguageData>)[lang] || questionsData.en;
    const key1 = `${you}-${partner}`;
    const key2 = `${partner}-${you}`;
    
    // Find specific set or fallback to general
    const selectedSet = langSet[key1] || langSet[key2] || langSet["general"];
    return selectedSet;
  }, [you, partner, lang]);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const correctSound = useMemo(() => new Audio("https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3"), []);
  const wrongSound = useMemo(() => new Audio("https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3"), []);

  const handleOption = (idx: number) => {
    if (selected !== null) return;
    
    setSelected(idx);
    const correct = idx === quizQuestions[current].answer;
    setIsCorrect(correct);

    if (correct) {
      correctSound.play().catch(() => {});
      setFeedback(quizQuestions[current].wittyRemark);
      setTimeout(() => {
        setFeedback("");
        setSelected(null);
        setIsCorrect(null);
        if (current < quizQuestions.length - 1) {
          setCurrent((c) => c + 1);
        } else {
          onFinish();
        }
      }, 2000);
    } else {
      wrongSound.play().catch(() => {});
      setFeedback(quizQuestions[current].funnyRemark);
      setTimeout(() => {
        setFeedback("");
        setSelected(null);
        setIsCorrect(null);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050510] text-white p-4 overflow-hidden relative">
      {/* Canonical radial-gradient syntax (no underscores, no spaces after commas) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#1e1b4b_0%,#050510_100%)]"></div>

      {/* Witty Feedback Cloud */}
      {feedback && (
        <div className={`fixed top-10 animate-bounce z-50 px-6 py-4 rounded-full shadow-2xl border-2 transition-all
          ${isCorrect ? 'bg-green-500 border-green-200' : 'bg-red-500 border-red-200'}`}>
          <p className="text-white font-black italic">"{feedback}"</p>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-bold text-pink-300 text-center mb-8 h-24 flex items-center justify-center leading-tight">
          {quizQuestions[current].question}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {quizQuestions[current].options.map((opt: string, idx: number) => (
            <button
              key={idx}
              onClick={() => handleOption(idx)}
              disabled={selected !== null}
              className={`p-4 rounded-xl font-bold transition-all transform active:scale-95 border-2 text-sm
                ${selected === idx 
                  ? (idx === quizQuestions[current].answer ? "bg-green-500 border-green-300" : "bg-red-500 border-red-300 animate-shake") 
                  : "bg-white/5 border-white/10 hover:bg-white/20 hover:border-pink-500"}`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center text-[10px] uppercase tracking-widest text-pink-200/50 font-bold">
          <span>{you || "Guest"} ❤️ {partner || "Valentine"}</span>
          <span>Question {current + 1} / {quizQuestions.length}</span>
        </div>
      </div>
    </div>
  );
};
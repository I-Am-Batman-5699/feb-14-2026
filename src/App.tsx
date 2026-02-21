import { useState } from "react";
import { Login } from "./components/Login";
import { Quiz } from "./components/Quiz";
import { FinalQuestion } from "./components/FinalQuestion";
import { Celebration } from "./components/Celebration";
import strings from "./model/appTexts.json";

function App() {
  const [stage, setStage] = useState<"LOGIN" | "QUIZ" | "FINAL" | "PARTY">("LOGIN");
  const [names, setNames] = useState({ you: "", partner: "" });
  const [isGuest, setIsGuest] = useState(false);
  const [lang, setLang] = useState<"en" | "de">("en");

  const handleLogin = (you: string, partner: string, guest: boolean = false) => {
    setNames({ you, partner });
    setIsGuest(guest);

    if (guest) {
      // setStage("FINAL"); // Bypass Quiz for guests
      setStage("QUIZ");
    } else {
      setStage("QUIZ");  // Proceed to personalized/general quiz
    }
  };

  return (
    <div className="h-full w-full bg-[#050510]">
      {stage === "LOGIN" && (
        <Login
          onLogin={handleLogin}
          lang={lang}
          setLang={setLang}
          strings={strings}
        />
      )}

      {stage === "QUIZ" && (
        <Quiz
          you={names.you}
          partner={names.partner}
          lang={lang}
          isGuest={isGuest}
          onFinish={() => setStage("FINAL")}
        />
      )}

      {stage === "FINAL" && (
        <FinalQuestion
          partner={names.partner}
          lang={lang}
          strings={strings}
          onYes={() => setStage("PARTY")}
        />
      )}

      {stage === "PARTY" && (
        <Celebration
          you={names.you}
          partner={names.partner}
          lang={lang}
          strings={strings}
        />
      )}
    </div>
  );
}

export default App;
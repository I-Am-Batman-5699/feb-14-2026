export interface Question {
  question: string;
  options: string[];
  answer: number;
  wittyRemark: string;
  funnyRemark: string;
}

export const questions: Question[] = [
  {
    question: "If our love was code, what would it be?",
    options: ["A bug that never gets fixed", "A recursive loop of cuddles", "A semi-colon I always forget", "Legacy code from 1995"],
    answer: 1,
    wittyRemark: "System Status: 100% In Love! ❤️",
    funnyRemark: "Error 404: Romance not found. Try again, newbie!"
  },
  {
    question: "Which of these is the ultimate relationship killer?",
    options: ["Leaving the toilet seat up", "Spoiling a Netflix show", "Forgetting the anniversary", "Stealing the last slice of pizza"],
    answer: 3,
    wittyRemark: "Correct! Pizza theft is a federal offense.",
    funnyRemark: "Wrong! Netflix spoilers are bad, but pizza is SACRED."
  },
  {
    question: "Where should our next 'Cosmic' date be?",
    options: ["The Moon", "A Black Hole (no escape)", "Mars (with Elon)", "The nearest 7-Eleven"],
    answer: 0,
    wittyRemark: "Pack your spacesuit! 👩‍🚀👨‍🚀",
    funnyRemark: "A black hole? Is our love that heavy? Try again!"
  },
  {
    question: "Final test: Is your partner the cutest person alive?",
    options: ["Yes", "Obviously Yes", "Actually... (Danger)", "I decline to answer"],
    answer: 1,
    wittyRemark: "Smart choice. You get to live another day! 😂",
    funnyRemark: "Danger detected! Do you want to be single? Pick a better answer!"
  }
];
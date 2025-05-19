import React, { createContext, useReducer, useEffect } from "react";

export type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[]; // hasil shuffle
};

export type QuizState = {
  questions: Question[];
  currentIndex: number;
  answers: string[]; // user answers, index = question index
  status: "idle" | "in-progress" | "paused" | "finished";
  startTime: number | null;
  duration: number; // dalam detik
  questionTimer: number; // waktu yang tersisa per soal (dalam detik)
  perQuestionDuration: number; // default 5 detik
  questionStartTime: number | null; // waktu mulai soal aktif
};

type QuizAction =
  | { type: "START_QUIZ"; payload: { questions: Question[]; duration: number } }
  | { type: "ANSWER_QUESTION"; payload: { answer: string } }
  | { type: "NEXT_QUESTION" }
  | { type: "TIMEOUT_QUESTION" }
  | { type: "FINISH_QUIZ" }
  | { type: "PAUSE_QUIZ"; payload: QuizState }
  | { type: "RESUME_QUIZ"; payload: QuizState }
  | { type: "RESET_QUIZ" }
  | { type: "TICK_QUESTION_TIMER" }
  | { type: "RESET_QUESTION_TIMER" };

const initialState: QuizState = {
  questions: [],
  currentIndex: 0,
  answers: [],
  status: "idle",
  startTime: null,
  duration: 5 * 10,
  questionTimer: 5,
  perQuestionDuration: 5,
  questionStartTime: null,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  console.log("Dispatch action:", action.type, action);
  switch (action.type) {
    case "START_QUIZ":
      return {
        ...state,
        questions: action.payload.questions,
        duration: action.payload.duration,
        currentIndex: 0,
        answers: [],
        startTime: Date.now(),
        status: "in-progress",
        perQuestionDuration: 5,
        questionStartTime: Date.now(),
      };
    case "TICK_QUESTION_TIMER":
      return {
        ...state,
        questionTimer: state.questionTimer > 0 ? state.questionTimer - 1 : 0,
      };
    case "RESET_QUESTION_TIMER":
      return {
        ...state,
        questionTimer: 5,
      };
    case "TIMEOUT_QUESTION":
      return {
        ...state,
        answers: [...state.answers, ""], // kosongkan jawaban
        currentIndex: state.currentIndex + 1,
        questionStartTime: Date.now(),
      };
    case "ANSWER_QUESTION": 
      {
        const newAnswers = [...state.answers];newAnswers[state.currentIndex] = action.payload.answer;
        return { ...state, answers: newAnswers }
    }
    case "NEXT_QUESTION":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
    case "FINISH_QUIZ":
      return { ...state, status: "finished" };
    case "PAUSE_QUIZ":
      return {
        ...action.payload,
        questionStartTime: null,
        questionTimer: action.payload.questionTimer,
        currentIndex: Math.min(action.payload.currentIndex, action.payload.questions.length - 1),
        status: "paused",
      };
    case "RESUME_QUIZ":
      return {
        ...action.payload,
        currentIndex: Math.min(action.payload.currentIndex, action.payload.questions.length - 1),
        questionStartTime: Date.now(),
        status: "in-progress",
      };
    case "RESET_QUIZ":
      return initialState;
    default:
      return state;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const QuizContext = createContext<{
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}>({
  state: initialState,
  dispatch: () => { },
});

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Simpan state di localStorage setiap perubahan
  useEffect(() => {
    if (state.status === "in-progress") {
      localStorage.setItem("quiz-state", JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    console.log('Update state: ', state);
    console.log('Update question: ', state.questions);
  }, [state])

  // Coba load state dari localStorage di awal
  useEffect(() => {
    const stored = localStorage.getItem("quiz-state");
    if (stored) {
      try {
        const parsed: QuizState = JSON.parse(stored);
        // Cek apakah kuis belum habis waktunya
        const now = Date.now();
        const hasValidQuestions = parsed.questions?.length > 0;
        const isNotFinished = parsed.status !== "finished";
        const isInTime = parsed.startTime && (now - parsed.startTime < parsed.duration * 1000);
        if (hasValidQuestions && isNotFinished && isInTime) {
          dispatch({ type: "RESUME_QUIZ", payload: parsed });
        } else {
          localStorage.removeItem("quiz-state");
        }
      } catch (err) {
        console.error("Failed to parse saved quiz", err);
      }
    }
  }, []);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

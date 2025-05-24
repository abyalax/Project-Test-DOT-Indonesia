// types/quiz.ts
export type QuizStatus = 'idle' | 'in-progress' | 'paused' | 'finished';

export type Question = {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    all_answers: string[];
};

export type QuizState = {
    questions: Question[];
    status: QuizStatus;
    currentQuestionIndex: number;
    perQuestionTime: number[];
    answers: (string | null)[];
    startTime: number | null;
    duration: number;
    questionTimer: number;
    perQuestionDuration: number;
    questionStartTime: number | null;
}

export type QuizStore = {
    state: QuizState;

    startQuiz: (questions: Question[]) => void;
    pauseQuiz: (questionTimer: number) => void;
    resumeQuiz: (category: string, difficulty: string) => void;
    resetQuiz: () => void;
    finishQuiz: (category: string, difficulty: string) => void;
    answerQuestion: (answer: string) => void;
    nextQuestion: () => void;
    timeOutQuestion: () => void;
    tickQuestionTimer: () => void;
    resetQuestionTimer: () => void;
    getResults: () => {
        results: {
            question: string;
            correct_answer: string;
            answer: string | null;
            isCorrect: boolean;
        }[];
        total_correct: number;
        total_wrong: number;
        total_timeout: number;
    };

}
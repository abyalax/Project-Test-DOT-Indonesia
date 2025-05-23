export interface QuizResult {
    id: string;
    date: string;
    category: string;
    results: {
        question: string;
        correct_answer: string;
        answer: string | null;
        isCorrect: boolean;
    }[];
    total_correct: number;
    total_wrong: number;
    total_timeout: number;
}


export interface HistoryStore {
    history: QuizResult[];
    setHistory: (result: QuizResult) => void;
    deleteHistory: (id: string) => void;
    getHistory: () => QuizResult[];
    getHistoryById: (id: string) => QuizResult | undefined;
}

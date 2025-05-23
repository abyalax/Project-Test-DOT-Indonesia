import type { HistoryStore, QuizResult } from '@/types/quiz-history';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useQuizHistoryStore = create<HistoryStore>()(
    devtools(
        persist(
            immer((set, get) => ({
                history: [],
                setHistory: (result: QuizResult) => {
                    set((state) => {
                        state.history.push(result);
                    });
                },
                deleteHistory: (id: string) => {
                    localStorage.removeItem('quiz-history');
                    set((state) => {
                        state.history = state.history.filter((h) => h.id !== id);
                    });
                    localStorage.setItem('quiz-history', JSON.stringify(get().history));
                },
                getHistory: () => get().history,
                getHistoryById: (id: string) => get().history.find((h) => h.id === id),
            })),
            { name: 'quiz-history' }
        ),
        { name: 'QuizHistoryStore' }
    )
);

import type { QuestionDifficulties, QuizOptionsState, QuizOptionsStores } from '@/types/quiz-options';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useQuizFilterStore = create<QuizOptionsStores>()(
    devtools(
        persist(
            immer((set) => ({
                state: {
                    amount: 10,
                    category: 9,
                    difficulty: "easy"
                },
                setDefaultState: (option: QuizOptionsState) => {
                    set((s) => {
                        s.state.amount = option.amount;
                        s.state.category = option.category;
                        s.state.difficulty = option.difficulty;
                    })
                },
                setAmount: (amount: number) => {
                    set((s) => {
                        s.state.amount = amount;
                    });
                },
                setDifficulty: (difficulty: QuestionDifficulties) => {
                    set((s) => {
                        s.state.difficulty = difficulty;
                    });
                },
                setCategory: (category: number) => {
                    set((s) => {
                        s.state.category = category;
                    })
                },
            })),
            { name: 'quiz-filter' }
        ),
        { name: 'QuizFilterStore' } 
    )
);
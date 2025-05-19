import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { type Question, type QuizStore } from '@/types/quiz';

export const useQuizStore = create<QuizStore>()(
    devtools(
        persist(
            immer((set, get) => ({
                state: {
                    questions: [],
                    status: 'idle',
                    currentQuestionIndex: 0,
                    perQuestionTime: [0],
                    answers: [],
                    startTime: null,
                    duration: 5 * 10,
                    questionTimer: 5,
                    perQuestionDuration: 5,
                    questionStartTime: null
                },
                startQuiz: (questions: Question[], duration: number) => {
                    set((s) => {
                        s.state.questions = questions;
                        s.state.duration = duration;
                        s.state.status = 'in-progress';
                        s.state.startTime = Date.now();
                        s.state.questionStartTime = Date.now();
                    });
                },
                pauseQuiz: (questionTimer: number) => {
                    set((s) => {
                        s.state.status = 'paused';
                        s.state.questionStartTime = null;
                        s.state.questionTimer = questionTimer;
                        s.state.currentQuestionIndex = s.state.currentQuestionIndex + 1;
                    });
                },
                resumeQuiz: () => {
                    set((s) => {
                        s.state.status = 'in-progress';
                        s.state.questionStartTime = Date.now();
                    })
                },
                resetQuiz: () => {
                    set((s) => {
                        s.state.status = 'idle';
                        s.state.currentQuestionIndex = 0;
                        s.state.perQuestionTime = [0];
                        s.state.answers = [];
                        s.state.startTime = null;
                        s.state.duration = 5 * 10;
                        s.state.questionTimer = 5;
                        s.state.perQuestionDuration = 5;
                        s.state.questionStartTime = null
                    })
                },
                finishQuiz: () => {
                    set((s) => {
                        s.state.status = 'finished';
                    })
                },
                answerQuestion: (answer: string) => {
                    set((s) => {
                        s.state.answers[s.state.currentQuestionIndex] = answer;
                    });
                },
                nextQuestion: () => {
                    set((s) => {
                        s.state.currentQuestionIndex = s.state.currentQuestionIndex + 1;
                        s.state.questionStartTime = Date.now();
                    });
                },
                timeOutQuestion: () => {
                    set((s) => {
                        s.state.answers = [...s.state.answers, null];
                        s.state.currentQuestionIndex = s.state.currentQuestionIndex + 1;
                        s.state.questionStartTime = Date.now();
                    });
                },
                tickQuestionTimer: () => {
                    set((s) => {
                        s.state.questionTimer = s.state.questionTimer > 0 ? s.state.questionTimer - 1 : 0;
                    })
                },
                resetQuestionTimer: () => {
                    set((s) => {
                        s.state.questionTimer = 5;
                    })
                },
                getQuiz: () => get(),
                getResults: () => {
                    const { questions, answers } = get().state;

                    const results = questions.map((q, i) => {
                        const answer = answers[i] ?? null;
                        const isCorrect = q.correct_answer === answer;
                        return {
                            question: q.question,
                            correct_answer: q.correct_answer,
                            answer,
                            isCorrect
                        };
                    });

                    const totalCorrect = results.filter((r) => r.isCorrect).length;
                    const totalWrong = results.filter((r) => r.answer !== null && !r.isCorrect).length;
                    const totalTimeOut = results.filter((r) => r.answer === '' || r.answer === null).length;

                    return {
                        results,
                        totalCorrect,
                        totalWrong,
                        totalTimeOut
                    };
                },

            })),
            { name: 'quiz-progress' }
        ),
        { name: 'QuizStore' } 
    )
);

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { type Question, type QuizState, type QuizStore } from '@/types/quiz-state';
import { nanoid } from "nanoid"
import { useQuizHistoryStore } from './use-history-quiz';
import { PER_QUESTIONS_DURATION, QUESTION_TIMER } from '@/lib/config';

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
                    duration: 0,
                    questionTimer: QUESTION_TIMER,
                    perQuestionDuration: PER_QUESTIONS_DURATION,
                    questionStartTime: null
                },
                startQuiz: (questions: Question[]) => {
                    localStorage.removeItem('paused-quiz');
                    set((s) => {
                        s.state.questions = questions;
                        s.state.duration = questions.length * PER_QUESTIONS_DURATION;
                        s.state.status = 'in-progress';
                        s.state.startTime = Date.now();
                        s.state.questionStartTime = Date.now();
                        s.state.questionTimer = QUESTION_TIMER
                        s.state.perQuestionDuration = PER_QUESTIONS_DURATION
                    });
                },
                pauseQuiz: (questionTimer: number) => {
                    set((s) => {
                        s.state.status = 'paused';
                        s.state.questionStartTime = null;
                        s.state.questionTimer = questionTimer;
                    });
                    localStorage.setItem('paused-quiz', JSON.stringify(get().state));
                },
                resumeQuiz: (category: string, difficulty: string) => {
                    const stored = localStorage.getItem('paused-quiz');
                    if (!stored) return;
                    const pausedState: QuizState = JSON.parse(stored);
                    const now = Date.now();
                    const elapsed = now - (pausedState.startTime ?? now);
                    if (elapsed >= pausedState.duration * 1000) {
                        localStorage.removeItem('paused-quiz');
                        set((state) => {
                            state.state = {
                                ...pausedState,
                                status: 'finished',
                            };
                        });
                        get().finishQuiz(category, difficulty);
                        return;
                    }
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
                        s.state.questions = [];
                        s.state.answers = [];
                        s.state.startTime = null;
                        s.state.duration = 0;
                        s.state.questionTimer = 0;
                        s.state.perQuestionDuration = 0;
                        s.state.questionStartTime = null
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
                        s.state.questionTimer = QUESTION_TIMER;
                    })
                },
                finishQuiz: (category: string, difficulty: string) => {
                    set((s) => {
                        s.state.status = 'finished';
                        s.state.currentQuestionIndex = 0;
                        s.state.perQuestionTime = [0];
                        s.state.questions = [];
                        s.state.answers = [];
                        s.state.startTime = null;
                        s.state.duration = 0;
                        s.state.questionTimer = 0;
                        s.state.perQuestionDuration = 0;
                        s.state.questionStartTime = null

                        const results = get().getResults();
                        const now = new Date().toISOString();

                        useQuizHistoryStore.getState().setHistory({
                            id: nanoid(),
                            date: now,
                            category: category,
                            difficulty: difficulty,
                            results: results.results,
                            total_correct: results.total_correct,
                            total_wrong: results.total_wrong,
                            total_timeout: results.total_timeout
                        });
                    });
                    localStorage.removeItem('quiz-progress');
                    localStorage.removeItem('quiz-paused');
                },
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

                    const total_correct = results.filter((r) => r.isCorrect).length;
                    const total_wrong = results.filter((r) => r.answer !== null && !r.isCorrect).length;
                    const total_timeout = results.filter((r) => r.answer === '' || r.answer === null).length;

                    return {
                        results,
                        total_correct,
                        total_wrong,
                        total_timeout
                    };
                },
            })),
            { name: 'quiz-progress' }
        ),
        { name: 'QuizStore' }
    )
);

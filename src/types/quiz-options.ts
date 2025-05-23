export type QuestionDifficulties = "easy" | "medium" | "hard"

export interface QuizOptionsState {
  amount?: number;
  category?: number;
  difficulty?: QuestionDifficulties;
}

export interface QuizOptionsStores {
  state: QuizOptionsState
  setCategory: (category: number) => void
  setDifficulty: (difficulty: QuestionDifficulties) => void
  setAmount: (amount: number) => void
  setDefaultState: (option: QuizOptionsState) => void
}
import { DEFAULT_QUESTIONS } from "@/lib/config"
import type { QuizOptionsState } from "@/types/quiz-options"

export async function getRandomQuiz(amount: number = 10) {
    const url = `https://opentdb.com/api.php?amount=${amount}`
    return fetch(url)
        .then(res => res.json())
        .then(data => data.results)
}

export async function getQuizByCategory(category: number, amount: number = DEFAULT_QUESTIONS) {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}`
    return fetch(url)
        .then(res => res.json())
        .then(data => data.results)
}

export async function getQuiz(options: QuizOptionsState = { amount: 10, category: 9, difficulty: "easy" }) {
    const url = `https://opentdb.com/api.php?amount=${options.amount}&category=${options.category}&difficulty=${options.difficulty}`
    return fetch(url)
        .then(res => res.json())
        .then(data => data.results)
}
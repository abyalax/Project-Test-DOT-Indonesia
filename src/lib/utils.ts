import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type Question } from "@/context/quiz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// src/lib/quizUtils.ts


type APIQuestion = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export function transformApiResponse(data: { results: APIQuestion[] }): Question[] {
  if (!data || !Array.isArray(data.results)) return [];

  return data.results.map((q: APIQuestion) => {
    const all_answers = shuffleArray([
      ...q.incorrect_answers,
      q.correct_answer,
    ]);

    return {
      question: decodeHTML(q.question),
      correct_answer: decodeHTML(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(decodeHTML),
      all_answers: all_answers.map(decodeHTML),
    };
  });
}

// karena data ada HTML entity, kita decode
function decodeHTML(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

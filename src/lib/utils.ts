import type { Question } from "@/types/quiz-state";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export function formatDate(dateString: Date | null | string) {
    const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
    const months = [
        "Janurari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
        "Agustus", "September", "Oktober", "November", "Desember"
    ];
    if (dateString == null) return "";
    const date = new Date(dateString);
    const dayName = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
}

export function formatTime(dateString: Date | null | string) {
    if (dateString == null) return "";
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
}
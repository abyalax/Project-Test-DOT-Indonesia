
/**
 * @type {object}
 * @description mock user for login
 */
export const user = {
    email: "trivia@gmail.com",
    password: "trivia",
}

/**
 * @type {number}
 * @description default total questions to be fetched
 * @default 10
 */
export const DEFAULT_QUESTIONS = 10

/**
 * @type {number}
 * @available_value 10 = 10 detik per question
 * @available_value 5 = 5 detik per question
 * @description Number of seconds per question
 */
export const PER_QUESTION_SECONDS = 5;

/**
 * @type {number}
 * @available_value 100 = interval 0.1 detik
 * @available_value 200 = interval 0.2 detik
 * @description Number of milliseconds per question
 */
export const INTERVAL_MS = 200;

/**
 * @type {number}
 * @description Number of ticks per second 
 */
export const PER_QUESTIONS_DURATION = 1000 / INTERVAL_MS;
export const QUESTION_TIMER = PER_QUESTION_SECONDS * PER_QUESTIONS_DURATION

/**
 * @see
 * bagian ini 
 * PER_QUESTION_SECONDS = 10; 
 * dan 
 * INTERVAL_MS = 100;
 * sangat berkaitan, sehingga jika dirubah 
 * tanpa perhitungan rumus yang pas akan mengubah behavior progress
 * menjadi tidak sesuai.
 * 10 dan 100 cocok untuk elemen dengan rumus berikut
 * <Progress value={(questionTimer / perQuestionDuration) * 10} />
 * hasil interval terjadi seperti ini
 * 100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80 sampai 0
 * lebih halus dan rendering tiap 0.1 detik ( lebih berat )
 * 
 * 
 * 2 dan 200 cocok untuk elemen dengan rumus berikut
 * <Progress value={(questionTimer / perQuestionDuration) * 20} />
 * hasilnya terjadi interval berikut
 * 100, 96, 92, 88, 84, 80, 76, 72, 68, 64, 60, 56, 52, 48, 44, 40, 36, 32, 28, 24, 20 sampai 0
 * lebih kasar dan rendering tiap 0.2 detik ( lebih ringan )
 */
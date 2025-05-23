import { useQuizStore } from "@/stores/use-quiz";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/fragments/progress";
import { useCountDownTimer } from "@/hooks/use-countdown";
import { useCallback, useEffect } from "react";
import { Navigate } from "react-router";
import { useQuizHistoryStore } from "@/stores/use-history-quiz";
import { QuizIddle } from "@/views/quiz/idle";
import { useQuizOptionsStore } from "@/stores/use-quiz-options";
import { listsCategory } from "@/mock-data";
import { INTERVAL_MS } from "@/lib/config";

export function QuizPage() {

  const state = useQuizStore((s) => s.state);
  const status = useQuizStore((s) => s.state.status);
  const questions = useQuizStore((s) => s.state.questions);
  const totalQuestions = useQuizStore((s) => s.state.questions.length);
  const currentQuestionIndex = useQuizStore((s) => s.state.currentQuestionIndex);
  const currentQuestion = useQuizStore((s) => s.state.questions[s.state.currentQuestionIndex]);
  const duration = useQuizStore((s) => s.state.duration);
  const questionTimer = useQuizStore((s) => s.state.questionTimer);
  const perQuestionDuration = useQuizStore((s) => s.state.perQuestionDuration);

  const finishQuiz = useQuizStore((s) => s.finishQuiz);
  const pauseQuiz = useQuizStore((s) => s.pauseQuiz);
  const resumeQuiz = useQuizStore((s) => s.resumeQuiz);
  const answerQuestion = useQuizStore((s) => s.answerQuestion);
  const nextQuestion = useQuizStore((s) => s.nextQuestion);
  const tickQuestionTimer = useQuizStore((s) => s.tickQuestionTimer);
  const resetQuestionTimer = useQuizStore((s) => s.resetQuestionTimer);

  const difficulty = useQuizOptionsStore((s) => s.state.difficulty);

  const quizID = useQuizHistoryStore((s) => s.getHistory()[0]?.id)
  const noCategory = useQuizOptionsStore((s) => s.state.category)
  const categoryName = listsCategory.find((c) => c.no === noCategory)?.category ?? "General Knowledge"

  const handleComplete = useCallback(() => {
    finishQuiz(categoryName, difficulty ?? "Easy");
  }, [categoryName, difficulty, finishQuiz]);

  const {
    timeLeft: timeCountdown,
    start: startCountdown,
    pause: pauseCountdown,
    reset: resetCountdown
  } = useCountDownTimer({
    duration,
    autoStart: status === "in-progress",
    onComplete: handleComplete,
  });

  const handleAnswer = (answer: string) => {
    if (status !== "in-progress") return;
    answerQuestion(answer);
    const isLastQuestion = currentQuestionIndex + 1 >= questions.length;
    if (isLastQuestion) {
      finishQuiz(categoryName, difficulty ?? "Easy");
    } else {
      nextQuestion();
      resetQuestionTimer();
    }
  };

  useEffect(() => {
    console.log({ questionTimer }, { perQuestionDuration });
    console.log(((questionTimer / perQuestionDuration) * 20));
    console.log({ timeCountdown });
    console.log({ status });

    return () => { };
  }, [perQuestionDuration, questionTimer, status, timeCountdown]);

  useEffect(() => {
    if (status === "in-progress") {
      startCountdown();
    } else if (status === "idle") {
      resetCountdown();
    }
  }, [pauseCountdown, resetCountdown, startCountdown, status]);

  useEffect(() => {
    if (status !== "in-progress") return;
    const interval = setInterval(() => {
      tickQuestionTimer()
    }, INTERVAL_MS);
    if (questionTimer === 0) {
      clearInterval(interval);
      if (currentQuestionIndex < questions.length - 1) {
        nextQuestion()
        resetQuestionTimer()
      } else { finishQuiz(categoryName, difficulty ?? "Easy") }
    }
    return () => clearInterval(interval);
  }, [status, questionTimer, currentQuestionIndex, questions.length, tickQuestionTimer, nextQuestion, resetQuestionTimer, finishQuiz, categoryName, difficulty]);

  if (status === 'in-progress' || status === 'paused') {
    return (
      <main className="w-full h-screen flex flex-col gap-4 py-10">

        <div className="w-full flex justify-evenly items-center">
          <Card>
            <CardContent>
              <p className="text-center w-full text-2xl font-semibold">
                Question {currentQuestionIndex + 1} out of {totalQuestions}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <span className="text-xl font-semibold">
                {Math.floor(timeCountdown / 60)
                  .toString()
                  .padStart(2, "0")}
                :
                {(timeCountdown % 60).toString().padStart(2, "0")}
              </span>
            </CardContent>
          </Card>
        </div>

        <Progress value={(questionTimer / perQuestionDuration) * 20} />

        <div className="w-full flex justify-center items-center my-12">
          <Card className="min-w-sm w-md">
            <CardHeader>
              <p className="text-2xl text-justify">{currentQuestion?.question}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {currentQuestion?.all_answers.map((answer: string, i: number) => (
                  <Button className=" text-lg font-normal hover:bg-foreground hover:text-accent cursor-pointer hover:transform hover:scale-105" key={i} variant={"secondary"} size={"lg"} onClick={() => handleAnswer(answer)}>{answer}</Button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p className="w-full text-center">Think fast, score high, have fun!</p>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardContent className="flex justify-center gap-3 items-center">
            {status === 'in-progress' && (
              <Button variant={"default"} onClick={() => pauseQuiz(questionTimer)}>Pause</Button>
            )}
            {status === 'paused' && (
              <Button variant={"outline"} onClick={() => resumeQuiz(categoryName, difficulty ?? "Easy")}>Resume</Button>
            )}
          </CardContent>
        </Card>
      </main>
    );
  }
  if (state.status === "finished") return quizID ? <Navigate to={`/results/${quizID}`} /> : <QuizIddle />
  if (state.status === "idle") return <QuizIddle />;
};

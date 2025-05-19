import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useContext, useEffect } from "react";
import { useCountdownTimer } from "@/hooks/use-countdown";
import { QuizContext } from "@/context/quiz";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import FinishedQuiz from "./finished";

const StartQuiz = () => {
    const { state, dispatch } = useContext(QuizContext);
    const question = state.questions[state.currentIndex];
    const totalDuration = state.duration;
    const {
        timeLeft: timeCountdown,
        start: startCountdown,
        pause: pauseCountdown,
        reset: resetCountdown
    } = useCountdownTimer({
        duration: totalDuration,
        autoStart: state.status === "in-progress",
        onComplete: () => dispatch({ type: "FINISH_QUIZ" }),
    });

    const handleAnswer = (answer: string) => {
        if (state.status !== "in-progress") return;
        dispatch({ type: "ANSWER_QUESTION", payload: { answer } });
        const isLastQuestion = state.currentIndex + 1 >= state.questions.length;
        if (isLastQuestion) {
            dispatch({ type: "FINISH_QUIZ" });
        } else {
            dispatch({ type: "NEXT_QUESTION" });
            dispatch({ type: "RESET_QUESTION_TIMER" });
        }
    };

    useEffect(() => {
        if (state.status === "paused") {
            pauseCountdown();
        } else if (state.status === "in-progress") {
            startCountdown();
        } else if (state.status === "idle") {
            resetCountdown();
        }
    }, [pauseCountdown, resetCountdown, startCountdown, state.status]);

    useEffect(() => {
        if (state.status !== "in-progress") return;
        const interval = setInterval(() => {
            dispatch({ type: "TICK_QUESTION_TIMER" });
        }, 1000);
        if (state.questionTimer === 0) {
            clearInterval(interval);
            if (state.currentIndex < state.questions.length - 1) {
                dispatch({ type: "NEXT_QUESTION" });
                dispatch({ type: "RESET_QUESTION_TIMER" });
            } else {
                dispatch({ type: "FINISH_QUIZ" });
            }
        }
        return () => clearInterval(interval);
    }, [state.status, state.questionTimer, state.currentIndex, state.questions.length, dispatch]);

    if (state.status === "idle") return <p>Belum mulai</p>;
    if (state.status === "finished") return <FinishedQuiz state={state} />;
    if (!question) {
        return <p>Loading...</p>;
    } else {
        return (
            <main className="w-full h-screen flex flex-col gap-4 py-10">

                <div className="w-full flex justify-evenly items-center">
                    <Card>
                        <CardContent>
                            <p className="text-center w-full text-2xl font-semibold">
                                Question {state.currentIndex + 1} out of {state.questions.length}
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

                <Progress value={state.questionTimer / state.perQuestionDuration * 100} />

                <div className="w-full flex justify-center items-center my-12">
                    <Card className="min-w-sm w-md">
                        <CardHeader>
                            <p className="text-2xl text-justify">{question.question}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                {question.all_answers.map((answer: string, i: number) => (
                                    <Button className=" text-lg font-normal hover:bg-foreground hover:text-accent cursor-pointer hover:transform hover:scale-105" key={i} variant={"secondary"} size={"lg"} onClick={() => handleAnswer(answer)}>{answer}</Button>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <p className="w-full text-center">Let's think outside the box</p>
                        </CardFooter>
                    </Card>
                </div>

                <Card>
                    <CardContent className="flex justify-center gap-3 items-center">
                        <Button variant={"default"} onClick={() => dispatch({ type: "PAUSE_QUIZ", payload: state })}>
                            Pause
                        </Button>
                        <Button variant={"outline"} onClick={() => dispatch({ type: "RESUME_QUIZ", payload: state })}>
                            Resume
                        </Button>
                        <Button variant={"destructive"} onClick={() => dispatch({ type: "RESET_QUIZ" })}>
                            Reset
                        </Button>
                    </CardContent>
                </Card>

            </main>
        );
    }

};

export default StartQuiz;

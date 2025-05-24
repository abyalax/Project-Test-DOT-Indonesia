import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { H1 } from "@/components/ui/typography";
import { useQuizStore } from "@/stores/use-quiz";
import { formatDate, transformApiResponse } from "@/lib/utils";
import { getRandomQuiz } from "@/services/quiz";
import type { Question } from "@/types/quiz-state";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function QuizIddle() {
    const [time, setTime] = useState<string>("");
    const date = new Date()
    const navigate = useNavigate()
    const startQuiz = useQuizStore((s) => s.startQuiz)

    function refreshTime() {
        const date = new Date();
        const formattedTime = date.toLocaleTimeString("id-ID", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        setTime(formattedTime);
    }

    useEffect(() => {
        const interval = setInterval(refreshTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleStartQuizRandom = async () => {
        const data = await getRandomQuiz()
        const questions: Question[] = transformApiResponse({ results: data });
        startQuiz(questions)
        toast('Quizz is ready to start, choose your category', { duration: 6000 });
        navigate('/quiz')
    };

    return (
        <main className="pr-6 py-6 flex flex-col justify-start w-full">
            <div className="flex justify-between items-center px-12 py-2">
                <div>
                    <H1>{formatDate(date)}</H1>
                </div>
                <div className="border border-slate-600 rounded-md p-4">
                    <H1 className="">{time}</H1>
                </div>
            </div>
            <Separator className="mb-12" />
            <div className="flex flex-col gap-6 justify-center items-center">
                <h1 className="text-5xl font-semibold">Trivia Quiz</h1>
                <Card>
                    <CardHeader>
                        <H1>Ready for Quizz ??</H1>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <Button onClick={handleStartQuizRandom}>Start Random Quiz</Button>
                            <Button >Setting Quiz</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
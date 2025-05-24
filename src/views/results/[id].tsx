import { Card, CardContent } from "@/components/ui/card";
import { Ban, ScrollText, SquareCheckBig, TimerOff } from "lucide-react";
import { H1, H3, P } from "@/components/ui/typography";
import { useNavigate, useParams } from "react-router";
import { useQuizHistoryStore } from "@/stores/use-history-quiz";
import type { QuizResult } from "@/types/quiz-history";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/stores/use-quiz";
import { transformApiResponse } from "@/lib/utils";
import type { Question } from "@/types/quiz-state";
import { getQuiz } from "@/services/quiz";
import { useQuizOptionsStore } from "@/stores/use-quiz-options";
import { toast } from "sonner";
import { TableResult } from "@/components/table/table-results";

export function ResultsPage() {
    const { id } = useParams()
    const options = useQuizOptionsStore((s) => s.state)
    const navigate = useNavigate()
    const result: QuizResult | undefined = useQuizHistoryStore((s) => s.getHistoryById(id as string));
    const startQuiz = useQuizStore((s) => s.startQuiz);

    const handleStartQuiz = async () => {
        const data = await getQuiz(options);
        const questions: Question[] = transformApiResponse({ results: data });
        startQuiz(questions)
        toast('Quizz is ready to start, choose your category', { duration: 3000 });
        navigate('/quiz')
    };

    return (
        <main className="pr-6 py-6 w-full">
            <div className="flex justify-center gap-3 my-12 mx-auto sticky top-4">
                <Card className="w-fit p-1">
                    <CardContent className="p-1">
                        <div className="flex items-start">
                            <div className="flex items-center gap-2">
                                <ScrollText size={45} className="text-blue-600" />
                                <div className="w-full ml-1">
                                    <H3 className="text-nowrap">Total Question</H3>
                                    <H1>{result?.results.length}</H1>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-fit p-1">
                    <CardContent className="p-1">
                        <div className="flex items-start">
                            <div className="flex items-center gap-2">
                                <SquareCheckBig size={45} className="text-green-600" />
                                <div className="w-full ml-1">
                                    <H3 className="text-nowrap">Total Correct Answer</H3>
                                    <H1>{result?.total_correct}</H1>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-fit p-1">
                    <CardContent className="p-1">
                        <div className="flex items-start">
                            <div className="flex items-center gap-2">
                                <Ban size={45} className="text-red-500" />
                                <div className="w-full ml-1">
                                    <H3 className="text-nowrap">Total Wrong Answer</H3>
                                    <H1>{result?.total_wrong}</H1>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-fit p-1">
                    <CardContent className="p-1">
                        <div className="flex items-start">
                            <div className="flex items-center gap-2">
                                <TimerOff size={45} className="text-slate-500" />
                                <div className="w-full ml-1">
                                    <H3 className="text-nowrap">Total Timeout</H3>
                                    <H1>{result?.total_timeout}</H1>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <H1>{result?.category}</H1>
                <P>{result?.difficulty}</P>
            </div>
            <TableResult idQuiz={id} />
            <div className="flex gap-3 my-12 justify-end">
                <Button variant={"secondary"} onClick={() => navigate('/home')}>Back to Home</Button>
                <Button variant={"default"} onClick={handleStartQuiz}>Start Another Quizz</Button>
            </div>
        </main>
    )
}
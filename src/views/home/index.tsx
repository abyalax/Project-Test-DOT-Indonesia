import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { type Question, QuizContext } from "@/context/quiz";
import { transformApiResponse } from "@/lib/utils";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { mockReponse } from "@/mock-data";

export default function HomePage() {
    const { dispatch } = useContext(QuizContext);
    const navigate = useNavigate()

    const startQuiz = async () => {
        // const data = await fetch('https://opentdb.com/api.php?amount=2')
        //     .then((res) => res.json())
        //     .then((data) => data.results);

        const questions: Question[] = transformApiResponse({ results: mockReponse.results });
        console.log('Questions : ', questions);
        dispatch({ type: "START_QUIZ", payload: { questions, duration: 300 } });
        toast('Quizz started, redirect to the quizz', { duration: 3000 });
        navigate('/quiz')
    };

    return (
        <main className="w-full flex justify-center items-center">
            <Card className="text-center mx-auto">
                <CardHeader>
                    <CardTitle className="text-lg">Start Quiz</CardTitle>
                    <CardDescription className="text-lg">Start Quizz for your knowledge</CardDescription>
                </CardHeader>
                <CardContent>
                    <AlertDialog>
                        <AlertDialogTrigger className="px-8 py-4 rounded-lg bg-primary text-3xl font-semibold text-primary-foreground cursor-pointer">Start Quizz</AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    After this, your quizz will be starting
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={startQuiz}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </CardContent>
                <CardFooter>
                    <CardDescription className="text-lg">
                        Let's see how many questions you can answer:
                    </CardDescription>
                </CardFooter>
            </Card>
        </main>
    )
}
import { Card, CardContent } from "@/components/ui/card";
import { Ban, SquareCheckBig, TimerOff } from "lucide-react";
import { H1, H3 } from "@/components/ui/typography";
import { useQuizStore } from "@/hooks/use-quiz";
import { useMemo } from "react";

export default function FinishedQuiz() {

    const questions = useQuizStore((s) => s.state.questions);
    const answers = useQuizStore((s) => s.state.answers);
    const {
        results,
        totalCorrect,
        totalWrong,
        totalTimeOut,
    } = useMemo(() => {
        const results = questions.map((q, i) => {
            const answer = answers[i] ?? null;
            const isCorrect = q.correct_answer === answer;
            return {
                question: q.question,
                correct_answer: q.correct_answer,
                answer,
                isCorrect,
            };
        });

        const totalCorrect = results.filter((r) => r.isCorrect).length;
        const totalWrong = results.length - totalCorrect;
        const totalTimeOut = results.filter((r) => r.answer == null).length;

        return { results, totalCorrect, totalWrong, totalTimeOut };
    }, [questions, answers]);

    return (
        <main className="pr-6 py-6">
            <div className="flex justify-center gap-3 my-12 sticky top-4">
                <Card className="max-w-56 p-1">
                    <CardContent className="p-1">
                        <div className="flex items-start">
                            <div className="flex items-center gap-2">
                                <SquareCheckBig size={40} className="text-green-600" />
                                <div className="w-full ml-1">
                                    <H3>Total Correct Answer</H3>
                                    <H1>{totalCorrect}</H1>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="max-w-56 p-1">
                    <CardContent className="p-1">
                        <div className="flex items-start">
                            <div className="flex items-center gap-2">
                                <Ban size={40} className="text-red-500" />
                                <div className="w-full ml-1">
                                    <H3>Total Wrong Answer</H3>
                                    <H1>{totalWrong}</H1>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="max-w-56 p-1">
                    <CardContent className="p-1">
                        <div className="flex items-start">
                            <div className="flex items-center gap-2">
                                <TimerOff size={40} className="text-slate-500" />
                                <div className="w-full ml-1">
                                    <H3>Total Timeout</H3>
                                    <H1>{totalTimeOut}</H1>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-start">Question</th>
                        <th className="px-4 py-2 text-start">Correct Answer</th>
                        <th className="px-4 py-2 text-start">Your Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((e, i) => (
                        <tr key={i}>
                            <td className="px-4 py-2 text-start">
                                {e.question}
                            </td>
                            <td className="px-4 py-2 text-start">
                                {e.correct_answer}
                            </td>
                            <td className={`px-4 py-2 text-start ${e.correct_answer === e.answer ? 'text-green-600' : 'text-red-600'}`}>
                                {e.answer ? e.answer : (
                                    <span className="text-gray-500">Timeout</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}
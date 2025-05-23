import { Card, CardContent } from "@/components/ui/card"
import { transformApiResponse } from "@/lib/utils";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { listsCategory } from "@/mock-data";
// import { mockReponse } from "@/mock-data";
import type { Question } from "@/types/quiz-state";
import { useQuizStore } from "@/hooks/use-quiz";
import { H2, H3, P, Small } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { SelectDifficulty } from "@/components/fragments/select-difficulty";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SelectCategories } from "@/components/fragments/select-categories";
import { useQuizOptionsStore } from "@/hooks/use-quiz-options";
import { Users } from "lucide-react";
import { getQuiz, getQuizByCategory, getRandomQuiz } from "@/services/quiz";

export function HomePage() {
    const navigate = useNavigate()

    const startQuiz = useQuizStore((s) => s.startQuiz)
    const options = useQuizOptionsStore((s) => s.state)
    const setCategory = useQuizOptionsStore((s) => s.setCategory)

    const sortedCategory = listsCategory.sort((a, b) => b.total - a.total)

    const handleStartQuizRandom = async () => {
        const data = await getRandomQuiz()
        const questions: Question[] = transformApiResponse({ results: data });
        startQuiz(questions)
        toast('Quizz is ready to start, choose your category', { duration: 6000 });
        navigate('/quiz')
    };
    const handleStartQuizWithSettings = async () => {
        const data = await getQuiz(options);
        const questions: Question[] = transformApiResponse({ results: data });
        startQuiz(questions)
        toast('Quizz is ready to start, choose your category', { duration: 6000 });
        navigate('/quiz')
    };
    const handleStartQuizByCategory = async (category: number) => {
        const data = await getQuizByCategory(category);
        const questions: Question[] = transformApiResponse({ results: data });
        const categoryName = listsCategory.find((c) => c.no === category)?.category
        setCategory(category)
        startQuiz(questions)
        toast(`Start Quizz with category ${categoryName}`, { duration: 6000 });
        navigate('/quiz')
    };

    const amount = useQuizOptionsStore((s) => s.state.amount);
    const setAmount = useQuizOptionsStore((s) => s.setAmount);

    return (
        <main className="flex flex-col justify-center">

            <div className="flex justify-between items-center px-12 py-2 my-6">
                <div>
                    <Button onClick={handleStartQuizRandom}>Start</Button>
                    <Small>Start With Random Question</Small>
                </div>
                <Separator orientation="vertical" />
                <div className="flex gap-2.5">
                    <div>
                        <SelectCategories />
                        <Small>Category Questions</Small>
                    </div>
                    <div>
                        <SelectDifficulty />
                        <Small>Level Question</Small>
                    </div>
                    <div>
                        <Input type="number" placeholder="Amount of question" defaultValue={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                        <Small>Total question</Small>
                    </div>
                    <div>
                        <Button onClick={handleStartQuizWithSettings}>Start Quizz</Button>
                        <Small>Start Quiz with this settings</Small>
                    </div>
                </div>
            </div>
            
            <Separator />

            <H2 className="text-center my-6">Top Categories</H2>

            <div className="w-full flex justify-center gap-12 flex-wrap pr-12 ">
                {sortedCategory.map((category, i) => (
                    <Card className="min-w-2xs px-0" key={i}>
                        <CardContent className="w-full flex items-center gap-3 px-2">
                            <category.icon width={52} height={52} />
                            <div className="flex flex-col">
                                <H3>{category.category}</H3>
                                <H2 className="flex items-end">{category.total}
                                    <Users size={14} />
                                </H2>
                                <P>people choice this categories</P>
                                <Button onClick={() => handleStartQuizByCategory(category.no)} variant={"secondary"} >Start</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    )
}
import { FilterCategories } from "@/components/fragments/filter-categories"
import { FilterDifficulty } from "@/components/fragments/filter-difficulty"
import { TableHistories } from "@/components/table/table-history"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Small } from "@/components/ui/typography"
import { useQuizHistoryStore } from "@/stores/use-history-quiz"
import { useQuizFilterStore } from "@/stores/use-quiz-filter"
import { useEffect } from "react"

export function HistoryPage() {
    const history = useQuizHistoryStore((s) => s.history)
    const setDefaultFilter = useQuizFilterStore((s) => s.setDefaultState)

    useEffect(() => {
        setDefaultFilter({ amount: history.length })
        return () => { };
    }, [history.length, setDefaultFilter]);

    return (
        <main className="pr-6 py-6 w-full">
            <div className="flex justify-between items-center px-12 py-2 my-6 mx-auto">
                <div>
                    <Button>Action</Button>
                    <Small>Start With Random Question</Small>
                </div>
                <Separator orientation="vertical" />
                <div className="flex gap-2.5">
                    <div>
                        <FilterCategories />
                        <Small>Category Questions</Small>
                    </div>
                    <div>
                        <FilterDifficulty />
                        <Small>Level Question</Small>
                    </div>
                </div>
            </div>
            <Separator className="mb-12" />
            {history && history.length === 0 ? (
                <>
                    <p className="text-center">No History Founded</p>
                    <Button variant={"outline"} className="w-fit mx-auto my-2">Start Quizz</Button>
                </>
            ) : (
                <TableHistories />
            )}
        </main>
    )
}
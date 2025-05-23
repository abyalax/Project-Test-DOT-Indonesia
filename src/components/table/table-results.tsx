import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuizHistoryStore } from "@/hooks/use-history-quiz";
import type { QuizResult } from "@/types/quiz-history";

export function TableResult({ idQuiz: id }: { idQuiz?: string }) {
    const result: QuizResult | undefined = useQuizHistoryStore((s) => s.getHistoryById(id as string));

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="px-4 py-2 text-start">Question</TableHead>
                    <TableHead className="px-4 py-2 text-start">Correct Answer</TableHead>
                    <TableHead className="px-4 py-2 text-start">Your Answer</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {result?.results.map((r) => (
                    <TableRow key={r.question}>
                        <TableCell className="px-4 py-2 text-start">
                            {r.question}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-start">
                            {r.correct_answer}
                        </TableCell>
                        <TableCell className={`px-4 py-2 text-start ${r.correct_answer === r.answer ? 'text-green-600' : 'text-red-600'}`}>
                            {r.answer ? r.answer : (
                                <span className="text-gray-500">Timeout</span>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
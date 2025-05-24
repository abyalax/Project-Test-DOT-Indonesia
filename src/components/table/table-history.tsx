import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuizHistoryStore } from "@/stores/use-history-quiz"
import { formatDate, formatTime } from "@/lib/utils"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { useEffect, type MouseEvent } from "react"
// import { useQuizFilterStore } from "@/hooks/use-quiz-filter"

export function TableHistories() {

  const state = useQuizHistoryStore((s) => s.history)
  const navigate = useNavigate();

  // const category = useQuizFilterStore((s) => s.state.category)
  // const difficulty = useQuizFilterStore((s) => s.state.difficulty)

  const handleDelete = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    useQuizHistoryStore.getState().deleteHistory(id)
  }

  useEffect(() => {
    
    return () => {
      
    };
  }, []);

  return (
    <Table>
      <TableCaption>A list of your quiz history</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">No</TableHead>
          <TableHead className="text-center">Category</TableHead>
          <TableHead className="text-center">Level</TableHead>
          <TableHead className="text-center">Total Correct</TableHead>
          <TableHead className="text-center">Total Wrong</TableHead>
          <TableHead className="text-center">Total Timeout</TableHead>
          <TableHead>Attempted On</TableHead>
          <TableHead className="text-center">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {state.map((result, i) => (
          <TableRow key={result.id} className="cursor-pointer" onClick={() => navigate(`/results/${result.id}`)}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell className="text-center">{result.category}</TableCell>
            <TableCell className="text-center">{result.difficulty}</TableCell>
            <TableCell className="text-center">{result.total_correct}</TableCell>
            <TableCell className="text-center">{result.total_wrong}</TableCell>
            <TableCell className="text-center">{result.total_timeout}</TableCell>
            <TableCell>{formatTime(result.date)} {formatDate(result.date)}</TableCell>
            <TableCell className="text-center">
              <Button variant={"ghost"} onClick={(e: MouseEvent) => handleDelete(e, result.id)}>
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

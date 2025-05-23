import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuizHistoryStore } from "@/hooks/use-history-quiz"
import { formatDate, formatTime } from "@/lib/utils"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

export function TableHistories() {

  const state = useQuizHistoryStore((s) => s.history)
  const navigate = useNavigate();



  return (
    <Table className="w-fit mx-auto">
      <TableCaption>A list of your quiz history</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">No</TableHead>
          <TableHead className="text-center">Total Correct</TableHead>
          <TableHead className="text-center">Total Wrong</TableHead>
          <TableHead className="text-center">Total Timeout</TableHead>
          <TableHead>Attempted On</TableHead>
          <TableHead className="text-center">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {state.map((e, i) => (
          <TableRow key={e.id} className="cursor-pointer" onClick={() => navigate(`/results/${e.id}`)}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell className="text-center">{e.total_correct}</TableCell>
            <TableCell className="text-center">{e.total_wrong}</TableCell>
            <TableCell className="text-center">{e.total_timeout}</TableCell>
            <TableCell>{formatTime(e.date)} {formatDate(e.date)}</TableCell>
            <TableCell className="text-center">
              <Button variant={"ghost"} onClick={() => useQuizHistoryStore.getState().deleteHistory(e.id)}>
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

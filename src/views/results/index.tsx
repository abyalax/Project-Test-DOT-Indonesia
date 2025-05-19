import { QuizContext } from "@/context/quiz"
import { useContext } from "react"

export default function ResultsPage() {

    const { state } = useContext(QuizContext)

    return (
        <main>
            <h1>Results Page</h1>
            <pre>
                {JSON.stringify(state, null, 2)}
            </pre>
        </main>
    )
}
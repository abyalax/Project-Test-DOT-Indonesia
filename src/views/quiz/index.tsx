import { useContext } from "react";
import { QuizContext } from "@/context/quiz";
import FinishedQuiz from "./finished";
import StartQuiz from "./started";

const QuizPage = () => {
  const { state } = useContext(QuizContext);

  switch (state.status) {
    case "idle":
      return <p> Belum mulai</p >
    case "finished":
      return <FinishedQuiz state={state} />
      case "in-progress":
      case "paused":
      return <StartQuiz />
    default:
      return <p>Loading</p>

  };
};

export default QuizPage;

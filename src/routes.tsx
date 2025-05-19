import { createBrowserRouter } from "react-router"
import AppLayout from "./App"
import QuizPage from "./views/quiz"
import LoginPage from "./views/login"
import { AuthMiddleware } from "./middlewares/auth"
import ResultsPage from "./views/results"
import HistoryPage from "./views/history"
import HomePage from "./views/home"
import LandingPage from "./views"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/",
    element: <AuthMiddleware />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { path: "/home", element: <HomePage /> },
          { path: "/quiz", element: <QuizPage /> },
          { path: "/results", element: <ResultsPage /> },
          { path: "/history", element: <HistoryPage /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
])

export default router

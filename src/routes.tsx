import { createBrowserRouter } from "react-router"
import AppLayout from "./App"
import { QuizPage } from "@/views/quiz"
import LoginPage from "@/views/login"
import { AuthMiddleware } from "@/middlewares/auth"
import { ResultsPage } from "@/views/results/[id]"
import { HistoryPage } from "@/views/history"
import { HomePage } from "@/views/home"
import LandingPage from "@/views/landing-page"
import { SettingsPage } from "@/views/settings"

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
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
          { path: "/results/:id", element: <ResultsPage /> },
          { path: "/history", element: <HistoryPage /> },
          { path: "/settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
])

export default router

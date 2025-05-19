import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import AppSidebar from "./components/fragments/sidebar"
import { StrictMode } from "react"
import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/sonner"
import { QuizProvider } from "./context/quiz"

export default function AppLayout() {
  return (
    <StrictMode>
      <QuizProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <Outlet />
          <Toaster />
        </SidebarProvider>
      </QuizProvider>
    </StrictMode>
  )
}


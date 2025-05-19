import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import AppSidebar from "./components/fragments/sidebar"
import { StrictMode } from "react"
import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/sonner"

export default function AppLayout() {
  return (
    <StrictMode>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <Outlet />
        <Toaster />
      </SidebarProvider>
    </StrictMode>
  )
}


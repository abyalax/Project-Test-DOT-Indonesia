import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import { GraduationCap, Home, ListTodo, NotebookPen, Settings, Timer, LogOutIcon, User2Icon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { useNavigate } from "react-router"
import { useContext } from "react"
import { AuthContext } from "@/context/auth"
import { useQuizHistoryStore } from "@/hooks/use-history-quiz"


export const SIDEBAR_COOKIE_NAME = "sidebar_state"
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = "14rem"
export const SIDEBAR_WIDTH_MOBILE = "14rem"
export const SIDEBAR_WIDTH_ICON = "4rem"
export const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const AppSidebar = () => {

    const navigate = useNavigate()
    const { auth } = useContext(AuthContext)
    const quizID = useQuizHistoryStore((s) => s.getHistory().at(-1)?.id)

    const items = [
        { title: "Home", url: "/home", icon: Home },
        { title: "Kuis", url: "/quiz", icon: NotebookPen },
        { title: "Results", url: `/results/${quizID}`, icon: ListTodo },
        { title: "History", url: "/history", icon: Timer },
        { title: "Setting", url: "/settings", icon: Settings },
    ]

    const handleSignOut = () => {
        localStorage.removeItem("auth")
        navigate("/")
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem key={"Trivia Education"}>
                        <SidebarMenuButton asChild>
                            <a href={"/home"}>
                                <GraduationCap className="transform scale-150" />
                                <span className="text-xl font-semibold mx-2">Trivia Education</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg mb-2">Trivia Kuis</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="my-1 mx-2">
                                    <SidebarMenuButton asChild>
                                        <button onClick={() => navigate(item.url)}>
                                            <item.icon width={40} height={40} className="transform scale-125" />
                                            <span className="text-lg mx-2">{item.title}</span>
                                        </button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenu>
                                    <SidebarMenuItem key={"Trivia Education"}>
                                        <SidebarMenuButton asChild>
                                            <a href={"/home"}>
                                                <Avatar style={{ width: "1.5rem", height: "1.5rem" }}>
                                                    <AvatarImage src="https://github.com/shadcn.png" />
                                                    <AvatarFallback>SM</AvatarFallback>
                                                </Avatar>
                                                <span className="flex flex-col text-start">
                                                    <p className="text-md">{auth.email}</p>
                                                </span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <Button type="button" variant={"ghost"}>
                                        <User2Icon />
                                        Profile
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button type="button" variant={"ghost"} onClick={handleSignOut}>
                                        <LogOutIcon scale={1.2} />
                                        Sign Out
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>

            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar
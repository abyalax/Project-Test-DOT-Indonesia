import { AuthContext } from "@/context/auth"
import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

export const AuthMiddleware = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.isAuthenticated == false) {
            navigate("/login")
            return
        } else {
            console.log("lolos middlewares");
        }
        return () => {};
    }, [auth.isAuthenticated, navigate]);

    return <Outlet />
}
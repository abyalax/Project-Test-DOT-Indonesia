import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { toast } from "sonner";
import { AuthContext } from "@/context/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { user } from "@/lib/config";

const FormSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    })
})

export default function FormLogin() {

    const { setAuth } = useContext(AuthContext)
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log('submitted', data);
        toast("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            )
        })
        if (data.email !== user.email || data.password !== user.password) {
            toast.error("Invalid email or password")
            return
        } else {
            setAuth({ email: data.email, isAuthenticated: true })
            navigate("/home")
        }
    }

    return (
        <Card className="min-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription className="text-xs font-semibold text-nowrap">Enter your email below to login your account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="****" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="w-full text-xs flex justify-center">
                <p className="text-nowrap text-center mr-1">See Dummy Credential at</p>
                <Popover>
                    <PopoverTrigger className="text-xs">Here</PopoverTrigger>
                    <PopoverContent className="w-fit p-3 text-xs">
                                <table>
                                    <tr><td className="pr-6">Email</td><td className="font-semibold">: {user.email}</td></tr>
                                    <tr><td className="pr-6">Password</td><td className="font-semibold">: {user.password}</td></tr>
                                </table>
                    </PopoverContent>
                </Popover>
            </CardFooter>
        </Card>

    )
}
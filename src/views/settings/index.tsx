import { Separator } from "@/components/ui/separator";
import { H1 } from "@/components/ui/typography";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";

export function SettingsPage() {
    const [time, setTime] = useState<string>("");
    const date = new Date()

    function refreshTime() {
        const date = new Date();
        const formattedTime = date.toLocaleTimeString("id-ID", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        setTime(formattedTime);
    }

    useEffect(() => {
        const interval = setInterval(refreshTime, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <main className="pr-6 py-6 flex flex-col justify-start w-full">
            <div className="flex justify-between items-center px-12 py-2">
                <div>
                    <H1>{formatDate(date)}</H1>
                </div>
                <div className="border border-slate-600 rounded-md p-4">
                    <H1 className="">{time}</H1>
                </div>
            </div>
            <Separator className="mb-12" />
            <div className="flex flex-col gap-6 justify-center items-center">
                <h1 className="text-5xl font-semibold">Settings Page</h1>
            </div>
        </main>
    )
}
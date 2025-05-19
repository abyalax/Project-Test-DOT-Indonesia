import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { mockReview } from "@/mock-data";
import { Button } from "@/components/ui/button";
import { H2, H3, H4, P } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Terminal, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

export default function LandingPage() {
    const navigate = useNavigate()

    const startQuiz = async () => {
        // const data = await fetch('https://opentdb.com/api.php?amount=2')
        //     .then((res) => res.json())
        //     .then((data) => data.results);
        toast('Quizz started, redirect to the quizz', { duration: 3000 });
        navigate('/quiz')
    };

    return (
        <main className="p-12">
            <Alert className="max-w-md absolute top-6 left-1/2 -translate-x-1/2">
                <Terminal className="h-4 w-4" />
                <AlertTitle>This is where smart meets fun!</AlertTitle>
                <AlertDescription>
                    Every tap is a step toward victory. Let’s see how far you’ll go!
                </AlertDescription>
            </Alert>
            <div className="w-full min-h-screen flex flex-col justify-center items-center">
                <div className="max-w-4xl flex flex-col gap-3 text-center">
                    <h1 className="text-5xl font-semibold">
                        Trivia Quizz
                    </h1>
                    <H2>
                        Welcome to the ultimate quiz zone! Sharpen your mind, tap your answers, and let the fun begin!
                    </H2>
                    <P>
                        Quick thinking. Fast fingers. Big rewards. Start the quiz and show us what you’ve got!
                    </P>
                </div>
                <div className="max-w-4xl flex gap-3 my-8">
                    <Button onClick={startQuiz} variant={"default"}>
                        Start To Quiz
                    </Button>
                    <Button variant={"outline"}>
                        See Available Quizz
                    </Button>
                </div>

                <Carousel className="my-2 w-full max-w-7xl cursor-grab">
                    <CarouselContent className="-ml-1">
                        {mockReview.map((e, i) => (
                            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3" key={i}>
                                <Card className="max-w-sm text-justify">
                                    <CardContent>
                                        <div className="flex justify-between items-start my-2">
                                            <div className="flex items-center gap-2">
                                                <Avatar>
                                                    <AvatarImage src={e.image} />
                                                    <AvatarFallback>
                                                        <User2 />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <H3>{e.name}</H3>
                                                    <H4>{e.email}</H4>
                                                </div>
                                            </div>
                                            <P>{e.time}</P>
                                        </div>
                                        <P>{e.review.length > 110 ? `${e.review.slice(0, 100)}...` : e.review}</P>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </main>
    )
}
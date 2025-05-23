import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { mockReview } from "@/mock-data";
import { Button } from "@/components/ui/button";
import { Code, Em, H1, H2, H3, H4, Li, P, Strong } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Terminal, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

export default function LandingPage() {
    const navigate = useNavigate()

    const startQuiz = async () => {
        toast('Redirect to the quizz home', { duration: 4000 });
        navigate('/home')
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
            
            <div className="w-full pt-40 flex flex-col justify-center items-center">
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
                    <a href="#how-it-works" className="border border-slate-300 rounded-md px-3 py-1.5">
                        See How Quiz Works
                    </a>
                </div>

                <div className="text-center">
                    <H1>Testimoni Quizz</H1>
                    <P>Don’t just take our word for it — here’s what real players are saying!</P>
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

                <div id="how-it-works">

                    <H1 className="my-2">Cara Kerja Kuis</H1>

                    <H2 className="my-2">1. Pemilihan Kuis</H2>
                    <P className="my-4">Sebelum memulai kuis, kamu dapat menyesuaikan pengaturan berikut:</P>

                    <ul>
                        <Li className="my-4"><Strong className="mt-4 mb-6">Kategori Soal</Strong><br />
                            Pilih kategori favoritmu dari berbagai pilihan yang tersedia.<br />
                            <Em className="my-2">Default: General Knowledge</Em>
                        </Li>
                        <Li className="my-4"><Strong className="mt-4 mb-6">Tingkat Kesulitan</Strong><br />
                            Pilih antara <Em className="my-2">easy</Em>, <Em className="my-2">medium</Em>, atau <Em className="my-2">hard</Em> sesuai dengan keinginan.<br />
                            <Em className="my-2">Default: Easy</Em>
                        </Li>
                        <Li className="my-4"><Strong className="mt-4 mb-6">Jumlah Soal</Strong><br />
                            Tentukan jumlah soal yang ingin kamu kerjakan.<br />
                            <Em className="my-2">Default: 10 soal</Em>
                        </Li>
                    </ul>
                    <hr />
                    <H2 className="my-2">2. Mekanisme Pengerjaan Kuis</H2>

                    <ul>
                        <Li className="my-4"><Strong className="mt-4 mb-6">Satu Soal per Halaman</Strong><br />
                            Kuis akan menampilkan satu soal pada satu waktu. Setelah memilih jawaban, kamu langsung diarahkan ke soal
                            berikutnya secara otomatis.
                        </Li>
                        <Li className="my-4"><Strong className="mt-4 mb-6">Timer Aktif Sepanjang Kuis</Strong><br />
                            Waktu kuis dihitung secara total, yaitu <Code className="my-4">jumlah soal × 5 detik</Code>.<br />
                            Contoh: 10 soal berarti 50 detik total waktu.
                        </Li>
                        <Li className="my-4"><Strong className="mt-4 mb-6">Tidak Bisa Dijeda</Strong><br />
                            Timer tidak bisa di-pause. Namun, jika kamu menutup browser atau tab, kamu masih bisa melanjutkan selama waktu
                            belum habis.
                        </Li>
                    </ul>

                    <hr />

                    <H2 className="my-2">3. Mekanisme Timeout & Resume</H2>

                    <ul>
                        <Li className="my-4"><Strong className="mt-4 mb-6">Melanjutkan Kuis Setelah Menutup Tab</Strong><br />
                            Kuis secara otomatis disimpan ke <Em className="my-2">localStorage</Em>. Selama waktu masih tersisa, kamu bisa melanjutkan kapan
                            saja.
                        </Li>
                        <Li className="my-4"><Strong className="mt-4 mb-6">Kuis Otomatis Berakhir Saat Waktu Habis</Strong><br />
                            Jika waktu habis, kuis akan berhenti dan langsung menampilkan hasil.<br />
                            <Em className="my-2">Jawaban yang belum dijawab akan ditandai sebagai "Timeout".</Em>
                        </Li>
                    </ul>

                    <hr />

                    <H2 className="my-2">4. Hasil & Rekapitulasi Kuis</H2>

                    <ul>
                        <Li className="my-4"><Strong className="mt-4 mb-6">Halaman Hasil Kuis (Results)</Strong><br />
                            Setelah menyelesaikan kuis, kamu akan melihat rekap hasil pengerjaan, termasuk:
                            <ul>
                                <Li className="my-4">Total Soal</Li>
                                <Li className="my-4">Jumlah Jawaban Benar</Li>
                                <Li className="my-4">Jumlah Jawaban Salah</Li>
                                <Li className="my-4">Jumlah Soal yang Timeout</Li>
                                <Li className="my-4">Daftar Soal dan Jawaban Benar</Li>
                            </ul>
                        </Li>
                        <Li className="my-4"><Strong className="mt-4 mb-6">Halaman Riwayat Kuis (History)</Strong><br />
                            Semua kuis yang telah kamu kerjakan tersimpan di halaman History untuk dilihat kembali kapan saja.
                        </Li>
                    </ul>
                    <hr />
                </div>
            </div>
        </main>
    )
}
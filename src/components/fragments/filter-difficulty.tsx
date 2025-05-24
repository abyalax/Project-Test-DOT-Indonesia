import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { useQuizFilterStore } from "@/stores/use-quiz-filter"
import type { QuestionDifficulties } from "@/types/quiz-options"

interface Options {
    value: QuestionDifficulties
    label: string
}

const options: Options[] = [
    { value: "easy", label: "Level Easy" },
    { value: "medium", label: "Level Medium" },
    { value: "hard", label: "Level Hard" },
]

export function FilterDifficulty() {
    const difficulty = useQuizFilterStore((s) => s.state.difficulty);
    const setDifficulty = useQuizFilterStore((s) => s.setDifficulty);

    const [open, setOpen] = useState(false)


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {difficulty
                        ? options.find((e) => e.value === difficulty)?.label
                        : "Select Difficulty..."}
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search difficulty..." />
                    <CommandList>
                        <CommandEmpty>No difficulty found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((e) => (
                                <CommandItem
                                    key={e.value}
                                    value={e.value}
                                    onSelect={(currentValue) => {
                                        setDifficulty(currentValue as QuestionDifficulties)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            difficulty === e.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {e.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

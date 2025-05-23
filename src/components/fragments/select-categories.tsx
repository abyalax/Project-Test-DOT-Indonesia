import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { listsCategory } from "@/mock-data"
import { useQuizOptionsStore } from "@/hooks/use-quiz-options"

export function SelectCategories() {
    const [open, setOpen] = useState(false)

    const category = useQuizOptionsStore((s) => s.state.category);
    const setCategory = useQuizOptionsStore((s) => s.setCategory);

    const categories = listsCategory.map((e) => {
        return {
            value: e.no,
            label: e.category,
            no: e.no
        }
    })

    const selectedCategory = categories.find((e) => e.value === category);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >

                    {category ?
                        selectedCategory ?
                            selectedCategory.label.length > 20 ?
                                selectedCategory.label.slice(0, 20) + "..."
                                : selectedCategory.label
                            : "Select category..."
                        : "Select category..."}

                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((e) => (
                                <CommandItem
                                    key={e.value}
                                    value={e.no.toString()}
                                    onSelect={(currentValue) => {
                                        setCategory(Number(currentValue))
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            e.value === category ? "opacity-100" : "opacity-0"
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

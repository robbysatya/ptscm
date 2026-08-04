import { Monitor, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';

export function ThemeToggle() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-9">
                    {appearance === 'dark' ? (
                        <Moon className="size-4" />
                    ) : appearance === 'light' ? (
                        <Sun className="size-4" />
                    ) : (
                        <Monitor className="size-4" />
                    )}
                    <span className="sr-only">Ganti tema</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem onClick={() => updateAppearance('light')}>
                    <Sun className="mr-2 size-4" />
                    Terang
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateAppearance('dark')}>
                    <Moon className="mr-2 size-4" />
                    Gelap
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateAppearance('system')}>
                    <Monitor className="mr-2 size-4" />
                    Sistem
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

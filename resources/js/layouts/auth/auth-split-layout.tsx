import { Link, usePage } from '@inertiajs/react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAppearance } from '@/hooks/use-appearance';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;
    const { resolvedAppearance } = useAppearance();

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <Link
                    href={home()}
                    className="relative z-20 flex items-center text-lg font-medium"
                >
                    <img
                        src={resolvedAppearance === 'dark' ? '/assets/img/logo-ptscm-light.webp' : '/assets/img/logo-ptscm.webp'}
                        alt={name}
                        className="mr-2 size-8 w-auto"
                    />
                    {name}
                </Link>
                <div className="absolute right-6 bottom-6">
                    <ThemeToggle />
                </div>
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center lg:hidden"
                    >
                        <img
                            src={resolvedAppearance === 'dark' ? '/assets/img/logo-ptscm-light.webp' : '/assets/img/logo-ptscm.webp'}
                            alt={name}
                            className="h-10 w-auto"
                        />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

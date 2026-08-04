import { usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';

export default function AppLogo() {
    const { name } = usePage().props;
    const { resolvedAppearance } = useAppearance();

    return (
        <>
            <div className="flex aspect-square size-10 items-center justify-center rounded-sm text-sidebar-primary-foreground">
                <img
                    src={resolvedAppearance === 'dark' ? '/assets/img/favicon-ptscm-light.webp' : '/assets/img/favicon-ptscm.webp'}
                    alt={name}
                    className="size-7 w-auto"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {name}
                </span>
            </div>
        </>
    );
}

import type { ComponentProps } from 'react';
import { Input } from '@/components/ui/input';
import { formatNumber } from '@/lib/currency';
import { cn } from '@/lib/utils';

type CurrencyInputProps = Omit<
    ComponentProps<'input'>,
    'value' | 'onChange'
> & {
    value: number | null;
    onChange: (value: number | null) => void;
};

export default function CurrencyInput({
    value,
    onChange,
    className,
    ...props
}: CurrencyInputProps) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const digits = event.target.value.replace(/\D/g, '');

        onChange(digits ? Number(digits) : null);
    }

    return (
        <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
                Rp
            </span>
            <Input
                {...props}
                inputMode="numeric"
                value={formatNumber(value)}
                onChange={handleChange}
                className={cn('pl-10', className)}
            />
        </div>
    );
}

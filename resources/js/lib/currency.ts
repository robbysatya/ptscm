const numberFormatter = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
});

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
});

export function formatNumber(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
        return '';
    }

    return numberFormatter.format(value);
}

export function formatRupiah(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
        return '';
    }

    return currencyFormatter.format(value);
}

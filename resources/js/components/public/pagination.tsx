import { Link } from '@inertiajs/react';
import type { Paginated } from '@/types/models';

export function Pagination<T>({ pagination }: { pagination: Paginated<T> }) {
    if (pagination.last_page <= 1) {
        return null;
    }

    return (
        <nav className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {pagination.links.map((link, index) => {
                const label = link.label
                    .replace('&laquo;', '«')
                    .replace('&raquo;', '»');

                if (link.url === null) {
                    return (
                        <span
                            key={index}
                            className="inline-flex size-9 cursor-not-allowed items-center justify-center rounded-sm border border-zinc-200 text-sm text-zinc-300"
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        preserveScroll
                        className={`inline-flex size-9 items-center justify-center rounded-sm border text-sm transition-colors ${
                            link.active
                                ? 'border-brand-700 bg-brand-700 font-semibold text-white'
                                : 'border-zinc-200 text-zinc-700 hover:border-brand-500 hover:text-brand-700'
                        }`}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                );
            })}
        </nav>
    );
}

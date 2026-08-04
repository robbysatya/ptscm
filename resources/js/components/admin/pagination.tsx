import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import type { Paginated } from '@/types/models';

export function AdminPagination<T>({
    pagination,
}: {
    pagination: Paginated<T>;
}) {
    if (pagination.last_page <= 1) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4">
            <p className="text-sm text-muted-foreground">
                Menampilkan {pagination.from ?? 0}-{pagination.to ?? 0} dari{' '}
                {pagination.total} data
            </p>
            <div className="flex items-center gap-1">
                {pagination.links.map((link, index) => {
                    const label = link.label
                        .replace('&laquo;', '«')
                        .replace('&raquo;', '»');

                    if (link.url === null) {
                        return (
                            <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                disabled
                                className="px-2"
                                dangerouslySetInnerHTML={{ __html: label }}
                            />
                        );
                    }

                    return (
                        <Button
                            key={index}
                            asChild
                            variant={link.active ? 'default' : 'ghost'}
                            size="sm"
                            className="px-2"
                        >
                            <Link
                                href={link.url}
                                preserveScroll
                                dangerouslySetInnerHTML={{ __html: label }}
                            />
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}

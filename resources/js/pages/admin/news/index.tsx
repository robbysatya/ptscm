import { Head, Link, router } from '@inertiajs/react';
import { FileText, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AdminPagination } from '@/components/admin/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    create as createArticle,
    destroy as destroyArticle,
    edit as editArticle,
    index as newsIndex,
} from '@/routes/admin/news';
import type { NewsArticle, Paginated } from '@/types/models';

export default function NewsIndex({
    articles,
    filters,
}: {
    articles: Paginated<NewsArticle>;
    filters: { search: string };
}) {
    const [search, setSearch] = useState(filters.search);

    function submitSearch(event: React.FormEvent) {
        event.preventDefault();
        router.get(
            newsIndex(),
            { search: search || undefined },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }

    function remove(article: NewsArticle) {
        if (window.confirm(`Hapus proyek "${article.title}"?`)) {
            router.delete(destroyArticle(article.id));
        }
    }

    return (
        <>
            <Head title="Proyek & Galeri" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Proyek &amp; Galeri
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola proyek, karya, dan dokumentasi kerja sama
                            perusahaan.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={createArticle()}>
                            <Plus />
                            Tambah Proyek
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <CardTitle>Daftar Proyek &amp; Galeri</CardTitle>
                                <CardDescription>
                                    Total {articles.total} proyek dan galeri.
                                </CardDescription>
                            </div>
                            <form onSubmit={submitSearch} className="relative">
                                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Cari proyek..."
                                    className="h-9 w-64 pl-9"
                                />
                            </form>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {articles.data.length === 0 ? (
                            <div className="flex flex-col items-center gap-4 py-16 text-center">
                                <FileText className="size-12 text-muted-foreground/40" />
                                <p className="text-sm text-muted-foreground">
                                    Belum ada proyek atau galeri.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y rounded-lg border">
                                {articles.data.map((article) => (
                                    <div
                                        key={article.id}
                                        className="flex items-center justify-between gap-4 p-3"
                                    >
                                        <div className="flex min-w-0 items-center gap-4">
                                            {article.cover_image ? (
                                                <img
                                                    src={article.cover_image.startsWith('http') ? article.cover_image : `/storage/${article.cover_image}`}
                                                    alt={article.title}
                                                    className="size-14 shrink-0 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                                    <FileText className="size-6" />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="truncate font-medium">
                                                    {article.title}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {article.author?.name ??
                                                        '-'}
                                                    {article.published_at
                                                        ? ` · ${new Date(
                                                              article.published_at,
                                                          ).toLocaleDateString(
                                                              'id-ID',
                                                              {
                                                                  day: 'numeric',
                                                                  month: 'short',
                                                                  year: 'numeric',
                                                              },
                                                          )}`
                                                        : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-3">
                                            {article.status === 'published' ? (
                                                <Badge className="border-transparent bg-emerald-100 text-emerald-700">
                                                    Terbit
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">
                                                    Draf
                                                </Badge>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <Link
                                                        href={editArticle(
                                                            article.id,
                                                        )}
                                                        aria-label={`Edit ${article.title}`}
                                                    >
                                                        <Pencil />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        remove(article)
                                                    }
                                                    aria-label={`Hapus ${article.title}`}
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="pt-4">
                            <AdminPagination pagination={articles} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

NewsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminDashboard() },
        { title: 'Proyek & Galeri', href: newsIndex() },
    ],
};

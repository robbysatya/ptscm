import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Pagination } from '@/components/public/pagination';
import { newsCategoryLabel } from '@/lib/news-categories';
import { show as newsShow } from '@/routes/news';
import type { NewsArticle, Paginated } from '@/types/models';

export default function News({
    articles,
}: {
    articles: Paginated<NewsArticle>;
}) {
    return (
        <>
            <Head title="Proyek & Galeri" />

            <section className="border-b border-zinc-800 bg-zinc-950 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <span className="text-sm font-semibold tracking-wider text-brand-400 uppercase">
                        Proyek
                    </span>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Proyek &amp; Galeri Kerja Sama
                    </h1>
                    <p className="mt-4 max-w-2xl text-zinc-300">
                        Dokumentasi pekerjaan, proyek selesai, dan kolaborasi
                        perusahaan yang telah kami kerjakan bersama mitra dan
                        pelanggan PT Sarana Cahaya Makmur.
                    </p>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {articles.data.length === 0 ? (
                        <div className="flex flex-col items-center gap-4 py-24 text-center">
                            <Newspaper className="size-12 text-zinc-300" />
                            <div>
                                <h2 className="font-semibold text-zinc-900">
                                    Belum ada proyek atau galeri
                                </h2>
                                <p className="mt-1 text-sm text-zinc-500">
                                    Kami sedang menyiapkan dokumentasi proyek dan
                                    kerja sama terbaru.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {articles.data.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={newsShow(article.slug)}
                                        className="group flex flex-col overflow-hidden rounded-sm border border-zinc-200 bg-white transition-colors hover:border-brand-700"
                                    >
                                        <div className="flex aspect-video items-center justify-center border-b border-zinc-200 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300">
                                            {article.cover_image ? (
                                                <img
                                                    src={article.cover_image.startsWith('http') ? article.cover_image : `/storage/${article.cover_image}`}
                                                    alt={article.title}
                                                    className="size-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-4xl font-bold text-zinc-400">
                                                    SCM
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-1 flex-col gap-3 p-6">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="rounded-sm bg-brand-700 px-2 py-0.5 text-xs font-semibold tracking-wide text-white uppercase">
                                                    {newsCategoryLabel(
                                                        article.category,
                                                    )}
                                                </span>
                                                <span className="text-xs font-medium text-zinc-400 tabular-nums">
                                                    {article.published_at
                                                        ? new Date(
                                                              article.published_at,
                                                          ).toLocaleDateString(
                                                              'id-ID',
                                                              {
                                                                  day: 'numeric',
                                                                  month: 'long',
                                                                  year: 'numeric',
                                                              },
                                                          )
                                                        : ''}
                                                </span>
                                            </div>
                                            <h2 className="font-semibold text-zinc-900 group-hover:text-brand-700">
                                                {article.title}
                                            </h2>
                                            {(article.client_name || article.project_location || article.project_year) && (
                                                <div className="mt-1 space-y-1 text-xs text-zinc-500">
                                                    {article.client_name && (
                                                        <p>
                                                            <span className="font-medium text-zinc-600">
                                                                Klien:
                                                            </span>{' '}
                                                            {article.client_name}
                                                        </p>
                                                    )}
                                                    {article.project_location && (
                                                        <p>
                                                            <span className="font-medium text-zinc-600">
                                                                Lokasi:
                                                            </span>{' '}
                                                            {article.project_location}
                                                        </p>
                                                    )}
                                                    {article.project_year && (
                                                        <p>
                                                            <span className="font-medium text-zinc-600">
                                                                Tahun:
                                                            </span>{' '}
                                                            {article.project_year}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                            {article.excerpt && (
                                                <p className="line-clamp-3 text-sm leading-relaxed text-zinc-500">
                                                    {article.excerpt}
                                                </p>
                                            )}
                                            <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-brand-700">
                                                Lihat Detail Proyek
                                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <Pagination pagination={articles} />
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

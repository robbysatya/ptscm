import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, CalendarDays, UserRound } from 'lucide-react';
import { newsCategoryLabel } from '@/lib/news-categories';
import { index as newsIndex, show as newsShow } from '@/routes/news';
import type { NewsArticle } from '@/types/models';

export default function NewsDetail({
    article,
    relatedArticles,
}: {
    article: NewsArticle;
    relatedArticles: NewsArticle[];
}) {
    return (
        <>
            <Head title={article.title} />

            <section className="border-b border-zinc-800 bg-zinc-950 py-14 text-white">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Link
                        href={newsIndex()}
                        className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
                    >
                        <ArrowLeft className="size-4" />
                        Kembali ke Proyek &amp; Galeri
                    </Link>
                    <div className="mt-6 flex items-center gap-3">
                        <span className="rounded-sm bg-brand-700 px-2 py-0.5 text-xs font-semibold tracking-wide text-white uppercase">
                            {newsCategoryLabel(article.category)}
                        </span>
                    </div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                        {article.title}
                    </h1>
                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-400">
                        {article.published_at && (
                            <span className="inline-flex items-center gap-1.5">
                                <CalendarDays className="size-4" />
                                {new Date(
                                    article.published_at,
                                ).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        )}
                        {article.author && (
                            <span className="inline-flex items-center gap-1.5">
                                <UserRound className="size-4" />
                                {article.author.name}
                            </span>
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-white py-14">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {article.cover_image && (
                        <div className="mb-10 overflow-hidden rounded-sm border border-zinc-200">
                            <img
                                src={article.cover_image.startsWith('http') ? article.cover_image : `/storage/${article.cover_image}`}
                                alt={article.title}
                                className="aspect-video w-full object-cover"
                            />
                        </div>
                    )}

                    {article.gallery_images?.length > 0 && (
                        <div className="mb-10">
                            <h2 className="mb-4 text-xl font-bold text-zinc-900">
                                Gallery Proyek
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {article.gallery_images.map((image, index) => (
                                    <img
                                        key={image.id}
                                        src={`/storage/${image.path}`}
                                        alt={`${article.title} - foto ${index + 1}`}
                                        className="aspect-video w-full rounded-sm border border-zinc-200 object-cover"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mx-auto max-w-[65ch]">
                        {(article.client_name || article.project_location || article.project_year) && (
                            <div className="mb-8 grid gap-3 rounded-sm border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-700 sm:grid-cols-3">
                                {article.client_name && (
                                    <div>
                                        <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                                            Klien
                                        </p>
                                        <p className="mt-1 font-medium text-zinc-900">
                                            {article.client_name}
                                        </p>
                                    </div>
                                )}
                                {article.project_location && (
                                    <div>
                                        <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                                            Lokasi
                                        </p>
                                        <p className="mt-1 font-medium text-zinc-900">
                                            {article.project_location}
                                        </p>
                                    </div>
                                )}
                                {article.project_year && (
                                    <div>
                                        <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                                            Tahun
                                        </p>
                                        <p className="mt-1 font-medium text-zinc-900">
                                            {article.project_year}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                        {article.excerpt && (
                            <p className="mb-8 text-lg leading-relaxed font-medium text-zinc-700">
                                {article.excerpt}
                            </p>
                        )}
                        <div
                            className="article-content space-y-5 text-base leading-relaxed text-zinc-600"
                            dangerouslySetInnerHTML={{
                                __html: article.content,
                            }}
                        />
                    </div>
                </div>
            </section>

            {relatedArticles.length > 0 && (
                <section className="border-t border-zinc-200 bg-zinc-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-end justify-between gap-6">
                            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                                Proyek Lainnya
                            </h2>
                            <Link
                                href={newsIndex()}
                                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
                            >
                                Semua Proyek
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            {relatedArticles.map((related) => (
                                <Link
                                    key={related.id}
                                    href={newsShow(related.slug)}
                                    className="group flex flex-col overflow-hidden rounded-sm border border-zinc-200 bg-white transition-colors hover:border-brand-700"
                                >
                                    <div className="flex aspect-video items-center justify-center border-b border-zinc-200 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300">
                                        {related.cover_image ? (
                                            <img
                                                src={related.cover_image.startsWith('http') ? related.cover_image : `/storage/${related.cover_image}`}
                                                alt={related.title}
                                                className="size-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-3xl font-bold text-zinc-400">
                                                SCM
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col gap-2 p-5">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="rounded-sm bg-brand-700 px-2 py-0.5 text-xs font-semibold tracking-wide text-white uppercase">
                                                {newsCategoryLabel(
                                                    related.category,
                                                )}
                                            </span>
                                            <span className="text-xs text-zinc-400 tabular-nums">
                                                {related.published_at
                                                    ? new Date(
                                                          related.published_at,
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
                                        <h3 className="font-semibold text-zinc-900 group-hover:text-brand-700">
                                            {related.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

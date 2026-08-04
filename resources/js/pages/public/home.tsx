import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    BadgeCheck,
    Ruler,
    ShieldCheck,
} from 'lucide-react';
import { ProductCard } from '@/components/public/product-card';
import { newsCategoryLabel } from '@/lib/news-categories';
import { about, contact } from '@/routes';
import { index as newsIndex, show as newsShow } from '@/routes/news';
import { index as productsIndex } from '@/routes/products';
import type { NewsArticle, Product } from '@/types/models';

const certifications = [
    {
        title: 'SNI 8399-2017',
        description: 'Profil baja ringan sesuai Standar Nasional Indonesia.',
    },
    {
        title: 'Sertifikasi TKDN',
        description: 'Tingkat Komponen Dalam Negeri untuk produk unggulan.',
    },
    {
        title: 'Baja G550',
        description: 'Yield strength 550 MPa untuk rangka atap yang kokoh.',
    },
    {
        title: 'Lapisan AZ100',
        description: 'Aluminium Zinc 100 g/m2, tahan korosi lebih lama.',
    },
];

const highlights = [
    {
        icon: BadgeCheck,
        title: 'Profil Standar SNI',
        description:
            'Produk memenuhi Standar Nasional Indonesia SNI 8399-2017.',
    },
    {
        icon: ShieldCheck,
        title: 'Tersertifikasi TKDN',
        description:
            'Produk telah tersertifikasi TKDN (Tingkat Komponen Dalam Negeri).',
    },
    {
        icon: Award,
        title: 'Kualitas Material Konsisten',
        description:
            'Kualitas material tetap terjaga dan konsisten di setiap produksi.',
    },
    {
        icon: Ruler,
        title: 'Ketebalan Produk Terjamin',
        description: 'Ketebalan produk terjamin dan sesuai dengan sertifikasi.',
    },
];

export default function Home({
    featuredProducts,
    latestNews,
}: {
    featuredProducts: Product[];
    latestNews: NewsArticle[];
}) {
    return (
        <>
            <Head title="Beranda" />

            <section className="relative overflow-hidden bg-zinc-950 text-white">
                <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-r from-brand-800/40 via-transparent to-transparent"
                />
                <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <span className="inline-flex items-center gap-2 rounded-sm border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-300">
                        SUNPLUS · Baja Ringan Bersertifikat
                    </span>
                    <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Baja Ringan Berkualitas,{' '}
                        <span className="text-brand-400">Kuat dan Kokoh</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
                        PT Sarana Cahaya Makmur adalah distributor baja ringan
                        yang berpusat di Kota Metro, Lampung. Kami memproduksi
                        rangka baja ringan, genteng metal, dan plafon PVC dengan
                        bahan terbaik dan tersertifikasi SNI &amp; TKDN.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link
                            href={productsIndex()}
                            className="inline-flex items-center gap-2 rounded-sm bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                        >
                            Lihat Katalog Produk
                            <ArrowRight className="size-4" />
                        </Link>
                        <Link
                            href={contact()}
                            className="inline-flex items-center gap-2 rounded-sm border border-zinc-600 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            Minta Penawaran
                        </Link>
                    </div>
                    <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-zinc-800 pt-8">
                        {[
                            { value: '100%', label: 'Bersertifikat SNI' },
                            { value: '10+', label: 'Varian Produk' },
                            { value: '12+', label: 'Tahun Pengalaman' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <dt className="text-2xl font-bold text-white tabular-nums sm:text-3xl">
                                    {stat.value}
                                </dt>
                                <dd className="mt-1 text-sm text-zinc-400">
                                    {stat.label}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <section className="border-b border-zinc-200 bg-zinc-50">
                <div className="mx-auto grid max-w-7xl divide-y divide-zinc-200 px-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                    {certifications.map((cert) => (
                        <div key={cert.title} className="px-6 py-6 lg:py-8">
                            <h3 className="text-sm font-bold tracking-wide text-brand-700 uppercase">
                                {cert.title}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                                {cert.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
                        {highlights.map((highlight) => (
                            <div key={highlight.title} className="bg-white p-6">
                                <highlight.icon className="size-8 text-brand-700" />
                                <h3 className="mt-4 font-semibold text-zinc-900">
                                    {highlight.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                                    {highlight.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="text-sm font-semibold tracking-wider text-brand-700 uppercase">
                                Katalog Produk
                            </span>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
                                Produk Unggulan SUNPLUS
                            </h2>
                        </div>
                        <Link
                            href={productsIndex()}
                            className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-800"
                        >
                            Semua Produk
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-zinc-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <span className="text-sm font-semibold tracking-wider text-brand-700 uppercase">
                                Tentang Kami
                            </span>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
                                PT Sarana Cahaya Makmur
                            </h2>
                            <p className="mt-4 leading-relaxed text-zinc-600">
                                Kami merupakan distributor baja ringan yang
                                berpusat di Kota Metro, Lampung. Kami
                                memproduksi berbagai macam produk baja ringan
                                seperti rangka baja ringan, genteng metal, dan
                                lainnya dengan bahan terbaik dan tersertifikasi.
                                Kami juga memproduksi plafon PVC berkualitas
                                dengan berbagai macam motif pilihan.
                            </p>
                            <Link
                                href={about()}
                                className="mt-6 inline-flex items-center gap-2 rounded-sm bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                            >
                                Pelajari Lebih Lanjut
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                        <div className="grid gap-4 border-t border-zinc-200 pt-6 sm:grid-cols-2 sm:border-t-0 sm:pt-0">
                            {[
                                'Rangka Baja Ringan',
                                'Genteng Metal Pasir',
                                'Genteng Metal',
                                'Plafon PVC',
                            ].map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-4 border border-zinc-200 bg-white p-5"
                                >
                                    <span className="flex size-10 items-center justify-center bg-brand-700 text-sm font-bold text-white tabular-nums">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className="font-semibold text-zinc-900">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="text-sm font-semibold tracking-wider text-brand-700 uppercase">
                                Berita
                            </span>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
                                Berita Terbaru
                            </h2>
                        </div>
                        <Link
                            href={newsIndex()}
                            className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-800"
                        >
                            Semua Berita
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {latestNews.map((article) => (
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
                                <div className="flex flex-1 flex-col gap-2 p-5">
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
                                    <h3 className="mt-1 font-semibold text-zinc-900 group-hover:text-brand-700">
                                        {article.title}
                                    </h3>
                                    {article.excerpt && (
                                        <p className="line-clamp-2 text-sm text-zinc-500">
                                            {article.excerpt}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-brand-700 py-16 text-white">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Konsultasikan kebutuhan bangunan Anda
                        </h2>
                        <p className="mt-2 text-brand-100">
                            Tim sales kami siap membantu memilih produk baja
                            ringan yang tepat untuk proyek Anda dan menghitung
                            kebutuhan material.
                        </p>
                    </div>
                    <Link
                        href={contact()}
                        className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                    >
                        Hubungi Tim Sales
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </section>
        </>
    );
}

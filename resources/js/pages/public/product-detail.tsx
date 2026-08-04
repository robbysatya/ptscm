import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, BadgeCheck } from 'lucide-react';
import { ProductCard } from '@/components/public/product-card';
import { contact } from '@/routes';
import { index as productsIndex } from '@/routes/products';
import type { Product } from '@/types/models';

export default function ProductDetail({
    product,
    relatedProducts,
}: {
    product: Product;
    relatedProducts: Product[];
}) {
    const specifications = Array.isArray(product.specifications)
        ? product.specifications
        : [];

    return (
        <>
            <Head title={product.name} />

            <section className="bg-white py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-zinc-500">
                        <Link
                            href={productsIndex()}
                            className="inline-flex items-center gap-1 rounded-sm text-brand-700 hover:text-brand-800"
                        >
                            <ArrowLeft className="size-4" />
                            Kembali ke Katalog
                        </Link>
                    </nav>

                    <div className="mt-8 grid gap-10 lg:grid-cols-2">
                        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-sm border border-zinc-200 bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200">
                            {product.image ? (
                                <img
                                    src={product.image.startsWith('http') ? product.image : `/storage/${product.image}`}
                                    alt={product.name}
                                    className="size-full object-cover"
                                />
                            ) : (
                                <span className="text-8xl font-bold text-brand-700/30">
                                    {product.name.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>

                        <div>
                            {product.category && (
                                <span className="inline-flex rounded-sm bg-brand-700 px-3 py-1 text-sm font-medium text-white">
                                    {product.category.name}
                                </span>
                            )}
                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                                {product.name}
                            </h1>
                            {product.short_description && (
                                <p className="mt-4 text-lg leading-relaxed text-zinc-600">
                                    {product.short_description}
                                </p>
                            )}

                            {specifications.length > 0 && (
                                <div className="mt-8">
                                    <h2 className="text-lg font-semibold text-zinc-900">
                                        Spesifikasi Teknis
                                    </h2>
                                    <div className="mt-4 overflow-x-auto rounded-sm border border-zinc-200">
                                        <table className="w-full min-w-[320px] text-left text-sm">
                                            <thead className="sticky top-0 z-10 bg-zinc-100">
                                                <tr className="border-b border-zinc-200">
                                                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                                        Spesifikasi
                                                    </th>
                                                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                                        Nilai
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-200 bg-white">
                                                {specifications.map(
                                                    (spec, index) => (
                                                        <tr
                                                            key={index}
                                                            className="odd:bg-white even:bg-zinc-50"
                                                        >
                                                            <th
                                                                scope="row"
                                                                className="px-4 py-3 font-medium text-zinc-500"
                                                            >
                                                                {spec.label}
                                                            </th>
                                                            <td className="px-4 py-3 font-semibold text-zinc-900 tabular-nums">
                                                                {spec.value}
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 rounded-sm border border-brand-200 bg-brand-50 p-5">
                                <p className="flex items-start gap-3 text-sm leading-relaxed text-brand-900">
                                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-brand-700" />
                                    <span>
                                        Produk memenuhi standar SNI 8399-2017
                                        dan tersertifikasi TKDN. Ketersediaan
                                        stok dan harga kompetitif dapat
                                        disesuaikan dengan volume pemesanan.
                                    </span>
                                </p>
                                <Link
                                    href={contact()}
                                    className="mt-4 inline-flex items-center gap-2 rounded-sm bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                                >
                                    Minta Penawaran
                                    <ArrowRight className="size-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {product.description && (
                        <div className="mt-14">
                            <h2 className="text-lg font-semibold text-zinc-900">
                                Deskripsi Produk
                            </h2>
                            <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-zinc-600">
                                {product.description
                                    .split('\n')
                                    .filter(Boolean)
                                    .map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {relatedProducts.length > 0 && (
                <section className="border-t border-zinc-200 bg-zinc-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                            Produk Terkait
                        </h2>
                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((related) => (
                                <ProductCard
                                    key={related.id}
                                    product={related}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { show as productShow } from '@/routes/products';
import type { Product } from '@/types/models';

export function ProductCard({ product }: { product: Product }) {
    const specifications = Array.isArray(product.specifications)
        ? product.specifications.slice(0, 3)
        : [];

    return (
        <Link
            href={productShow(product.slug)}
            className="group flex flex-col overflow-hidden rounded-sm border border-zinc-200 bg-white transition-colors hover:border-brand-700"
        >
            <div className="relative flex aspect-[4/3] items-center justify-center border-b border-zinc-200 bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200">
                {product.image ? (
                    <img
                        src={product.image.startsWith('http') ? product.image : `/storage/${product.image}`}
                        alt={product.name}
                        className="size-full object-cover"
                    />
                ) : (
                    <span className="text-5xl font-bold text-brand-700/30">
                        {product.name.charAt(0).toUpperCase()}
                    </span>
                )}
                {product.category && (
                    <span className="absolute top-3 left-3 rounded-sm bg-zinc-950/90 px-2 py-1 text-xs font-medium text-white">
                        {product.category.name}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                    <h3 className="font-semibold text-zinc-900 group-hover:text-brand-700">
                        {product.name}
                    </h3>
                    {product.short_description && (
                        <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                            {product.short_description}
                        </p>
                    )}
                </div>

                {specifications.length > 0 && (
                    <dl className="divide-y divide-zinc-100 border-t border-zinc-100 pt-2">
                        {specifications.map((spec, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between gap-3 py-1.5"
                            >
                                <dt className="text-xs text-zinc-500">
                                    {spec.label}
                                </dt>
                                <dd className="text-xs font-semibold text-zinc-900 tabular-nums">
                                    {spec.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}

                <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-semibold text-brand-700">
                    Lihat Spesifikasi
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
            </div>
        </Link>
    );
}

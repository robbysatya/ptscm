import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowRight,
    LayoutGrid,
    List,
    PackageSearch,
    Search,
    SlidersHorizontal,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { Pagination } from '@/components/public/pagination';
import { ProductCard } from '@/components/public/product-card';
import { formatRupiah } from '@/lib/currency';
import { index as productsIndex, show as productShow } from '@/routes/products';
import type { Category, Paginated, Product } from '@/types/models';

type Props = {
    categories: Category[];
    products: Paginated<Product>;
    filters: { category: string; search: string };
};

export default function Products({ categories, products, filters }: Props) {
    const [search, setSearch] = useState(filters.search);
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [filterOpen, setFilterOpen] = useState(false);

    const topLevel = categories.filter(
        (category) => category.parent_id === null,
    );
    const subCategories = categories.filter(
        (category) => category.parent_id !== null,
    );

    function applyCategory(slug: string) {
        router.get(
            productsIndex(),
            {
                category: slug || undefined,
                search: filters.search || undefined,
            },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }

    function submitSearch(event: React.FormEvent) {
        event.preventDefault();
        router.get(
            productsIndex(),
            {
                search: search || undefined,
                category: filters.category || undefined,
            },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }

    function clearFilters() {
        setSearch('');
        router.get(
            productsIndex(),
            {},
            { preserveState: true, preserveScroll: true },
        );
    }

    const hasActiveFilters = filters.category !== '' || filters.search !== '';

    const filterPanel = (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-semibold tracking-wider text-zinc-500 uppercase">
                    Kategori
                </h3>
                <ul className="mt-3 space-y-1">
                    <li>
                        <button
                            type="button"
                            onClick={() => applyCategory('')}
                            className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
                                filters.category === ''
                                    ? 'bg-brand-700 text-white'
                                    : 'text-zinc-700 hover:bg-zinc-100'
                            }`}
                        >
                            Semua Produk
                            <span
                                className={`text-xs tabular-nums ${
                                    filters.category === ''
                                        ? 'text-brand-200'
                                        : 'text-zinc-400'
                                }`}
                            >
                                {products.total}
                            </span>
                        </button>
                    </li>
                    {topLevel.map((category) => {
                        const children = subCategories.filter(
                            (child) => child.parent_id === category.id,
                        );

                        return (
                            <li key={category.id}>
                                <button
                                    type="button"
                                    onClick={() => applyCategory(category.slug)}
                                    className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
                                        filters.category === category.slug
                                            ? 'bg-brand-700 text-white'
                                            : 'text-zinc-700 hover:bg-zinc-100'
                                    }`}
                                >
                                    {category.name}
                                    <span
                                        className={`text-xs tabular-nums ${
                                            filters.category === category.slug
                                                ? 'text-brand-200'
                                                : 'text-zinc-400'
                                        }`}
                                    >
                                        {category.products_count ?? 0}
                                    </span>
                                </button>
                                {children.map((child) => (
                                    <button
                                        key={child.id}
                                        type="button"
                                        onClick={() =>
                                            applyCategory(child.slug)
                                        }
                                        className={`flex w-full items-center justify-between rounded-sm py-1.5 pr-3 pl-8 text-sm transition-colors ${
                                            filters.category === child.slug
                                                ? 'font-semibold text-brand-700'
                                                : 'text-zinc-600 hover:bg-zinc-100'
                                        }`}
                                    >
                                        {child.name}
                                        <span className="text-xs text-zinc-400 tabular-nums">
                                            {child.products_count ?? 0}
                                        </span>
                                    </button>
                                ))}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {hasActiveFilters && (
                <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                    <X className="size-4" />
                    Hapus Filter
                </button>
            )}
        </div>
    );

    return (
        <>
            <Head title="Katalog Produk" />

            <section className="border-b border-zinc-800 bg-zinc-950 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <span className="text-sm font-semibold tracking-wider text-brand-400 uppercase">
                        Katalog Produk
                    </span>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Produk Baja Ringan SUNPLUS
                    </h1>
                    <p className="mt-4 max-w-2xl text-zinc-300">
                        Berbagai macam produk baja ringan berkualitas dan
                        bersertifikat untuk kebutuhan konstruksi Anda.
                    </p>
                </div>
            </section>

            <section className="bg-white py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        <aside className="hidden w-64 shrink-0 lg:block">
                            <div className="sticky top-24">
                                <form
                                    onSubmit={submitSearch}
                                    className="relative"
                                >
                                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type="search"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        placeholder="Cari produk..."
                                        className="h-10 w-full rounded-sm border border-zinc-300 bg-white pr-3 pl-9 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-brand-700 focus:ring-2 focus:ring-brand-700/30 focus:outline-none"
                                    />
                                </form>
                                <div className="mt-6">{filterPanel}</div>
                            </div>
                        </aside>

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4">
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFilterOpen((value) => !value)
                                        }
                                        className="inline-flex items-center gap-2 rounded-sm border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:border-brand-700 hover:text-brand-700 lg:hidden"
                                    >
                                        <SlidersHorizontal className="size-4" />
                                        Filter
                                    </button>
                                    <p className="text-sm text-zinc-500">
                                        Menampilkan{' '}
                                        <span className="font-semibold text-zinc-900 tabular-nums">
                                            {products.total}
                                        </span>{' '}
                                        produk
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 rounded-sm border border-zinc-300 p-0.5">
                                    <button
                                        type="button"
                                        onClick={() => setView('grid')}
                                        aria-label="Tampilan grid"
                                        className={`inline-flex size-8 items-center justify-center rounded-sm transition-colors ${
                                            view === 'grid'
                                                ? 'bg-brand-700 text-white'
                                                : 'text-zinc-600 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <LayoutGrid className="size-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setView('list')}
                                        aria-label="Tampilan daftar"
                                        className={`inline-flex size-8 items-center justify-center rounded-sm transition-colors ${
                                            view === 'list'
                                                ? 'bg-brand-700 text-white'
                                                : 'text-zinc-600 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <List className="size-4" />
                                    </button>
                                </div>
                            </div>

                            {filterOpen && (
                                <div className="mt-4 rounded-sm border border-zinc-200 bg-zinc-50 p-4 lg:hidden">
                                    {filterPanel}
                                </div>
                            )}

                            {products.data.length === 0 ? (
                                <div className="flex flex-col items-center gap-4 py-24 text-center">
                                    <PackageSearch className="size-12 text-zinc-300" />
                                    <div>
                                        <h2 className="font-semibold text-zinc-900">
                                            Produk tidak ditemukan
                                        </h2>
                                        <p className="mt-1 text-sm text-zinc-500">
                                            Coba ubah kata kunci pencarian atau
                                            pilih kategori lainnya.
                                        </p>
                                    </div>
                                </div>
                            ) : view === 'grid' ? (
                                <>
                                    <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                        {products.data.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                            />
                                        ))}
                                    </div>
                                    <Pagination pagination={products} />
                                </>
                            ) : (
                                <>
                                    <div className="mt-8 divide-y divide-zinc-200 border border-zinc-200">
                                        {products.data.map((product) => (
                                            <ProductListRow
                                                key={product.id}
                                                product={product}
                                            />
                                        ))}
                                    </div>
                                    <Pagination pagination={products} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function ProductListRow({ product }: { product: Product }) {
    const specifications = Array.isArray(product.specifications)
        ? product.specifications.slice(0, 3)
        : [];

    return (
        <Link
            href={productShow(product.slug)}
            className="group flex flex-col gap-4 p-4 transition-colors hover:bg-zinc-50 sm:flex-row sm:items-center"
        >
            <div className="flex h-24 w-full shrink-0 items-center justify-center border border-zinc-200 bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200 sm:w-32">
                {product.image ? (
                    <img
                        src={
                            product.image.startsWith('http')
                                ? product.image
                                : `/storage/${product.image}`
                        }
                        alt={product.name}
                        className="size-full object-cover"
                    />
                ) : (
                    <span className="text-3xl font-bold text-brand-700/30">
                        {product.name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
            <div className="min-w-0 flex-1">
                {product.category && (
                    <span className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
                        {product.category.name}
                    </span>
                )}
                <h3 className="mt-0.5 font-semibold text-zinc-900 group-hover:text-brand-700">
                    {product.name}
                </h3>
                {product.price !== null && (
                    <p className="mt-1 font-semibold text-brand-700 tabular-nums">
                        {formatRupiah(Number(product.price))}
                    </p>
                )}
                {product.short_description && (
                    <p className="mt-1 line-clamp-1 text-sm text-zinc-500">
                        {product.short_description}
                    </p>
                )}
                {specifications.length > 0 && (
                    <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 border-t border-zinc-100 pt-2">
                        {specifications.map((spec, index) => (
                            <div
                                key={index}
                                className="flex items-baseline gap-1.5"
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
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700">
                Lihat Detail
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
        </Link>
    );
}

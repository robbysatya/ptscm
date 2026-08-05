import { Head, Link, router } from '@inertiajs/react';
import { PackageSearch, Pencil, Plus, Search, Trash2 } from 'lucide-react';
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
import { formatRupiah } from '@/lib/currency';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    create as createProduct,
    destroy as destroyProduct,
    edit as editProduct,
    index as productsIndex,
} from '@/routes/admin/products';
import type { Paginated, Product } from '@/types/models';

export default function ProductsIndex({
    products,
    filters,
}: {
    products: Paginated<Product>;
    filters: { search: string };
}) {
    const [search, setSearch] = useState(filters.search);

    function submitSearch(event: React.FormEvent) {
        event.preventDefault();
        router.get(
            productsIndex(),
            { search: search || undefined },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }

    function remove(product: Product) {
        if (window.confirm(`Hapus produk "${product.name}"?`)) {
            router.delete(destroyProduct(product.id));
        }
    }

    return (
        <>
            <Head title="Produk" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Produk
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola katalog produk baja ringan.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={createProduct()}>
                            <Plus />
                            Tambah Produk
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <CardTitle>Daftar Produk</CardTitle>
                                <CardDescription>
                                    Total {products.total} produk.
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
                                    placeholder="Cari produk..."
                                    className="h-9 w-64 pl-9"
                                />
                            </form>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {products.data.length === 0 ? (
                            <div className="flex flex-col items-center gap-4 py-16 text-center">
                                <PackageSearch className="size-12 text-muted-foreground/40" />
                                <p className="text-sm text-muted-foreground">
                                    Belum ada produk.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y rounded-lg border">
                                {products.data.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between gap-4 p-3"
                                    >
                                        <div className="flex min-w-0 items-center gap-4">
                                            {product.image ? (
                                                <img
                                                    src={
                                                        product.image.startsWith(
                                                            'http',
                                                        )
                                                            ? product.image
                                                            : `/storage/${product.image}`
                                                    }
                                                    alt={product.name}
                                                    className="size-14 shrink-0 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                                                    <PackageSearch className="size-6" />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="truncate font-medium">
                                                    {product.name}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {product.category?.name ??
                                                        'Tanpa kategori'}
                                                </p>
                                                {product.price !== null && (
                                                    <p className="mt-0.5 text-sm font-semibold text-brand-700 tabular-nums">
                                                        {formatRupiah(
                                                            Number(
                                                                product.price,
                                                            ),
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-3">
                                            <div className="hidden gap-2 md:flex">
                                                {product.is_featured && (
                                                    <Badge
                                                        variant="outline"
                                                        className="border-brand-300 text-brand-700"
                                                    >
                                                        Unggulan
                                                    </Badge>
                                                )}
                                                {product.is_active ? (
                                                    <Badge className="border-transparent bg-emerald-100 text-emerald-700">
                                                        Aktif
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">
                                                        Nonaktif
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <Link
                                                        href={editProduct(
                                                            product.id,
                                                        )}
                                                        aria-label={`Edit ${product.name}`}
                                                    >
                                                        <Pencil />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        remove(product)
                                                    }
                                                    aria-label={`Hapus ${product.name}`}
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
                            <AdminPagination pagination={products} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ProductsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminDashboard() },
        { title: 'Produk', href: productsIndex() },
    ],
};

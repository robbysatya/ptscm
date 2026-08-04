import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    create as createCategory,
    destroy as destroyCategory,
    edit as editCategory,
    index as categoriesIndex,
} from '@/routes/admin/categories';
import type { Category } from '@/types/models';

export default function CategoriesIndex({
    categories,
}: {
    categories: Category[];
}) {
    function remove(category: Category) {
        if (
            window.confirm(
                `Hapus kategori "${category.name}"? Produk di dalamnya juga akan dihapus.`,
            )
        ) {
            router.delete(destroyCategory(category.id));
        }
    }

    const parentCategories = categories.filter(
        (category) => category.parent_id === null,
    );

    return (
        <>
            <Head title="Kategori" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Kategori Produk
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola kategori dan sub-kategori produk.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={createCategory()}>
                            <Plus />
                            Tambah Kategori
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Kategori</CardTitle>
                        <CardDescription>
                            Total {categories.length} kategori.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {parentCategories.length === 0 ? (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                Belum ada kategori.
                            </p>
                        ) : (
                            <div className="divide-y">
                                {parentCategories.map((category) => (
                                    <CategoryItem
                                        key={category.id}
                                        category={category}
                                        onDelete={remove}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

function CategoryItem({
    category,
    onDelete,
    nested = false,
}: {
    category: Category;
    onDelete: (category: Category) => void;
    nested?: boolean;
}) {
    const children = category.children ?? [];

    return (
        <div className="py-3">
            <div
                className={`flex items-center justify-between gap-4 rounded-lg px-3 py-2 hover:bg-accent ${
                    nested ? 'ml-8' : ''
                }`}
            >
                <div className="flex min-w-0 items-center gap-3">
                    <Badge variant="secondary">
                        {category.products_count ?? 0} produk
                    </Badge>
                    <div className="min-w-0">
                        <p className="truncate font-medium">{category.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                            /{category.slug}
                        </p>
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                    <Button asChild variant="ghost" size="icon">
                        <Link
                            href={editCategory(category.id)}
                            aria-label={`Edit ${category.name}`}
                        >
                            <Pencil />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(category)}
                        aria-label={`Hapus ${category.name}`}
                    >
                        <Trash2 />
                    </Button>
                </div>
            </div>
            {children.map((child) => (
                <CategoryItem
                    key={child.id}
                    category={child}
                    onDelete={onDelete}
                    nested
                />
            ))}
        </div>
    );
}

CategoriesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminDashboard() },
        { title: 'Kategori', href: categoriesIndex() },
    ],
};

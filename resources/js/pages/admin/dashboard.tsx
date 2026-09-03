import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, Newspaper, Package, Shapes, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as categoriesIndex } from '@/routes/admin/categories';
import { index as newsIndex } from '@/routes/admin/news';
import { index as productsIndex } from '@/routes/admin/products';
import { index as usersIndex } from '@/routes/admin/users';

export default function AdminDashboard({
    stats,
}: {
    stats: {
        products: number;
        categories: number;
        news: number;
        users: number;
    };
}) {
    const cards = [
        {
            label: 'Produk',
            value: stats.products,
            href: productsIndex(),
            icon: Package,
        },
        {
            label: 'Kategori',
            value: stats.categories,
            href: categoriesIndex(),
            icon: Shapes,
        },
        {
            label: 'Proyek & Galeri',
            value: stats.news,
            href: newsIndex(),
            icon: Newspaper,
        },
        {
            label: 'Pengguna',
            value: stats.users,
            href: usersIndex(),
            icon: Users,
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => (
                        <Card key={card.label}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                                        <card.icon className="size-5" />
                                    </span>
                                    <Link
                                        href={card.href}
                                        className="inline-flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground"
                                    >
                                        Kelola
                                        <ArrowUpRight className="size-3.5" />
                                    </Link>
                                </div>
                                <p className="mt-4 text-2xl font-semibold tracking-tight">
                                    {card.value}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {card.label}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardContent className="p-6">
                        <h2 className="font-semibold">Ringkasan</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola konten website PT Sarana Cahaya Makmur dari
                            menu di samping. Halaman ini menampilkan statistik
                            jumlah produk, kategori, proyek &amp; galeri, dan
                            pengguna sistem.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: adminDashboard(),
        },
    ],
};

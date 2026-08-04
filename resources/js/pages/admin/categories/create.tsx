import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    create as categoriesCreate,
    index as categoriesIndex,
    store as storeCategory,
} from '@/routes/admin/categories';
import type { Category } from '@/types/models';

export default function CreateCategory({
    parentCategories,
}: {
    parentCategories: Category[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        parent_id: '',
        sort_order: 0,
        is_active: true,
    });

    function submit(event: React.FormEvent) {
        event.preventDefault();
        post(storeCategory().url);
    }

    return (
        <>
            <Head title="Tambah Kategori" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" size="icon">
                        <Link href={categoriesIndex()} aria-label="Kembali">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Tambah Kategori
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Buat kategori atau sub-kategori produk baru.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="max-w-2xl space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Kategori</CardTitle>
                            <CardDescription>
                                Lengkapi detail kategori produk.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama Kategori</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(event) =>
                                        setData('name', event.target.value)
                                    }
                                    placeholder="Canal"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={(event) =>
                                        setData('slug', event.target.value)
                                    }
                                    placeholder="Kosongkan untuk dibuat otomatis"
                                />
                                <InputError message={errors.slug} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Kategori Induk</Label>
                                <Select
                                    value={
                                        data.parent_id === ''
                                            ? 'none'
                                            : data.parent_id
                                    }
                                    onValueChange={(value) =>
                                        setData(
                                            'parent_id',
                                            value === 'none' ? '' : value,
                                        )
                                    }
                                >
                                    <SelectTrigger id="parent_id">
                                        <SelectValue placeholder="Tanpa kategori induk" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            Tanpa kategori induk
                                        </SelectItem>
                                        {parentCategories
                                            .filter(
                                                (category) =>
                                                    category.parent_id === null,
                                            )
                                            .map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={String(category.id)}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.parent_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(event) =>
                                        setData(
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                    rows={4}
                                    placeholder="Deskripsi singkat kategori"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="sort_order">Urutan</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    min={0}
                                    value={data.sort_order}
                                    onChange={(event) =>
                                        setData(
                                            'sort_order',
                                            Number(event.target.value),
                                        )
                                    }
                                />
                                <InputError message={errors.sort_order} />
                            </div>

                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) =>
                                        setData('is_active', checked === true)
                                    }
                                />
                                <Label
                                    htmlFor="is_active"
                                    className="font-normal"
                                >
                                    Kategori aktif
                                </Label>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            Simpan Kategori
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={categoriesIndex()}>Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

CreateCategory.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminDashboard() },
        { title: 'Kategori', href: categoriesIndex() },
        { title: 'Tambah', href: categoriesCreate() },
    ],
};

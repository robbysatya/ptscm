import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ImagePlus, Plus, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
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
    index as productsIndex,
    store as storeProduct,
} from '@/routes/admin/products';
import type { Category } from '@/types/models';

type Specification = { label: string; value: string };

export default function CreateProduct({
    categories,
}: {
    categories: Category[];
}) {
    const fileInput = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        slug: '',
        short_description: '',
        description: '',
        image: null as File | null,
        specifications: [] as Specification[],
        is_featured: false,
        is_active: true,
        sort_order: 0,
    });

    function submit(event: React.FormEvent) {
        event.preventDefault();
        post(storeProduct().url);
    }

    function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] ?? null;
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(String(reader.result));
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }

    function setSpecification(
        index: number,
        field: 'label' | 'value',
        value: string,
    ) {
        const specifications = data.specifications.map((spec, i) =>
            i === index ? { ...spec, [field]: value } : spec,
        );
        setData('specifications', specifications);
    }

    function addSpecification() {
        setData('specifications', [
            ...data.specifications,
            { label: '', value: '' },
        ]);
    }

    function removeSpecification(index: number) {
        setData(
            'specifications',
            data.specifications.filter((_, i) => i !== index),
        );
    }

    return (
        <>
            <Head title="Tambah Produk" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" size="icon">
                        <Link href={productsIndex()} aria-label="Kembali">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Tambah Produk
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Buat produk baru di katalog.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="max-w-3xl space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Dasar</CardTitle>
                            <CardDescription>
                                Detail utama produk.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Kategori</Label>
                                <Select
                                    value={data.category_id}
                                    onValueChange={(value) =>
                                        setData('category_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories
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
                                        {categories
                                            .filter(
                                                (category) =>
                                                    category.parent_id !== null,
                                            )
                                            .map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={String(category.id)}
                                                >
                                                    {category.parent?.name ??
                                                        ''}{' '}
                                                    › {category.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama Produk</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(event) =>
                                        setData('name', event.target.value)
                                    }
                                    placeholder="Canal C75"
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
                                <Label htmlFor="short_description">
                                    Deskripsi Singkat
                                </Label>
                                <Textarea
                                    id="short_description"
                                    value={data.short_description}
                                    onChange={(event) =>
                                        setData(
                                            'short_description',
                                            event.target.value,
                                        )
                                    }
                                    rows={2}
                                    placeholder="Ringkasan singkat produk"
                                />
                                <InputError
                                    message={errors.short_description}
                                />
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
                                    rows={5}
                                    placeholder="Deskripsi lengkap produk"
                                />
                                <InputError message={errors.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Gambar Produk</CardTitle>
                            <CardDescription>
                                Unggah foto produk (JPG, PNG, atau WebP, maks.
                                2MB).
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <input
                                ref={fileInput}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImage}
                                className="hidden"
                            />
                            <div className="flex items-start gap-4">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Pratinjau"
                                        className="size-32 rounded-lg border object-cover"
                                    />
                                ) : (
                                    <div className="flex size-32 items-center justify-center rounded-lg border border-dashed bg-muted/50 text-muted-foreground">
                                        <ImagePlus className="size-8" />
                                    </div>
                                )}
                                <div className="flex flex-col gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            fileInput.current?.click()
                                        }
                                    >
                                        Pilih Gambar
                                    </Button>
                                    {preview && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setData('image', null);
                                                setPreview(null);

                                                if (fileInput.current) {
                                                    fileInput.current.value =
                                                        '';
                                                }
                                            }}
                                        >
                                            Hapus
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <InputError message={errors.image} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
                            <div>
                                <CardTitle>Spesifikasi</CardTitle>
                                <CardDescription>
                                    Tambahkan spesifikasi teknis produk.
                                </CardDescription>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addSpecification}
                            >
                                <Plus />
                                Tambah
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {data.specifications.length === 0 && (
                                <p className="py-4 text-center text-sm text-muted-foreground">
                                    Belum ada spesifikasi.
                                </p>
                            )}
                            {data.specifications.map((specification, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-2"
                                >
                                    <div className="grid flex-1 gap-1">
                                        <Input
                                            value={specification.label}
                                            onChange={(event) =>
                                                setSpecification(
                                                    index,
                                                    'label',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Label (mis. Panjang)"
                                        />
                                        <InputError
                                            message={
                                                errors[
                                                    `specifications.${index}.label`
                                                ]
                                            }
                                        />
                                    </div>
                                    <div className="grid flex-1 gap-1">
                                        <Input
                                            value={specification.value}
                                            onChange={(event) =>
                                                setSpecification(
                                                    index,
                                                    'value',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Nilai (mis. 6 meter)"
                                        />
                                        <InputError
                                            message={
                                                errors[
                                                    `specifications.${index}.value`
                                                ]
                                            }
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="mt-0.5 shrink-0"
                                        onClick={() =>
                                            removeSpecification(index)
                                        }
                                        aria-label="Hapus spesifikasi"
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pengaturan Tampilan</CardTitle>
                            <CardDescription>
                                Pengaturan katalog dan urutan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                                    id="is_featured"
                                    checked={data.is_featured}
                                    onCheckedChange={(checked) =>
                                        setData('is_featured', checked === true)
                                    }
                                />
                                <Label
                                    htmlFor="is_featured"
                                    className="font-normal"
                                >
                                    Produk unggulan (ditampilkan di beranda)
                                </Label>
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
                                    Produk aktif
                                </Label>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            Simpan Produk
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={productsIndex()}>Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

CreateProduct.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminDashboard() },
        { title: 'Produk', href: productsIndex() },
        { title: 'Tambah', href: productsIndex() },
    ],
};

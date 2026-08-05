import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ImagePlus } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    index as slidesIndex,
    store as storeSlide,
} from '@/routes/admin/slides';

export default function CreateSlide() {
    const fileInput = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        image: null as File | null,
        link: '',
        link_label: '',
        is_active: true,
        sort_order: 0,
    });

    function submit(event: React.FormEvent) {
        event.preventDefault();
        post(storeSlide().url);
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

    return (
        <>
            <Head title="Tambah Slide" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" size="icon">
                        <Link href={slidesIndex()} aria-label="Kembali">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Tambah Slide
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Tambahkan slide baru untuk halaman utama.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="max-w-3xl space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Konten Slide</CardTitle>
                            <CardDescription>
                                Judul dan deskripsi yang ditampilkan pada slide.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Judul</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(event) =>
                                        setData('title', event.target.value)
                                    }
                                    placeholder="Baja Ringan Berkualitas"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="subtitle">Subjudul</Label>
                                <Textarea
                                    id="subtitle"
                                    value={data.subtitle}
                                    onChange={(event) =>
                                        setData('subtitle', event.target.value)
                                    }
                                    rows={3}
                                    placeholder="Deskripsi singkat untuk slide"
                                />
                                <InputError message={errors.subtitle} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="link_label">
                                    Teks Tombol (opsional)
                                </Label>
                                <Input
                                    id="link_label"
                                    value={data.link_label}
                                    onChange={(event) =>
                                        setData(
                                            'link_label',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Lihat Katalog"
                                />
                                <InputError message={errors.link_label} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="link">
                                    Tautan Tombol (opsional)
                                </Label>
                                <Input
                                    id="link"
                                    value={data.link}
                                    onChange={(event) =>
                                        setData('link', event.target.value)
                                    }
                                    placeholder="https://..."
                                />
                                <InputError message={errors.link} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Gambar Slide</CardTitle>
                            <CardDescription>
                                Unggah gambar slide (JPG, PNG, atau WebP, maks.
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
                                        className="h-32 w-56 rounded-lg border object-cover"
                                    />
                                ) : (
                                    <div className="flex h-32 w-56 items-center justify-center rounded-lg border border-dashed bg-muted/50 text-muted-foreground">
                                        <ImagePlus className="size-8" />
                                    </div>
                                )}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => fileInput.current?.click()}
                                >
                                    Pilih Gambar
                                </Button>
                            </div>
                            <InputError message={errors.image} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pengaturan Tampilan</CardTitle>
                            <CardDescription>
                                Urutan dan status slide.
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
                                    Slide aktif (ditampilkan di beranda)
                                </Label>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            Simpan Slide
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={slidesIndex()}>Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

CreateSlide.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminDashboard() },
        { title: 'Slide Beranda', href: slidesIndex() },
        { title: 'Tambah', href: slidesIndex() },
    ],
};

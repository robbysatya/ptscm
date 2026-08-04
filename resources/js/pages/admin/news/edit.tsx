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
    index as newsIndex,
    update as updateArticle,
} from '@/routes/admin/news';
import type { NewsArticle } from '@/types/models';

function toDateTimeLocal(value: string | null): string {
    if (!value) {
        return '';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const pad = (part: number) => String(part).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function EditNews({
    article,
    categories,
}: {
    article: NewsArticle;
    categories: Record<string, string>;
}) {
    const fileInput = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, put, processing, errors } = useForm({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt ?? '',
        content: article.content,
        cover_image: null as File | null,
        category: article.category,
        status: article.status,
        published_at: toDateTimeLocal(article.published_at),
    });

    function submit(event: React.FormEvent) {
        event.preventDefault();
        put(updateArticle(article.id).url);
    }

    function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] ?? null;
        setData('cover_image', file);

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
            <Head title={`Edit Berita ${article.title}`} />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" size="icon">
                        <Link href={newsIndex()} aria-label="Kembali">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Edit Berita
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Perbarui artikel {article.title}.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="max-w-3xl space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Artikel</CardTitle>
                            <CardDescription>
                                Detail utama berita.
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
                                    placeholder="Judul berita"
                                />
                                <InputError message={errors.title} />
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
                                <Label>Kategori</Label>
                                <Select
                                    value={data.category}
                                    onValueChange={(value) =>
                                        setData('category', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(categories).map(
                                            ([value, label]) => (
                                                <SelectItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="excerpt">Ringkasan</Label>
                                <Textarea
                                    id="excerpt"
                                    value={data.excerpt}
                                    onChange={(event) =>
                                        setData('excerpt', event.target.value)
                                    }
                                    rows={3}
                                    placeholder="Ringkasan singkat artikel"
                                />
                                <InputError message={errors.excerpt} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="content">Isi Artikel</Label>
                                <Textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(event) =>
                                        setData('content', event.target.value)
                                    }
                                    rows={14}
                                    placeholder="Konten lengkap artikel. Mendukung HTML sederhana."
                                />
                                <InputError message={errors.content} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Gambar Sampul</CardTitle>
                            <CardDescription>
                                Unggah gambar sampul artikel (JPG, PNG, atau
                                WebP, maks. 2MB).
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
                                {preview || article.cover_image ? (
                                    <img
                                        src={
                                            preview ?? (article.cover_image?.startsWith('http') ? article.cover_image : article.cover_image ? `/storage/${article.cover_image}` : '')
                                        }
                                        alt="Pratinjau"
                                        className="h-32 w-56 rounded-lg border object-cover"
                                    />
                                ) : (
                                    <div className="flex h-32 w-56 items-center justify-center rounded-lg border border-dashed bg-muted/50 text-muted-foreground">
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
                                                setData('cover_image', null);
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
                            <InputError message={errors.cover_image} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Publikasi</CardTitle>
                            <CardDescription>
                                Atur status publikasi artikel.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData(
                                            'status',
                                            value as 'draft' | 'published',
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">
                                            Draf
                                        </SelectItem>
                                        <SelectItem value="published">
                                            Terbit
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="published_at">
                                    Tanggal Terbit (opsional)
                                </Label>
                                <Input
                                    id="published_at"
                                    type="datetime-local"
                                    value={data.published_at}
                                    onChange={(event) =>
                                        setData(
                                            'published_at',
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError message={errors.published_at} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            Simpan Perubahan
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={newsIndex()}>Batal</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

EditNews.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminDashboard() },
        { title: 'Berita', href: newsIndex() },
        { title: 'Edit', href: newsIndex() },
    ],
};

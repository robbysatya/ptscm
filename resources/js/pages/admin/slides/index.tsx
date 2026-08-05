import { Head, Link, router } from '@inertiajs/react';
import { ImagePlus, Pencil, Plus, Trash2 } from 'lucide-react';
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
    create as createSlide,
    destroy as destroySlide,
    edit as editSlide,
    index as slidesIndex,
} from '@/routes/admin/slides';
import type { Slide } from '@/types/models';

export default function SlidesIndex({ slides }: { slides: Slide[] }) {
    function remove(slide: Slide) {
        if (window.confirm(`Hapus slide "${slide.title}"?`)) {
            router.delete(destroySlide(slide.id));
        }
    }

    return (
        <>
            <Head title="Slide Beranda" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Slide Beranda
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola gambar slide di halaman utama.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={createSlide()}>
                            <Plus />
                            Tambah Slide
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Slide</CardTitle>
                        <CardDescription>
                            Slide aktif akan ditampilkan berurutan di halaman
                            utama.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {slides.length === 0 ? (
                            <div className="flex flex-col items-center gap-4 py-16 text-center">
                                <ImagePlus className="size-12 text-muted-foreground/40" />
                                <p className="text-sm text-muted-foreground">
                                    Belum ada slide.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y rounded-lg border">
                                {slides.map((slide) => (
                                    <div
                                        key={slide.id}
                                        className="flex items-center justify-between gap-4 p-3"
                                    >
                                        <div className="flex min-w-0 items-center gap-4">
                                            {slide.image ? (
                                                <img
                                                    src={
                                                        slide.image.startsWith(
                                                            'http',
                                                        )
                                                            ? slide.image
                                                            : `/storage/${slide.image}`
                                                    }
                                                    alt={slide.title}
                                                    className="h-16 w-28 shrink-0 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                                    <ImagePlus className="size-6" />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="truncate font-medium">
                                                    {slide.title}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    Urutan {slide.sort_order}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-3">
                                            {slide.is_active ? (
                                                <Badge className="border-transparent bg-emerald-100 text-emerald-700">
                                                    Aktif
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">
                                                    Nonaktif
                                                </Badge>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <Link
                                                        href={editSlide(
                                                            slide.id,
                                                        )}
                                                        aria-label={`Edit ${slide.title}`}
                                                    >
                                                        <Pencil />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        remove(slide)
                                                    }
                                                    aria-label={`Hapus ${slide.title}`}
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SlidesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminDashboard() },
        { title: 'Slide Beranda', href: slidesIndex() },
    ],
};

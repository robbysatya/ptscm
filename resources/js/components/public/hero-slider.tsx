import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { contact } from '@/routes';
import { index as productsIndex } from '@/routes/products';
import type { Slide } from '@/types/models';

function slideImageUrl(image: string): string {
    return image.startsWith('http') ? image : `/storage/${image}`;
}

export function HeroContent() {
    return (
        <>
            <span className="inline-flex items-center gap-2 rounded-sm border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-300">
                SUNPLUS · Baja Ringan Bersertifikat
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Baja Ringan Berkualitas,{' '}
                <span className="text-brand-400">Kuat dan Kokoh</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
                PT Sarana Cahaya Makmur adalah distributor baja ringan yang
                berpusat di Kota Metro, Lampung. Kami memproduksi rangka baja
                ringan, genteng metal, dan plafon PVC dengan bahan terbaik dan
                tersertifikasi SNI &amp; TKDN.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
                <Link
                    href={productsIndex()}
                    className="inline-flex items-center gap-2 rounded-sm bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                >
                    Lihat Katalog Produk
                    <ArrowRight className="size-4" />
                </Link>
                <Link
                    href={contact()}
                    className="inline-flex items-center gap-2 rounded-sm border border-zinc-600 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                    Minta Penawaran
                </Link>
            </div>
            <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-8 border-t border-zinc-800 pt-8">
                {[
                    { value: '100%', label: 'Bersertifikat SNI' },
                    { value: '10+', label: 'Varian Produk' },
                    { value: '12+', label: 'Tahun Pengalaman' },
                ].map((stat) => (
                    <div key={stat.label}>
                        <dt className="text-2xl font-bold text-white tabular-nums sm:text-3xl">
                            {stat.value}
                        </dt>
                        <dd className="mt-1 text-sm text-zinc-400">
                            {stat.label}
                        </dd>
                    </div>
                ))}
            </dl>
        </>
    );
}

export function HeroSlider({ slides }: { slides: Slide[] }) {
    const [current, setCurrent] = useState(0);

    const goTo = useCallback(
        (index: number) => {
            setCurrent((index + slides.length) % slides.length);
        },
        [slides.length],
    );

    useEffect(() => {
        if (slides.length < 2) {
            return;
        }

        const timer = window.setInterval(() => {
            setCurrent((index) => (index + 1) % slides.length);
        }, 6000);

        return () => window.clearInterval(timer);
    }, [slides.length]);

    if (slides.length === 0) {
        return null;
    }

    return (
        <section className="relative overflow-hidden bg-zinc-950 text-white">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    aria-hidden
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        index === current ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img
                        src={slideImageUrl(slide.image)}
                        alt=""
                        className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
                </div>
            ))}

            <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                <HeroContent />
            </div>

            {slides.length > 1 && (
                <div className="absolute right-0 bottom-8 left-0 flex items-center justify-center gap-2">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            type="button"
                            onClick={() => goTo(index)}
                            aria-label={`Tampilkan slide ${index + 1}`}
                            className={`h-1.5 rounded-sm transition-all ${
                                index === current
                                    ? 'w-8 bg-brand-400'
                                    : 'w-4 bg-white/40 hover:bg-white/70'
                            }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

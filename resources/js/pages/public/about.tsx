import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Eye, Target } from 'lucide-react';
import { contact } from '@/routes';
import { index as productsIndex } from '@/routes/products';

export default function About() {
    return (
        <>
            <Head title="Tentang Kami" />

            <section className="border-b border-zinc-800 bg-zinc-950 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <span className="text-sm font-semibold tracking-wider text-brand-400 uppercase">
                        Company Profile
                    </span>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Tentang Kami
                    </h1>
                    <p className="mt-4 max-w-2xl text-zinc-300">
                        PT Sarana Cahaya Makmur - distributor baja ringan
                        terpercaya dengan merek SUNPLUS.
                    </p>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-start gap-12 lg:grid-cols-2">
                        <div>
                            <span className="text-sm font-semibold tracking-wider text-brand-700 uppercase">
                                Profil Perusahaan
                            </span>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
                                PT Sarana Cahaya Makmur
                            </h2>
                            <div className="mt-6 space-y-4 leading-relaxed text-zinc-600">
                                <p>
                                    Kami merupakan distributor baja ringan yang
                                    berpusat di Kota Metro, Lampung. Kami
                                    memproduksi berbagai macam produk baja
                                    ringan seperti rangka baja ringan, genteng
                                    metal, dan lainnya dengan bahan terbaik dan
                                    tersertifikasi.
                                </p>
                                <p>
                                    Seluruh produk kami diproduksi dengan
                                    standar kualitas yang ketat serta telah
                                    memenuhi Standar Nasional Indonesia (SNI
                                    8399-2017) dan tersertifikasi TKDN (Tingkat
                                    Komponen Dalam Negeri). Kami juga
                                    memproduksi plafon PVC yang berkualitas
                                    dengan berbagai macam motif pilihan.
                                </p>
                                <p>
                                    Dengan pengalaman di bidang material
                                    konstruksi, kami berkomitmen memberikan
                                    produk berkualitas tinggi dengan harga
                                    kompetitif serta pelayanan yang ramah dan
                                    profesional bagi setiap pelanggan.
                                </p>
                            </div>
                            <Link
                                href={productsIndex()}
                                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                            >
                                Lihat Katalog Produk
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>

                        <div className="grid gap-6">
                            <div className="border border-zinc-200 bg-zinc-50 p-8">
                                <div className="flex items-center gap-4">
                                    <span className="flex size-12 items-center justify-center bg-brand-700 text-white">
                                        <Target className="size-6" />
                                    </span>
                                    <h3 className="text-lg font-bold text-zinc-900">
                                        Visi
                                    </h3>
                                </div>
                                <p className="mt-4 leading-relaxed text-zinc-600">
                                    Menjadi distributor material konstruksi
                                    terdepan yang dipercaya masyarakat, dengan
                                    produk berkualitas dan layanan terbaik.
                                </p>
                            </div>

                            <div className="border border-zinc-200 bg-zinc-50 p-8">
                                <div className="flex items-center gap-4">
                                    <span className="flex size-12 items-center justify-center bg-brand-700 text-white">
                                        <Eye className="size-6" />
                                    </span>
                                    <h3 className="text-lg font-bold text-zinc-900">
                                        Misi
                                    </h3>
                                </div>
                                <ul className="mt-4 space-y-3 leading-relaxed text-zinc-600">
                                    {[
                                        'Menyediakan produk baja ringan berkualitas dengan sertifikasi resmi.',
                                        'Menjaga konsistensi kualitas material di setiap produksi.',
                                        'Memberikan pelayanan terbaik dan solusi tepat bagi kebutuhan pelanggan.',
                                        'Terus berinovasi menghadirkan varian produk terbaru.',
                                    ].map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <ArrowRight className="mt-1 size-4 shrink-0 text-brand-700" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-zinc-200 bg-zinc-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                        Sertifikasi &amp; Kualitas
                    </h2>
                    <div className="mt-10 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: 'SNI 8399-2017',
                                description:
                                    'Produk baja ringan kami memenuhi Standar Nasional Indonesia untuk profil baja ringan.',
                            },
                            {
                                title: 'Sertifikasi TKDN',
                                description:
                                    'Produk telah tersertifikasi Tingkat Komponen Dalam Negeri.',
                            },
                            {
                                title: 'Kualitas Terjamin',
                                description:
                                    'Ketebalan dan kualitas material konsisten serta sesuai dengan sertifikasi.',
                            },
                        ].map((item) => (
                            <div key={item.title} className="bg-white p-6">
                                <h3 className="text-sm font-bold tracking-wide text-brand-700 uppercase">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-brand-700 py-16 text-white">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Ingin bekerja sama dengan kami?
                        </h2>
                        <p className="mt-2 text-brand-100">
                            Hubungi tim sales kami untuk penawaran dan
                            konsultasi produk.
                        </p>
                    </div>
                    <Link
                        href={contact()}
                        className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                    >
                        Minta Penawaran
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </section>
        </>
    );
}

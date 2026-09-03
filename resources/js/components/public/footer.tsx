import { Link } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { about, contact, home } from '@/routes';
import { index as newsIndex } from '@/routes/news';
import { index as productsIndex } from '@/routes/products';

export function PublicFooter() {
    return (
        <footer className="bg-zinc-950 text-zinc-400">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <img
                            src="/assets/img/logo-ptscm-light.webp"
                            alt="Logo PT Sarana Cahaya Makmur"
                            className="size-10 w-auto rounded-sm"
                        />
                    </div>
                    <p className="text-sm leading-relaxed">
                        Distributor baja ringan terpercaya dengan produk SUNPLUS
                        bersertifikat SNI &amp; TKDN, berpusat di Kota Metro,
                        Lampung.
                    </p>
                    <p className="text-xs text-zinc-600">
                        Kapasitas produksi rangka atap hingga 100 ton/bulan.
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                        Navigasi
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link href={home()} className="hover:text-white">
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link href={about()} className="hover:text-white">
                                Tentang Kami
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={productsIndex()}
                                className="hover:text-white"
                            >
                                Katalog Produk
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={newsIndex()}
                                className="hover:text-white"
                            >
                                Proyek &amp; Galeri
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                        Kontak
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" />
                            <span>
                                Jl. Jendral Sudirman No.260, Ganjarasri, Metro Barat, Kota Metro, Lampung 34121
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="size-4 shrink-0 text-brand-500" />
                            <span>+62 812-3456-7890</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="size-4 shrink-0 text-brand-500" />
                            <span>info@ptscm.net</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                        Jam Operasional
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between gap-4">
                            <span>Senin - Jumat</span>
                            <span className="text-white">07.30 - 16.30</span>
                        </li>
                        <li className="flex justify-between gap-4">
                            <span>Sabtu</span>
                            <span className="text-white">07.30 - 16.30</span>
                        </li>
                        <li className="flex justify-between gap-4">
                            <span>Minggu</span>
                            <span className="text-white">Tutup</span>
                        </li>
                    </ul>
                    <Link
                        href={contact()}
                        className="mt-6 inline-flex items-center rounded-sm bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                    >
                        Minta Penawaran
                    </Link>
                </div>
            </div>

            <div className="border-t border-zinc-800">
                <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-zinc-600 sm:px-6 lg:px-8">
                    © {new Date().getFullYear()} PT Sarana Cahaya Makmur. Hak
                    cipta dilindungi.
                </p>
            </div>
        </footer>
    );
}

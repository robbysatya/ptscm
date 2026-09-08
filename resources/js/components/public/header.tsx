import { Link, usePage } from '@inertiajs/react';
import { Mail, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { about, contact, home } from '@/routes';
import { index as newsIndex } from '@/routes/news';
import { index as productsIndex } from '@/routes/products';

const navItems = [
    { title: 'Beranda', href: home() },
    { title: 'Tentang Kami', href: about() },
    { title: 'Produk', href: productsIndex() },
    { title: 'Dokumentasi', href: newsIndex() },
    { title: 'Kontak', href: contact() },
];

export function PublicHeader() {
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    const normalizePath = (value: string) => {
        const pathname = value.startsWith('http') ? new URL(value).pathname : value;

        return pathname.replace(/\/+$/, '') || '/';
    };

    const isActive = (href: { url: string }) => {
        const currentPath = normalizePath(url);
        const targetPath = normalizePath(href.url);

        return currentPath === targetPath || (targetPath !== '/' && currentPath.startsWith(`${targetPath}/`));
    };

    return (
        <header className="sticky top-0 z-50 bg-white">
            <div className="border-b border-zinc-800 bg-zinc-950 text-zinc-400">
                <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-8">
                    <p className="hidden items-center gap-2 sm:flex">
                        <Phone className="size-3.5 text-brand-400" />
                        +62 812-3456-7890
                    </p>
                    <p className="flex items-center gap-2">
                        <Mail className="size-3.5 text-brand-400" />
                        info@ptscm.net
                    </p>
                    <p className="hidden items-center gap-2 md:flex">
                        <span className="size-1.5 rounded-full bg-brand-500" />
                        Produsen Baja Ringan SNI &amp; TKDN
                    </p>
                </div>
            </div>

            <div className="border-b border-zinc-200">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
                    <Link
                        href={home()}
                        className="flex items-center gap-3"
                        prefetch
                    >
                        <img
                            src="/assets/img/logo-ptscm.webp"
                            alt="Logo PT Sarana Cahaya Makmur"
                            className="size-10 w-auto"
                        />
                        {/* <span className="hidden flex-col sm:flex">
                            <span className="text-sm font-bold tracking-tight text-zinc-900">
                                PT Sarana Cahaya Makmur
                            </span>
                            <span className="text-xs text-zinc-500">
                                SUNPLUS - Baja Ringan SNI
                            </span>
                        </span> */}
                    </Link>

                    <nav className="hidden items-center gap-7 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                prefetch
                                className={`text-sm font-medium transition-colors hover:text-brand-700 ${
                                    isActive(item.href)
                                        ? 'text-brand-700'
                                        : 'text-zinc-700'
                                }`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:block">
                        <Link
                            href={contact()}
                            className="inline-flex items-center rounded-sm bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                        >
                            Minta Penawaran
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen((value) => !value)}
                        className="inline-flex size-10 items-center justify-center rounded-sm text-zinc-700 hover:bg-zinc-100 lg:hidden"
                        aria-label="Buka menu"
                    >
                        {open ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </button>
                </div>
            </div>

            {open && (
                <nav className="border-b border-zinc-200 bg-white px-4 py-4 lg:hidden">
                    <div className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`rounded-sm px-3 py-2 text-sm font-medium ${
                                    isActive(item.href)
                                        ? 'bg-brand-50 text-brand-700'
                                        : 'text-zinc-700 hover:bg-zinc-50'
                                }`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}

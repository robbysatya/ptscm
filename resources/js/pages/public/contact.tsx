import { Head, usePage } from '@inertiajs/react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { ContactSettings } from '@/types/global';

export default function Contact() {
    const { contactSettings } = usePage<{
        contactSettings: ContactSettings;
    }>().props;

    return (
        <>
            <Head title="Kontak" />

            <section className="border-b border-zinc-800 bg-zinc-950 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <span className="text-sm font-semibold tracking-wider text-brand-400 uppercase">
                        Kontak
                    </span>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Hubungi Tim Sales
                    </h1>
                    <p className="mt-4 max-w-2xl text-zinc-300">
                        Konsultasikan kebutuhan material konstruksi Anda kepada
                        tim kami. Sertakan jenis dan jumlah produk untuk
                        penawaran harga yang lebih cepat.
                    </p>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white p-6 sm:col-span-2 lg:col-span-3">
                            <div className="overflow-hidden rounded-sm border border-zinc-200">
                                <iframe
                                    src="https://www.google.com/maps?q=PT%20Sarana%20Cahaya%20Makmur%20Metro%20Lampung&z=14&output=embed"
                                    title="Lokasi PT Sarana Cahaya Makmur"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="h-72 w-full"
                                />
                            </div>
                        </div>
                        {[
                            {
                                icon: MapPin,
                                title: 'Alamat',
                                lines: [contactSettings.address],
                            },
                            {
                                icon: Phone,
                                title: 'Telepon / WhatsApp',
                                lines: contactSettings.whatsapp_numbers,
                            },
                            {
                                icon: Mail,
                                title: 'Email',
                                lines: contactSettings.emails,
                            },
                            {
                                icon: Clock,
                                title: 'Jam Operasional',
                                lines: [
                                    'Senin - Sabtu: 07.30 - 16.30',
                                    'Minggu: Tutup',
                                ],
                            },
                        ].map((item) => (
                            <div key={item.title} className="bg-white p-6">
                                <item.icon className="size-8 text-brand-700" />
                                <h3 className="mt-4 font-semibold text-zinc-900">
                                    {item.title}
                                </h3>
                                <div className="mt-2 space-y-1 text-sm text-zinc-600">
                                    {item.lines.map((line) => (
                                        <p key={line}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="bg-white p-8 sm:col-span-2 lg:col-span-2">
                            <p className="text-sm leading-relaxed text-zinc-600">
                                Tim sales kami akan segera merespons pesan Anda
                                pada jam operasional. Untuk penawaran harga
                                partai maupun retail, silakan sertakan jenis
                                produk, ketebalan, dan perkiraan volume.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Mail, Plus, Trash2 } from 'lucide-react';
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
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    edit as contactSettingsEdit,
    update as updateContactSettings,
} from '@/routes/admin/contact-settings';
import type { ContactSettings } from '@/types/global';

export default function EditContactSettings({
    settings,
}: {
    settings: ContactSettings;
}) {
    const { data, setData, put, processing, errors } = useForm({
        address: settings.address,
        whatsapp_numbers: settings.whatsapp_numbers,
        emails: settings.emails,
    });

    function submit(event: React.FormEvent) {
        event.preventDefault();
        put(updateContactSettings().url);
    }

    function updateWhatsapp(index: number, value: string) {
        setData(
            'whatsapp_numbers',
            data.whatsapp_numbers.map((number, numberIndex) =>
                numberIndex === index ? value : number,
            ),
        );
    }

    function updateEmail(index: number, value: string) {
        setData(
            'emails',
            data.emails.map((email, emailIndex) =>
                emailIndex === index ? value : email,
            ),
        );
    }

    return (
        <>
            <Head title="Kontak Website" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" size="icon">
                        <Link href={adminDashboard()} aria-label="Kembali">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Kontak Website
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Atur nomor WhatsApp dan email yang tampil di seluruh
                            situs.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="max-w-3xl space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Alamat</CardTitle>
                            <CardDescription>
                                Alamat ini digunakan pada footer dan halaman
                                kontak.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Label htmlFor="address">Alamat</Label>
                            <Input
                                id="address"
                                value={data.address}
                                onChange={(event) =>
                                    setData('address', event.target.value)
                                }
                            />
                            <InputError message={errors.address} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Nomor WhatsApp</CardTitle>
                            <CardDescription>
                                Tambahkan lebih dari satu nomor untuk
                                ditampilkan pada kontak.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {data.whatsapp_numbers.map((number, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-2"
                                >
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor={`whatsapp-${index}`}>
                                            Nomor {index + 1}
                                        </Label>
                                        <Input
                                            id={`whatsapp-${index}`}
                                            value={number}
                                            onChange={(event) =>
                                                updateWhatsapp(
                                                    index,
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="+62 812-3456-7890"
                                        />
                                        <InputError
                                            message={
                                                errors[
                                                    `whatsapp_numbers.${index}`
                                                ]
                                            }
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="mt-7"
                                        onClick={() =>
                                            setData(
                                                'whatsapp_numbers',
                                                data.whatsapp_numbers.filter(
                                                    (_, numberIndex) =>
                                                        numberIndex !== index,
                                                ),
                                            )
                                        }
                                        disabled={
                                            data.whatsapp_numbers.length === 1
                                        }
                                        aria-label={`Hapus nomor ${index + 1}`}
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setData('whatsapp_numbers', [
                                        ...data.whatsapp_numbers,
                                        '',
                                    ])
                                }
                            >
                                <Plus />
                                Tambah Nomor
                            </Button>
                            <InputError message={errors.whatsapp_numbers} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Email</CardTitle>
                            <CardDescription>
                                Semua alamat email ini dapat ditampilkan pada
                                header, footer, dan kontak.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {data.emails.map((email, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-2"
                                >
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor={`email-${index}`}>
                                            Email {index + 1}
                                        </Label>
                                        <Input
                                            id={`email-${index}`}
                                            type="email"
                                            value={email}
                                            onChange={(event) =>
                                                updateEmail(
                                                    index,
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="info@ptscm.net"
                                        />
                                        <InputError
                                            message={errors[`emails.${index}`]}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="mt-7"
                                        onClick={() =>
                                            setData(
                                                'emails',
                                                data.emails.filter(
                                                    (_, emailIndex) =>
                                                        emailIndex !== index,
                                                ),
                                            )
                                        }
                                        disabled={data.emails.length === 1}
                                        aria-label={`Hapus email ${index + 1}`}
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setData('emails', [...data.emails, ''])
                                }
                            >
                                <Mail />
                                Tambah Email
                            </Button>
                            <InputError message={errors.emails} />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

EditContactSettings.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminDashboard() },
        { title: 'Kontak Website', href: contactSettingsEdit() },
    ],
};

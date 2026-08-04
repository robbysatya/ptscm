import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2, UserRound } from 'lucide-react';
import { useState } from 'react';
import { AdminPagination } from '@/components/admin/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    create as createUser,
    destroy as destroyUser,
    edit as editUser,
    index as usersIndex,
} from '@/routes/admin/users';
import type { Paginated, User } from '@/types/models';

export default function UsersIndex({
    users,
    filters,
}: {
    users: Paginated<User>;
    filters: { search: string };
}) {
    const [search, setSearch] = useState(filters.search);

    function submitSearch(event: React.FormEvent) {
        event.preventDefault();
        router.get(
            usersIndex(),
            { search: search || undefined },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }

    function remove(user: User) {
        if (window.confirm(`Hapus pengguna "${user.name}"?`)) {
            router.delete(destroyUser(user.id));
        }
    }

    return (
        <>
            <Head title="Pengguna" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Pengguna
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola akun pengguna panel admin.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={createUser()}>
                            <Plus />
                            Tambah Pengguna
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <CardTitle>Daftar Pengguna</CardTitle>
                                <CardDescription>
                                    Total {users.total} pengguna.
                                </CardDescription>
                            </div>
                            <form onSubmit={submitSearch} className="relative">
                                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Cari pengguna..."
                                    className="h-9 w-64 pl-9"
                                />
                            </form>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {users.data.length === 0 ? (
                            <div className="flex flex-col items-center gap-4 py-16 text-center">
                                <UserRound className="size-12 text-muted-foreground/40" />
                                <p className="text-sm text-muted-foreground">
                                    Belum ada pengguna.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y rounded-lg border">
                                {users.data.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between gap-4 p-3"
                                    >
                                        <div className="flex min-w-0 items-center gap-4">
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                                <UserRound className="size-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate font-medium">
                                                    {user.name}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-3">
                                            <Badge
                                                variant={
                                                    user.role === 'superadmin'
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                            >
                                                {user.role === 'superadmin'
                                                    ? 'Super Admin'
                                                    : 'Admin'}
                                            </Badge>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <Link
                                                        href={editUser(user.id)}
                                                        aria-label={`Edit ${user.name}`}
                                                    >
                                                        <Pencil />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => remove(user)}
                                                    aria-label={`Hapus ${user.name}`}
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="pt-4">
                            <AdminPagination pagination={users} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

UsersIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: adminDashboard() },
        { title: 'Pengguna', href: usersIndex() },
    ],
};

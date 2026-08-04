<?php

namespace App\Enums;

enum UserRole: string
{
    case Superadmin = 'superadmin';
    case Admin = 'admin';

    public function label(): string
    {
        return match ($this) {
            self::Superadmin => 'Superadmin',
            self::Admin => 'Admin',
        };
    }

    public function canAccessAdminPanel(): bool
    {
        return in_array($this, [self::Superadmin, self::Admin], true);
    }

    public function canManageCatalog(): bool
    {
        return $this->canAccessAdminPanel();
    }

    public function canManageNews(): bool
    {
        return $this->canAccessAdminPanel();
    }

    public function canManageUsers(): bool
    {
        return $this === self::Superadmin;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSetting extends Model
{
    protected $fillable = [
        'address',
        'whatsapp_numbers',
        'emails',
    ];

    protected function casts(): array
    {
        return [
            'whatsapp_numbers' => 'array',
            'emails' => 'array',
        ];
    }

    /**
     * @return array{address: string, whatsapp_numbers: list<string>, emails: list<string>}
     */
    public static function defaults(): array
    {
        return [
            'address' => 'Jl. Jendral Sudirman No.260, Ganjarasri, Metro Barat, Kota Metro, Lampung 34121',
            'whatsapp_numbers' => ['+62 812-3456-7890'],
            'emails' => ['info@ptscm.net'],
        ];
    }

    /**
     * @return array{address: string, whatsapp_numbers: list<string>, emails: list<string>}
     */
    public function toContactArray(): array
    {
        return [
            'address' => $this->address,
            'whatsapp_numbers' => array_values($this->whatsapp_numbers ?? []),
            'emails' => array_values($this->emails ?? []),
        ];
    }
}

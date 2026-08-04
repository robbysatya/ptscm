<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Category;
use App\Models\News;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@ptscm.dev',
            'role' => UserRole::Superadmin,
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@ptscm.dev',
            'role' => UserRole::Admin,
        ]);

        $bajaRingan = Category::create([
            'name' => 'Baja Ringan',
            'description' => 'Produk baja ringan berkualitas untuk kebutuhan konstruksi Anda.',
            'sort_order' => 1,
        ]);

        $subCategories = [
            ['name' => 'Canal', 'sort_order' => 1],
            ['name' => 'Reng', 'sort_order' => 2],
            ['name' => 'Spandek', 'sort_order' => 3],
            ['name' => 'Genteng', 'sort_order' => 4],
        ];

        foreach ($subCategories as $subCategory) {
            $bajaRingan->children()->create($subCategory);
        }

        $productNames = [
            'Canal C75', 'Canal C100', 'Canal C125',
            'Reng 4x6', 'Reng 4x8',
            'Spandek 0.30 mm', 'Spandek 0.35 mm', 'Spandek 0.40 mm',
            'Genteng Metal Pasir', 'Genteng Metal Polos',
        ];

        $categories = Category::whereNotNull('parent_id')->get();

        foreach ($categories as $index => $category) {
            for ($i = 0; $i < 3; $i++) {
                Product::factory()->create([
                    'category_id' => $category->id,
                    'name' => $productNames[$index * 3 + $i] ?? $category->name.' '.($i + 1),
                    'is_featured' => $i === 0,
                ]);
            }
        }

        News::factory()->count(6)->published()->create();
        News::factory()->count(2)->create();
    }
}

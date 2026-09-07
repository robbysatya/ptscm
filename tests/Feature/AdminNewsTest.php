<?php

use App\Models\News;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('an admin can access the news listing', function () {
    $this->actingAs(User::factory()->admin()->create());

    $this->get(route('admin.news.index'))->assertSuccessful();
});

test('an admin can create a published news article', function () {
    $admin = User::factory()->admin()->create();
    $this->actingAs($admin);

    $this->post(route('admin.news.store'), [
        'title' => 'Peluncuran Produk Baru',
        'content' => 'Konten berita lengkap.',
        'category' => 'produk',
        'status' => 'published',
    ])->assertRedirect();

    $this->assertDatabaseHas('news', [
        'title' => 'Peluncuran Produk Baru',
        'slug' => 'peluncuran-produk-baru',
        'author_id' => $admin->id,
        'category' => 'produk',
        'status' => 'published',
    ]);

    $article = News::where('title', 'Peluncuran Produk Baru')->first();
    expect($article->published_at)->not->toBeNull();
});

test('news title and content are required', function () {
    $this->actingAs(User::factory()->admin()->create());

    $this->post(route('admin.news.store'), [
        'title' => '',
        'content' => '',
        'status' => 'draft',
    ])->assertSessionHasErrors(['title', 'content']);
});

test('news category must be one of the allowed categories', function () {
    $this->actingAs(User::factory()->admin()->create());

    $this->post(route('admin.news.store'), [
        'title' => 'Kategori Tidak Valid',
        'content' => 'Konten berita.',
        'category' => 'hiburan',
        'status' => 'draft',
    ])->assertSessionHasErrors(['category']);
});

test('a project gallery item can be created with a project category', function () {
    $admin = User::factory()->admin()->create();
    $this->actingAs($admin);

    $this->post(route('admin.news.store'), [
        'title' => 'Proyek Warehouse Metro',
        'content' => 'Galeri proyek penyelesaian warehouse untuk mitra lokal.',
        'client_name' => 'PT Maju Bersama',
        'project_location' => 'Metro Lampung',
        'project_year' => 2026,
        'category' => 'proyek',
        'status' => 'published',
    ])->assertRedirect();

    $this->assertDatabaseHas('news', [
        'title' => 'Proyek Warehouse Metro',
        'client_name' => 'PT Maju Bersama',
        'project_location' => 'Metro Lampung',
        'project_year' => 2026,
        'category' => 'proyek',
        'status' => 'published',
    ]);
});

test('an admin can add multiple project gallery images', function () {
    Storage::fake('public');
    $this->actingAs(User::factory()->admin()->create());

    $this->post(route('admin.news.store'), [
        'title' => 'Proyek Dengan Gallery',
        'content' => 'Dokumentasi proyek.',
        'category' => 'proyek',
        'status' => 'draft',
        'gallery_images' => [
            UploadedFile::fake()->image('tampak-depan.jpg'),
            UploadedFile::fake()->image('tampak-samping.jpg'),
        ],
    ])->assertRedirect();

    $article = News::where('title', 'Proyek Dengan Gallery')->firstOrFail();

    expect($article->galleryImages)->toHaveCount(2);
    expect($article->galleryImages->pluck('sort_order')->all())->toBe([0, 1]);

    foreach ($article->galleryImages as $image) {
        Storage::disk('public')->assertExists($image->path);
    }
});

test('a draft article keeps a null published_at', function () {
    $this->actingAs(User::factory()->admin()->create());

    $this->post(route('admin.news.store'), [
        'title' => 'Masih Draf',
        'content' => 'Konten draf.',
        'status' => 'draft',
    ])->assertRedirect();

    $article = News::where('title', 'Masih Draf')->first();
    expect($article->published_at)->toBeNull();
});

test('an admin can update a news article', function () {
    $this->actingAs(User::factory()->admin()->create());
    $article = News::factory()->published()->create(['title' => 'Lama']);

    $this->put(route('admin.news.update', $article), [
        'title' => 'Baru',
        'content' => 'Konten baru.',
        'status' => 'published',
    ])->assertRedirect();

    $this->assertDatabaseHas('news', [
        'id' => $article->id,
        'title' => 'Baru',
    ]);
});

test('updating a news article without an image keeps the existing cover image', function () {
    $this->actingAs(User::factory()->admin()->create());
    $article = News::factory()->create(['cover_image' => 'news/original.jpg']);

    $this->put(route('admin.news.update', $article), [
        'title' => 'Judul Baru',
        'content' => 'Konten baru.',
        'status' => 'draft',
        'cover_image' => null,
    ])->assertRedirect();

    $this->assertDatabaseHas('news', [
        'id' => $article->id,
        'title' => 'Judul Baru',
        'cover_image' => 'news/original.jpg',
    ]);
});

test('an admin can delete a news article', function () {
    $this->actingAs(User::factory()->admin()->create());
    $article = News::factory()->create();

    $this->delete(route('admin.news.destroy', $article))->assertRedirect();

    $this->assertDatabaseMissing('news', ['id' => $article->id]);
});

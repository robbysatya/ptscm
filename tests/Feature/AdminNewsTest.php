<?php

use App\Models\News;
use App\Models\User;

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

test('an admin can delete a news article', function () {
    $this->actingAs(User::factory()->admin()->create());
    $article = News::factory()->create();

    $this->delete(route('admin.news.destroy', $article))->assertRedirect();

    $this->assertDatabaseMissing('news', ['id' => $article->id]);
});

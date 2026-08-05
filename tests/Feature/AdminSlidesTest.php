<?php

use App\Models\Slide;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Inertia\Testing\AssertableInertia as Assert;

test('an admin cannot access the slide listing', function () {
    $this->actingAs(User::factory()->admin()->create());

    $this->get(route('admin.slides.index'))->assertForbidden();
});

test('a superadmin can access the slide listing', function () {
    $this->actingAs(User::factory()->superadmin()->create());

    $this->get(route('admin.slides.index'))->assertSuccessful();
});

test('a superadmin can create a slide', function () {
    $this->actingAs(User::factory()->superadmin()->create());

    $this->post(route('admin.slides.store'), [
        'title' => 'Baja Ringan Berkualitas',
        'subtitle' => 'Produk bersertifikat SNI dan TKDN.',
        'image' => UploadedFile::fake()->image('slide.jpg'),
        'is_active' => true,
    ])->assertRedirect(route('admin.slides.index'));

    $this->assertDatabaseHas('slides', [
        'title' => 'Baja Ringan Berkualitas',
        'subtitle' => 'Produk bersertifikat SNI dan TKDN.',
    ]);
});

test('slide image is required when creating a slide', function () {
    $this->actingAs(User::factory()->superadmin()->create());

    $this->post(route('admin.slides.store'), [
        'title' => 'Tanpa Gambar',
    ])->assertSessionHasErrors(['image']);
});

test('a superadmin can update a slide without replacing the image', function () {
    $this->actingAs(User::factory()->superadmin()->create());
    $slide = Slide::factory()->create(['image' => 'slides/original.jpg']);

    $this->put(route('admin.slides.update', $slide), [
        'title' => 'Judul Baru',
        'image' => null,
        'is_active' => true,
    ])->assertRedirect(route('admin.slides.edit', $slide));

    $this->assertDatabaseHas('slides', [
        'id' => $slide->id,
        'title' => 'Judul Baru',
        'image' => 'slides/original.jpg',
    ]);
});

test('a superadmin can delete a slide', function () {
    $this->actingAs(User::factory()->superadmin()->create());
    $slide = Slide::factory()->create();

    $this->delete(route('admin.slides.destroy', $slide))->assertRedirect(route('admin.slides.index'));

    $this->assertDatabaseMissing('slides', ['id' => $slide->id]);
});

test('only active slides are shown on the home page in sort order', function () {
    Slide::factory()->create(['title' => 'Slide Aktif 1', 'sort_order' => 1]);
    Slide::factory()->create(['title' => 'Slide Aktif 2', 'sort_order' => 0]);
    Slide::factory()->create(['title' => 'Slide Nonaktif', 'is_active' => false]);

    $this->get(route('home'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/home')
            ->has('slides', 2)
            ->where('slides.0.title', 'Slide Aktif 2')
            ->where('slides.1.title', 'Slide Aktif 1'));
});

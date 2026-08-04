<?php

use App\Models\Category;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('admin.categories.index'))->assertRedirect(route('login'));
});

test('an admin can access the category listing', function () {
    $this->actingAs(User::factory()->admin()->create());

    $this->get(route('admin.categories.index'))->assertSuccessful();
});

test('an admin can create a category', function () {
    $this->actingAs(User::factory()->admin()->create());

    $this->post(route('admin.categories.store'), [
        'name' => 'Canal C75',
        'is_active' => true,
    ])->assertRedirect();

    $this->assertDatabaseHas('categories', [
        'name' => 'Canal C75',
        'slug' => 'canal-c75',
    ]);
});

test('category name is required', function () {
    $this->actingAs(User::factory()->admin()->create());

    $this->post(route('admin.categories.store'), [
        'name' => '',
    ])->assertSessionHasErrors('name');
});

test('an admin can update a category', function () {
    $this->actingAs(User::factory()->admin()->create());
    $category = Category::factory()->create(['name' => 'Lama']);

    $this->put(route('admin.categories.update', $category), [
        'name' => 'Baru',
        'is_active' => true,
    ])->assertRedirect();

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Baru',
    ]);
});

test('an admin can delete a category', function () {
    $this->actingAs(User::factory()->admin()->create());
    $category = Category::factory()->create();

    $this->delete(route('admin.categories.destroy', $category))->assertRedirect();

    $this->assertDatabaseMissing('categories', ['id' => $category->id]);
});

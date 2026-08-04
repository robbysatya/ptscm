<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\UploadedFile;

test('an admin can access the product listing', function () {
    $this->actingAs(User::factory()->admin()->create());

    $this->get(route('admin.products.index'))->assertSuccessful();
});

test('an admin can create a product', function () {
    $this->actingAs(User::factory()->admin()->create());
    $category = Category::factory()->create();

    $this->post(route('admin.products.store'), [
        'category_id' => $category->id,
        'name' => 'Canal C75',
        'short_description' => 'Baja ringan berkualitas.',
        'specifications' => [
            ['label' => 'Panjang', 'value' => '6 meter'],
            ['label' => 'Tebal', 'value' => '0.75 mm'],
        ],
        'is_featured' => true,
        'is_active' => true,
        'sort_order' => 1,
    ])->assertRedirect();

    $this->assertDatabaseHas('products', [
        'name' => 'Canal C75',
        'slug' => 'canal-c75',
        'category_id' => $category->id,
        'is_featured' => true,
    ]);

    $product = Product::where('name', 'Canal C75')->first();
    expect($product->specifications)->toHaveCount(2);
});

test('product name and category are required', function () {
    $this->actingAs(User::factory()->admin()->create());

    $this->post(route('admin.products.store'), [
        'category_id' => null,
        'name' => '',
    ])->assertSessionHasErrors(['category_id', 'name']);
});

test('an admin can create a product with an image', function () {
    $this->actingAs(User::factory()->admin()->create());
    $category = Category::factory()->create();

    $this->post(route('admin.products.store'), [
        'category_id' => $category->id,
        'name' => 'Reng 0.45',
        'image' => UploadedFile::fake()->image('reng.jpg'),
        'is_active' => true,
    ])->assertRedirect();

    $this->assertDatabaseHas('products', ['name' => 'Reng 0.45']);
});

test('an admin can update a product', function () {
    $this->actingAs(User::factory()->admin()->create());
    $product = Product::factory()->create(['name' => 'Lama']);

    $this->put(route('admin.products.update', $product), [
        'category_id' => $product->category_id,
        'name' => 'Baru',
        'is_active' => true,
    ])->assertRedirect();

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Baru',
    ]);
});

test('an admin can delete a product', function () {
    $this->actingAs(User::factory()->admin()->create());
    $product = Product::factory()->create();

    $this->delete(route('admin.products.destroy', $product))->assertRedirect();

    $this->assertDatabaseMissing('products', ['id' => $product->id]);
});

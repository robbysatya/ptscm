<?php

use App\Models\News;
use App\Models\Product;

test('product image attribute resolves to a public storage url', function () {
    config(['app.url' => 'http://localhost']);

    $product = new Product;
    $product->image = 'products/example.jpg';

    expect($product->image_url)->toBe('http://localhost/storage/products/example.jpg');
});

test('news cover image attribute resolves to a public storage url', function () {
    config(['app.url' => 'http://localhost']);

    $news = new News;
    $news->cover_image = 'news/example.jpg';

    expect($news->cover_image_url)->toBe('http://localhost/storage/news/example.jpg');
});

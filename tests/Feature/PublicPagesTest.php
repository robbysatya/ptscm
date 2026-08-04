<?php

use App\Models\Category;
use App\Models\News;
use App\Models\Product;

test('guest can visit the home page', function () {
    $this->get(route('home'))->assertSuccessful();
});

test('guest can visit the about page', function () {
    $this->get(route('about'))->assertSuccessful();
});

test('guest can visit the contact page', function () {
    $this->get(route('contact'))->assertSuccessful();
});

test('guest can visit the products index page', function () {
    Category::factory()->create();

    $this->get(route('products.index'))->assertSuccessful();
});

test('guest can visit a published product detail page', function () {
    $product = Product::factory()->create();

    $this->get(route('products.show', $product))->assertSuccessful();
});

test('guest cannot visit an inactive product detail page', function () {
    $product = Product::factory()->inactive()->create();

    $this->get(route('products.show', $product))->assertNotFound();
});

test('guest can visit the news index page', function () {
    $this->get(route('news.index'))->assertSuccessful();
});

test('guest can visit a published news detail page', function () {
    $article = News::factory()->published()->create();

    $this->get(route('news.show', $article))->assertSuccessful();
});

test('guest cannot visit a draft news detail page', function () {
    $article = News::factory()->create();

    $this->get(route('news.show', $article))->assertNotFound();
});

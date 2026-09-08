<?php

use App\Enums\UserRole;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ContactSettingController as AdminContactSettingController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\NewsController as AdminNewsController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\SlideController as AdminSlideController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\NewsController;
use App\Http\Controllers\Public\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{news:slug}', [NewsController::class, 'show'])->name('news.show');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'verified', 'role:admin,superadmin'])
    ->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

        Route::resource('categories', AdminCategoryController::class)->except('show');
        Route::get('contact-settings', [AdminContactSettingController::class, 'edit'])->name('contact-settings.edit');
        Route::put('contact-settings', [AdminContactSettingController::class, 'update'])->name('contact-settings.update');
        Route::resource('products', AdminProductController::class)->except('show');
        Route::resource('news', AdminNewsController::class)->except('show');

        Route::resource('users', AdminUserController::class)
            ->except('show')
            ->middleware('role:'.UserRole::Superadmin->value);

        Route::resource('slides', AdminSlideController::class)
            ->except('show')
            ->middleware('role:'.UserRole::Superadmin->value);
    });

require __DIR__.'/settings.php';

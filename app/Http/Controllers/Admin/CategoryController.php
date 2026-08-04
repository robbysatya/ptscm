<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index(): Response
    {
        $categories = Category::query()
            ->with(['parent', 'children'])
            ->withCount('products')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create(): Response
    {
        Gate::authorize('create', Category::class);

        return Inertia::render('admin/categories/create', [
            'parentCategories' => Category::orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $category = Category::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Kategori berhasil dibuat.')]);

        return to_route('admin.categories.edit', $category);
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(Category $category): Response
    {
        Gate::authorize('update', $category);

        return Inertia::render('admin/categories/edit', [
            'category' => $category,
            'parentCategories' => Category::where('id', '!=', $category->id)->orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $category->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Kategori berhasil diperbarui.')]);

        return to_route('admin.categories.edit', $category);
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(Category $category): RedirectResponse
    {
        Gate::authorize('delete', $category);

        $category->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Kategori berhasil dihapus.')]);

        return to_route('admin.categories.index');
    }
}

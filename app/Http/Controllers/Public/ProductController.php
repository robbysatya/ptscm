<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a paginated, filterable product catalog.
     */
    public function index(Request $request): Response
    {
        $categories = Category::query()
            ->active()
            ->withCount(['products' => fn ($query) => $query->active()])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        $products = Product::query()
            ->active()
            ->with('category')
            ->when($request->string('category')->toString(), function ($query, string $slug) {
                $query->where(function ($query) use ($slug) {
                    $category = Category::where('slug', $slug)->first();

                    if ($category === null) {
                        return;
                    }

                    $query->where('category_id', $category->id)
                        ->orWhereIn('category_id', $category->children()->pluck('id'));
                });
            })
            ->when($request->string('search')->toString(), function ($query, string $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('public/products', [
            'categories' => $categories,
            'products' => $products,
            'filters' => [
                'category' => $request->string('category')->toString(),
                'search' => $request->string('search')->toString(),
            ],
        ]);
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product): Response
    {
        abort_unless($product->is_active, 404);

        return Inertia::render('public/product-detail', [
            'product' => $product->load('category'),
            'relatedProducts' => Product::query()
                ->active()
                ->where('category_id', $product->category_id)
                ->whereKeyNot($product->id)
                ->orderBy('sort_order')
                ->limit(4)
                ->get(),
        ]);
    }
}

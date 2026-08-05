<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Media\StoreImageAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(private StoreImageAction $storeImage) {}

    /**
     * Display a listing of the products.
     */
    public function index(Request $request): Response
    {
        $products = Product::query()
            ->with('category')
            ->when($request->string('search')->toString(), function ($query, string $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'filters' => ['search' => $request->string('search')->toString()],
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create(): Response
    {
        Gate::authorize('create', Product::class);

        return Inertia::render('admin/products/create', [
            'categories' => Category::orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $this->storeImage->handle($request->file('image'), 'products');
        }

        $data['specifications'] = $this->normalizeSpecifications($data['specifications'] ?? []);

        $product = Product::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Produk berhasil dibuat.')]);

        return to_route('admin.products.edit', $product);
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product): Response
    {
        Gate::authorize('update', $product);

        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'categories' => Category::orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $this->storeImage->handle($request->file('image'), 'products');
        } else {
            unset($data['image']);
        }

        $data['specifications'] = $this->normalizeSpecifications($data['specifications'] ?? []);

        $product->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Produk berhasil diperbarui.')]);

        return to_route('admin.products.edit', $product);
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        Gate::authorize('delete', $product);

        $product->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Produk berhasil dihapus.')]);

        return to_route('admin.products.index');
    }

    /**
     * Remove empty specification rows submitted by the form.
     *
     * @param  array<int, array{label?: string|null, value?: string|null}>  $specifications
     * @return array<int, array{label: string, value: string}>
     */
    private function normalizeSpecifications(array $specifications): array
    {
        return array_values(array_filter(
            $specifications,
            fn (array $spec): bool => filled($spec['label'] ?? null) || filled($spec['value'] ?? null),
        ));
    }
}

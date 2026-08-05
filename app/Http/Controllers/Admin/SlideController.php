<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Media\StoreImageAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSlideRequest;
use App\Http\Requests\UpdateSlideRequest;
use App\Models\Slide;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class SlideController extends Controller
{
    public function __construct(private StoreImageAction $storeImage) {}

    /**
     * Display a listing of the homepage slides.
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', Slide::class);

        $slides = Slide::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('admin/slides/index', [
            'slides' => $slides,
        ]);
    }

    /**
     * Show the form for creating a new slide.
     */
    public function create(): Response
    {
        Gate::authorize('create', Slide::class);

        return Inertia::render('admin/slides/create');
    }

    /**
     * Store a newly created slide in storage.
     */
    public function store(StoreSlideRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $data['image'] = $this->storeImage->handle($request->file('image'), 'slides');

        Slide::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Slide berhasil dibuat.')]);

        return to_route('admin.slides.index');
    }

    /**
     * Show the form for editing the specified slide.
     */
    public function edit(Slide $slide): Response
    {
        Gate::authorize('update', $slide);

        return Inertia::render('admin/slides/edit', [
            'slide' => $slide,
        ]);
    }

    /**
     * Update the specified slide in storage.
     */
    public function update(UpdateSlideRequest $request, Slide $slide): RedirectResponse
    {
        Gate::authorize('update', $slide);

        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $this->storeImage->handle($request->file('image'), 'slides');
        } else {
            unset($data['image']);
        }

        $slide->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Slide berhasil diperbarui.')]);

        return to_route('admin.slides.edit', $slide);
    }

    /**
     * Remove the specified slide from storage.
     */
    public function destroy(Slide $slide): RedirectResponse
    {
        Gate::authorize('delete', $slide);

        $slide->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Slide berhasil dihapus.')]);

        return to_route('admin.slides.index');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Media\StoreImageAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Models\News;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function __construct(private StoreImageAction $storeImage) {}

    /**
     * Display a listing of the news articles.
     */
    public function index(Request $request): Response
    {
        $articles = News::query()
            ->with('author')
            ->when($request->string('search')->toString(), function ($query, string $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/news/index', [
            'articles' => $articles,
            'filters' => ['search' => $request->string('search')->toString()],
        ]);
    }

    /**
     * Show the form for creating a new news article.
     */
    public function create(): Response
    {
        Gate::authorize('create', News::class);

        return Inertia::render('admin/news/create', [
            'categories' => News::CATEGORIES,
        ]);
    }

    /**
     * Store a newly created news article in storage.
     */
    public function store(StoreNewsRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $this->storeImage->handle($request->file('cover_image'), 'news');
        }

        $data['author_id'] = $request->user()->id;
        $data['published_at'] = $this->resolvePublishedAt($data);

        $article = News::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Berita berhasil dibuat.')]);

        return to_route('admin.news.edit', $article);
    }

    /**
     * Show the form for editing the specified news article.
     */
    public function edit(News $news): Response
    {
        Gate::authorize('update', $news);

        return Inertia::render('admin/news/edit', [
            'article' => $news,
            'categories' => News::CATEGORIES,
        ]);
    }

    /**
     * Update the specified news article in storage.
     */
    public function update(UpdateNewsRequest $request, News $news): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $this->storeImage->handle($request->file('cover_image'), 'news');
        }

        $data['published_at'] = $this->resolvePublishedAt($data, $news);

        $news->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Berita berhasil diperbarui.')]);

        return to_route('admin.news.edit', $news);
    }

    /**
     * Remove the specified news article from storage.
     */
    public function destroy(News $news): RedirectResponse
    {
        Gate::authorize('delete', $news);

        $news->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Berita berhasil dihapus.')]);

        return to_route('admin.news.index');
    }

    /**
     * Resolve the published timestamp for an article being published.
     *
     * @param  array<string, mixed>  $data
     */
    private function resolvePublishedAt(array $data, ?News $news = null): ?string
    {
        if (($data['status'] ?? null) !== News::STATUS_PUBLISHED) {
            return null;
        }

        return $data['published_at'] ?? $news?->published_at?->toDateTimeString() ?? now()->toDateTimeString();
    }
}

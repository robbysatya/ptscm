<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    /**
     * Display a paginated list of published news articles.
     */
    public function index(Request $request): Response
    {
        $articles = News::query()
            ->published()
            ->with('author')
            ->latest('published_at')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('public/news', [
            'articles' => $articles,
        ]);
    }

    /**
     * Display the specified news article.
     */
    public function show(News $news): Response
    {
        abort_unless($news->isPublished(), 404);

        return Inertia::render('public/news-detail', [
            'article' => $news->load('author'),
            'relatedArticles' => News::query()
                ->published()
                ->whereKeyNot($news->id)
                ->latest('published_at')
                ->limit(3)
                ->get(),
        ]);
    }
}

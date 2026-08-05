<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Product;
use App\Models\Slide;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the public homepage.
     */
    public function index(): Response
    {
        return Inertia::render('public/home', [
            'slides' => Slide::active()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(),
            'featuredProducts' => Product::active()->featured()->with('category')->latest()->limit(6)->get(),
            'latestNews' => News::published()->with('author')->latest('published_at')->limit(3)->get(),
        ]);
    }
}

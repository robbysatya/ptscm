<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\News;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the admin dashboard with content statistics.
     */
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'products' => Product::count(),
                'categories' => Category::count(),
                'news' => News::count(),
                'users' => User::count(),
            ],
        ]);
    }
}

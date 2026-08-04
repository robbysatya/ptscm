<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    /**
     * Display the company profile page.
     */
    public function index(): Response
    {
        return Inertia::render('public/about');
    }
}

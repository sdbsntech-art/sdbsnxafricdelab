<?php

namespace App\Http\Controllers;

use App\Models\AcademicLevel;
use App\Models\CommunityPost;
use App\Models\CourseModule;
use App\Models\Opportunity;
use App\Models\Resource;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $levels = AcademicLevel::withCount(['modules', 'resources'])
            ->with(['semesters.modules'])
            ->orderBy('order')
            ->get();

        $featuredResources = Resource::with(['module', 'academicLevel', 'semester'])
            ->where('is_published', true)
            ->where('is_featured', true)
            ->latest()
            ->take(6)
            ->get();

        $latestResources = Resource::with(['module', 'academicLevel', 'semester'])
            ->where('is_published', true)
            ->latest()
            ->take(8)
            ->get();

        $latestDiscussions = CommunityPost::with(['user', 'module'])
            ->withCount('comments')
            ->latest()
            ->take(4)
            ->get();

        $activeOpportunities = Opportunity::where('is_active', true)
            ->latest()
            ->take(3)
            ->get();

        $stats = [
            'resources_count' => Resource::where('is_published', true)->count(),
            'modules_count' => CourseModule::count(),
            'levels_count' => AcademicLevel::count(),
            'downloads_count' => Resource::sum('downloads_count'),
            'students_count' => User::count(),
        ];

        return Inertia::render('Welcome', [
            'levels' => $levels,
            'featuredResources' => $featuredResources,
            'latestResources' => $latestResources,
            'latestDiscussions' => $latestDiscussions,
            'activeOpportunities' => $activeOpportunities,
            'stats' => $stats,
        ]);
    }
}

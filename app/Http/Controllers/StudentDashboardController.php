<?php

namespace App\Http\Controllers;

use App\Models\AcademicLevel;
use App\Models\CommunityPost;
use App\Models\Resource;
use App\Models\UserProgress;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class StudentDashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        $bookmarkedResources = Resource::whereHas('bookmarks', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })
            ->with(['module', 'academicLevel', 'semester'])
            ->latest()
            ->get();

        $inProgressResources = Resource::whereHas('progress', function ($q) use ($user) {
            $q->where('user_id', $user->id)->where('is_completed', false);
        })
            ->with(['module', 'academicLevel', 'semester'])
            ->latest('updated_at')
            ->take(6)
            ->get();

        $completedResources = Resource::whereHas('progress', function ($q) use ($user) {
            $q->where('user_id', $user->id)->where('is_completed', true);
        })
            ->with(['module', 'academicLevel', 'semester'])
            ->latest('updated_at')
            ->take(6)
            ->get();

        $myPosts = CommunityPost::where('user_id', $user->id)
            ->withCount('comments')
            ->latest()
            ->take(5)
            ->get();

        $levels = AcademicLevel::with(['semesters.modules'])->orderBy('order')->get();

        // Calculate badges based on points
        $points = $user->points ?? 0;
        $badge = 'Novice du Code';
        $nextTier = 100;
        if ($points >= 1000) {
            $badge = 'Architecte Émérite';
            $nextTier = 2000;
        } elseif ($points >= 500) {
            $badge = 'Développeur Confirmé';
            $nextTier = 1000;
        } elseif ($points >= 200) {
            $badge = 'Apprenti Développeur';
            $nextTier = 500;
        }

        $stats = [
            'bookmarks_count' => $bookmarkedResources->count(),
            'completed_count' => UserProgress::where('user_id', $user->id)->where('is_completed', true)->count(),
            'posts_count' => CommunityPost::where('user_id', $user->id)->count(),
            'points' => $points,
            'badge' => $badge,
            'next_tier' => $nextTier,
        ];

        return Inertia::render('Dashboard', [
            'user' => $user,
            'bookmarkedResources' => $bookmarkedResources,
            'inProgressResources' => $inProgressResources,
            'completedResources' => $completedResources,
            'myPosts' => $myPosts,
            'levels' => $levels,
            'stats' => $stats,
        ]);
    }
}

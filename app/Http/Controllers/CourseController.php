<?php

namespace App\Http\Controllers;

use App\Models\AcademicLevel;
use App\Models\CourseModule;
use App\Models\Resource;
use App\Models\Semester;
use App\Models\UserBookmark;
use App\Models\UserProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $levelSlug = $request->input('level');
        $semesterSlug = $request->input('semester');
        $moduleSlug = $request->input('module');
        $type = $request->input('type');

        $query = Resource::with(['module', 'academicLevel', 'semester'])
            ->where('is_published', true);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($levelSlug) {
            $query->whereHas('academicLevel', function ($q) use ($levelSlug) {
                $q->where('slug', $levelSlug);
            });
        }

        if ($semesterSlug) {
            $query->whereHas('semester', function ($q) use ($semesterSlug) {
                $q->where('slug', $semesterSlug);
            });
        }

        if ($moduleSlug) {
            $query->whereHas('module', function ($q) use ($moduleSlug) {
                $q->where('slug', $moduleSlug);
            });
        }

        if ($type) {
            $query->where('type', $type);
        }

        $resources = $query->latest()->paginate(18)->withQueryString();

        $levels = AcademicLevel::with(['semesters.modules'])->orderBy('order')->get();
        $allModules = CourseModule::orderBy('name')->get();

        $userBookmarks = [];
        if (Auth::check()) {
            $userBookmarks = UserBookmark::where('user_id', Auth::id())
                ->pluck('resource_id')
                ->toArray();
        }

        return Inertia::render('Courses/Index', [
            'resources' => $resources,
            'levels' => $levels,
            'allModules' => $allModules,
            'filters' => [
                'search' => $search,
                'level' => $levelSlug,
                'semester' => $semesterSlug,
                'module' => $moduleSlug,
                'type' => $type,
            ],
            'userBookmarks' => $userBookmarks,
        ]);
    }

    public function showLevel(string $slug): Response
    {
        $level = AcademicLevel::where('slug', $slug)
            ->with(['semesters.modules' => function ($q) {
                $q->withCount('resources');
            }])
            ->firstOrFail();

        $allLevels = AcademicLevel::orderBy('order')->get();

        $totalResources = Resource::where('academic_level_id', $level->id)
            ->where('is_published', true)
            ->count();

        $featuredInLevel = Resource::with(['module', 'semester'])
            ->where('academic_level_id', $level->id)
            ->where('is_published', true)
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('Courses/Level', [
            'level' => $level,
            'allLevels' => $allLevels,
            'totalResources' => $totalResources,
            'featuredInLevel' => $featuredInLevel,
        ]);
    }

    public function showSemester(string $slug): Response
    {
        $semester = Semester::where('slug', $slug)
            ->with(['academicLevel', 'modules.resources' => function ($q) {
                $q->where('is_published', true)->latest();
            }])
            ->firstOrFail();

        return Inertia::render('Courses/Semester', [
            'semester' => $semester,
        ]);
    }

    public function showModule(string $slug): Response
    {
        $module = CourseModule::where('slug', $slug)
            ->with(['semester.academicLevel'])
            ->firstOrFail();

        $resources = Resource::where('module_id', $module->id)
            ->where('is_published', true)
            ->latest()
            ->get()
            ->groupBy('type');

        $relatedModules = CourseModule::where('semester_id', $module->semester_id)
            ->where('id', '!=', $module->id)
            ->take(5)
            ->get();

        $userBookmarks = [];
        if (Auth::check()) {
            $userBookmarks = UserBookmark::where('user_id', Auth::id())
                ->pluck('resource_id')
                ->toArray();
        }

        return Inertia::render('Courses/Module', [
            'module' => $module,
            'resourcesGrouped' => $resources,
            'relatedModules' => $relatedModules,
            'userBookmarks' => $userBookmarks,
        ]);
    }

    public function showResource(string $slug): Response
    {
        $resource = Resource::where('slug', $slug)
            ->with(['module.semester.academicLevel', 'user'])
            ->firstOrFail();

        $resource->increment('views_count');

        $relatedResources = Resource::where('module_id', $resource->module_id)
            ->where('id', '!=', $resource->id)
            ->where('is_published', true)
            ->take(4)
            ->get();

        $isBookmarked = false;
        $isCompleted = false;

        if (Auth::check()) {
            $userId = Auth::id();
            $isBookmarked = UserBookmark::where('user_id', $userId)
                ->where('resource_id', $resource->id)
                ->exists();

            $progress = UserProgress::firstOrCreate(
                ['user_id' => $userId, 'resource_id' => $resource->id],
                ['last_accessed_at' => now()]
            );
            $progress->update(['last_accessed_at' => now()]);
            $isCompleted = (bool) $progress->is_completed;
        }

        return Inertia::render('Courses/Show', [
            'resource' => $resource,
            'relatedResources' => $relatedResources,
            'isBookmarked' => $isBookmarked,
            'isCompleted' => $isCompleted,
        ]);
    }

    public function download(int $id)
    {
        $resource = Resource::findOrFail($id);
        $resource->increment('downloads_count');

        if ($resource->external_url && ! $resource->file_path) {
            return redirect()->away($resource->external_url);
        }

        $fullPath = base_path($resource->file_path);

        if (! File::exists($fullPath)) {
            return back()->with('error', 'Le fichier demandé est introuvable.');
        }

        return FacadeResponse::download($fullPath, basename($fullPath));
    }

    public function preview(int $id)
    {
        $resource = Resource::findOrFail($id);
        $resource->increment('views_count');

        $fullPath = base_path($resource->file_path);

        if (! File::exists($fullPath)) {
            return back()->with('error', 'Le fichier demandé est introuvable.');
        }

        $mimeType = File::mimeType($fullPath);

        return FacadeResponse::file($fullPath, [
            'Content-Type' => $mimeType,
            'Content-Disposition' => 'inline; filename="'.basename($fullPath).'"',
        ]);
    }

    public function toggleBookmark(Request $request, int $id)
    {
        $userId = Auth::id();
        $bookmark = UserBookmark::where('user_id', $userId)
            ->where('resource_id', $id)
            ->first();

        if ($bookmark) {
            $bookmark->delete();
            $bookmarked = false;
        } else {
            UserBookmark::create([
                'user_id' => $userId,
                'resource_id' => $id,
            ]);
            $bookmarked = true;
        }

        return back()->with('success', $bookmarked ? 'Ajouté à vos favoris.' : 'Retiré de vos favoris.');
    }

    public function toggleComplete(Request $request, int $id)
    {
        $userId = Auth::id();
        $progress = UserProgress::firstOrNew([
            'user_id' => $userId,
            'resource_id' => $id,
        ]);

        $progress->is_completed = ! $progress->is_completed;
        $progress->last_accessed_at = now();
        $progress->save();

        return back()->with('success', $progress->is_completed ? 'Marqué comme terminé.' : 'Marqué comme à reprendre.');
    }
}

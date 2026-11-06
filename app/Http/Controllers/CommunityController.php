<?php

namespace App\Http\Controllers;

use App\Models\CommunityComment;
use App\Models\CommunityPost;
use App\Models\CourseModule;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CommunityController extends Controller
{
    public function index(Request $request): Response
    {
        $category = $request->input('category');
        $moduleSlug = $request->input('module');
        $search = $request->input('search');
        $filter = $request->input('filter', 'latest'); // latest, popular, solved, unsolved

        $query = CommunityPost::with(['user', 'module'])
            ->withCount('comments');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        if ($moduleSlug) {
            $query->whereHas('module', function ($q) use ($moduleSlug) {
                $q->where('slug', $moduleSlug);
            });
        }

        if ($filter === 'solved') {
            $query->where('is_solved', true);
        } elseif ($filter === 'unsolved') {
            $query->where('is_solved', false);
        } elseif ($filter === 'popular') {
            $query->orderByDesc('views_count')->orderByDesc('likes_count');
        } else {
            $query->latest();
        }

        $posts = $query->paginate(15)->withQueryString();
        $modules = CourseModule::orderBy('name')->get();

        $stats = [
            'total_posts' => CommunityPost::count(),
            'solved_posts' => CommunityPost::where('is_solved', true)->count(),
            'total_comments' => CommunityComment::count(),
        ];

        return Inertia::render('Community/Index', [
            'posts' => $posts,
            'modules' => $modules,
            'stats' => $stats,
            'filters' => [
                'category' => $category,
                'module' => $moduleSlug,
                'search' => $search,
                'filter' => $filter,
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $post = CommunityPost::where('slug', $slug)
            ->with(['user', 'module', 'comments.user', 'comments.replies.user'])
            ->firstOrFail();

        $post->increment('views_count');

        $relatedPosts = CommunityPost::where('id', '!=', $post->id)
            ->where(function ($q) use ($post) {
                $q->where('category', $post->category)
                    ->orWhere('module_id', $post->module_id);
            })
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('Community/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:10',
            'category' => 'required|string|in:entraide,question_cours,projet,astuce,annonce',
            'module_id' => 'nullable|exists:modules,id',
            'author_name' => 'nullable|string|max:100',
        ]);

        $slug = Str::slug($validated['title']).'-'.Str::random(5);
        $userId = Auth::id() ?? User::where('role', 'student')->first()?->id ?? 1;

        $post = CommunityPost::create([
            'user_id' => $userId,
            'module_id' => $validated['module_id'] ?? null,
            'title' => $validated['title'],
            'slug' => $slug,
            'content' => $validated['content'],
            'category' => $validated['category'],
        ]);

        if (Auth::check()) {
            Auth::user()->increment('points', 10);
        }

        return redirect()->route('community.show', $post->slug)
            ->with('success', 'Votre sujet a été publié avec succès sur le forum !');
    }

    public function storeComment(Request $request, int $postId)
    {
        $validated = $request->validate([
            'content' => 'required|string|min:3',
            'parent_id' => 'nullable|exists:community_comments,id',
            'author_name' => 'nullable|string|max:100',
        ]);

        $post = CommunityPost::findOrFail($postId);
        $userId = Auth::id() ?? User::where('role', 'student')->first()?->id ?? 1;

        CommunityComment::create([
            'community_post_id' => $post->id,
            'user_id' => $userId,
            'parent_id' => $validated['parent_id'] ?? null,
            'content' => $validated['content'],
        ]);

        if (Auth::check()) {
            Auth::user()->increment('points', 5);
        }

        return back()->with('success', 'Votre réponse a été ajoutée avec succès !');
    }

    public function toggleLike(Request $request, int $id)
    {
        $post = CommunityPost::findOrFail($id);
        $post->increment('likes_count');

        return back()->with('success', 'Merci pour votre vote !');
    }

    public function markSolution(Request $request, int $commentId)
    {
        $comment = CommunityComment::with('post')->findOrFail($commentId);
        $post = $comment->post;

        if (Auth::id() !== $post->user_id && ! Auth::user()->isAdmin()) {
            return back()->with('error', 'Vous n\'êtes pas autorisé à marquer cette solution.');
        }

        // Unmark previous solution
        CommunityComment::where('community_post_id', $post->id)->update(['is_solution' => false]);

        $comment->update(['is_solution' => true]);
        $post->update(['is_solved' => true]);

        // Reward comment author
        $comment->user->increment('points', 25);

        return back()->with('success', 'Cette réponse a été validée comme solution (+25 points accordés à l\'auteur) !');
    }
}

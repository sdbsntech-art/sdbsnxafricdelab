<?php

namespace App\Http\Controllers;

use App\Models\AcademicLevel;
use App\Models\CommunityPost;
use App\Models\ContactMessage;
use App\Models\CourseModule;
use App\Models\Opportunity;
use App\Models\Resource;
use App\Models\Semester;
use App\Models\SiteAlert;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    private function checkAdmin(): void
    {
        if (! Auth::check() || ! Auth::user()->isAdmin()) {
            abort(403, 'Accès réservé aux administrateurs SDBSNX.');
        }
    }

    /**
     * Tableau de bord principal avec statistiques réelles et vérifiées (sans simulation).
     */
    public function dashboard(): Response
    {
        $this->checkAdmin();

        $stats = [
            'total_resources' => Resource::count(),
            'total_downloads' => Resource::sum('downloads_count'),
            'total_views' => Resource::sum('views_count'),
            'total_modules' => CourseModule::count(),
            'total_users' => User::count(),
            'total_posts' => CommunityPost::count(),
            'total_opportunities' => Opportunity::count(),
            'total_messages' => ContactMessage::count(),
            'total_cyber' => Resource::where(function ($q) {
                $q->where('type', 'cybersecurity')
                    ->orWhereHas('module', function ($m) {
                        $m->where('code', 'SEC501')
                            ->orWhere('code', 'CRY501')
                            ->orWhere('slug', 'like', '%cyber%')
                            ->orWhere('slug', 'like', '%securite%');
                    });
            })->count(),
            'total_library' => Resource::where('type', 'summary')->count(),
            'total_entrepreneurship' => Resource::whereHas('module', function ($m) {
                $m->where('code', 'ENT601')
                    ->orWhere('slug', 'like', '%entrepreneuriat%');
            })->count(),
        ];

        $latestUsers = User::latest()->take(6)->get();
        $recentResources = Resource::with(['module', 'academicLevel'])->latest()->take(8)->get();
        $popularResources = Resource::with(['module'])->where('downloads_count', '>', 0)->orderByDesc('downloads_count')->take(5)->get();
        $latestMessages = ContactMessage::latest()->take(6)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'latestUsers' => $latestUsers,
            'recentResources' => $recentResources,
            'popularResources' => $popularResources,
            'latestMessages' => $latestMessages,
        ]);
    }

    /**
     * Gestion des Ressources Pédagogiques (Licence 1, Licence 2, Licence 3).
     */
    public function resources(Request $request): Response
    {
        $this->checkAdmin();

        $search = $request->input('search');
        $levelId = $request->input('level');
        $type = $request->input('type');

        $query = Resource::with(['module', 'academicLevel', 'semester']);

        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }
        if ($levelId) {
            $query->where('academic_level_id', $levelId);
        }
        if ($type) {
            $query->where('type', $type);
        }

        $resources = $query->latest()->paginate(20)->withQueryString();
        $levels = AcademicLevel::with('semesters.modules')->get();
        $modules = CourseModule::orderBy('name')->get();

        return Inertia::render('Admin/Resources', [
            'resources' => $resources,
            'levels' => $levels,
            'modules' => $modules,
            'filters' => ['search' => $search, 'level' => $levelId, 'type' => $type],
        ]);
    }

    public function storeResource(Request $request)
    {
        $this->checkAdmin();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'module_id' => 'required|exists:modules,id',
            'academic_level_id' => 'required|exists:academic_levels,id',
            'semester_id' => 'required|exists:semesters,id',
            'type' => 'required|in:course,td,exercise,project,exam,video,summary',
            'description' => 'nullable|string',
            'external_url' => 'nullable|url',
            'file_type' => 'nullable|string',
            'file' => 'nullable|file|max:51200|mimes:pdf,doc,docx,ppt,pptx,zip,rar,mp4,odt,txt',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $slug = Str::slug($validated['title']).'-'.Str::random(5);

        $filePath = null;
        $fileSizeFormatted = null;
        $fileType = $validated['file_type'] ?? 'pdf';

        if ($request->hasFile('file')) {
            $uploadedFile = $request->file('file');
            $extension = strtolower($uploadedFile->getClientOriginalExtension());
            $filePath = $uploadedFile->store('resources', 'public');
            $fileType = $extension;

            $bytes = $uploadedFile->getSize();
            if ($bytes >= 1048576) {
                $fileSizeFormatted = round($bytes / 1048576, 1).' Mo';
            } elseif ($bytes >= 1024) {
                $fileSizeFormatted = round($bytes / 1024, 1).' Ko';
            } else {
                $fileSizeFormatted = $bytes.' B';
            }
        }

        Resource::create([
            'module_id' => $validated['module_id'],
            'academic_level_id' => $validated['academic_level_id'],
            'semester_id' => $validated['semester_id'],
            'type' => $validated['type'],
            'title' => $validated['title'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'file_path' => $filePath,
            'file_size_formatted' => $fileSizeFormatted,
            'external_url' => $validated['external_url'] ?? null,
            'file_type' => $fileType,
            'is_published' => $validated['is_published'] ?? true,
            'is_featured' => $validated['is_featured'] ?? false,
            'user_id' => Auth::id(),
            'downloads_count' => 0,
            'views_count' => 0,
        ]);

        return back()->with('success', 'Ressource ajoutée avec succès.');
    }

    public function toggleResourceStatus(int $id)
    {
        $this->checkAdmin();

        $resource = Resource::findOrFail($id);
        $resource->is_published = ! $resource->is_published;
        $resource->save();

        return back()->with('success', 'Statut de publication mis à jour.');
    }

    public function toggleResourceFeatured(int $id)
    {
        $this->checkAdmin();

        $resource = Resource::findOrFail($id);
        $resource->is_featured = ! $resource->is_featured;
        $resource->save();

        return back()->with('success', 'Mise en avant mise à jour.');
    }

    public function destroyResource(int $id)
    {
        $this->checkAdmin();

        $resource = Resource::findOrFail($id);
        $resource->delete();

        return back()->with('success', 'Ressource supprimée avec succès.');
    }

    /**
     * Gestion des Modules & Matières de cours.
     */
    public function modules(Request $request): Response
    {
        $this->checkAdmin();

        $search = $request->input('search');
        $levelId = $request->input('level');

        $query = CourseModule::with(['semester.academicLevel'])->withCount('resources');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%");
            });
        }

        if ($levelId) {
            $query->whereHas('semester', function ($s) use ($levelId) {
                $s->where('academic_level_id', $levelId);
            });
        }

        $modules = $query->paginate(25)->withQueryString();
        $levels = AcademicLevel::with('semesters')->get();
        $semesters = Semester::orderBy('semester_number')->get();

        return Inertia::render('Admin/Modules', [
            'modules' => $modules,
            'levels' => $levels,
            'semesters' => $semesters,
            'filters' => ['search' => $search, 'level' => $levelId],
        ]);
    }

    public function storeModule(Request $request)
    {
        $this->checkAdmin();

        $validated = $request->validate([
            'semester_id' => 'required|exists:semesters,id',
            'name' => 'required|string|max:200',
            'code' => 'required|string|max:50|unique:modules,code',
            'description' => 'nullable|string',
            'credits' => 'required|integer|min:1|max:10',
            'coefficient' => 'required|integer|min:1|max:10',
            'icon' => 'nullable|string',
        ]);

        CourseModule::create([
            ...$validated,
            'slug' => Str::slug($validated['name']),
            'hours' => 30,
            'color' => 'emerald',
            'icon' => $validated['icon'] ?? 'BookOpen',
        ]);

        return back()->with('success', 'Nouveau module pédagogique créé avec succès.');
    }

    public function destroyModule(int $id)
    {
        $this->checkAdmin();

        $module = CourseModule::findOrFail($id);
        $module->delete();

        return back()->with('success', 'Module supprimé avec succès.');
    }

    /**
     * Gestion et publication des cours de Cybersécurité.
     */
    public function cybersecurity(Request $request): Response
    {
        $this->checkAdmin();

        $search = $request->input('search');

        $query = Resource::with(['module', 'academicLevel', 'semester'])
            ->where(function ($q) {
                $q->where('type', 'cybersecurity')
                    ->orWhereHas('module', function ($m) {
                        $m->where('code', 'SEC501')
                            ->orWhere('code', 'CRY501')
                            ->orWhere('slug', 'like', '%cyber%')
                            ->orWhere('slug', 'like', '%securite%');
                    });
            });

        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        $resources = $query->latest()->paginate(20)->withQueryString();
        $cyberModules = CourseModule::where('code', 'SEC501')
            ->orWhere('code', 'CRY501')
            ->orWhere('slug', 'like', '%cyber%')
            ->orWhere('slug', 'like', '%securite%')
            ->get();

        $levels = AcademicLevel::with('semesters')->get();

        return Inertia::render('Admin/Cybersecurity', [
            'resources' => $resources,
            'cyberModules' => $cyberModules,
            'levels' => $levels,
            'filters' => ['search' => $search],
        ]);
    }

    public function storeCyberResource(Request $request)
    {
        $this->checkAdmin();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'module_id' => 'required|exists:modules,id',
            'type' => 'required|in:course,td,exercise,project,exam,video',
            'description' => 'nullable|string',
            'external_url' => 'nullable|url',
            'file_type' => 'nullable|string',
            'file' => 'nullable|file|max:51200|mimes:pdf,doc,docx,ppt,pptx,zip,rar,mp4,odt,txt',
            'is_published' => 'boolean',
        ]);

        $module = CourseModule::with('semester.academicLevel')->findOrFail($validated['module_id']);
        $slug = Str::slug($validated['title']).'-'.Str::random(5);

        $filePath = null;
        $fileSizeFormatted = null;
        $fileType = $validated['file_type'] ?? 'pdf';

        if ($request->hasFile('file')) {
            $uploadedFile = $request->file('file');
            $extension = strtolower($uploadedFile->getClientOriginalExtension());
            $filePath = $uploadedFile->store('cybersecurity', 'public');
            $fileType = $extension;

            $bytes = $uploadedFile->getSize();
            if ($bytes >= 1048576) {
                $fileSizeFormatted = round($bytes / 1048576, 1).' Mo';
            } elseif ($bytes >= 1024) {
                $fileSizeFormatted = round($bytes / 1024, 1).' Ko';
            } else {
                $fileSizeFormatted = $bytes.' B';
            }
        }

        Resource::create([
            'module_id' => $module->id,
            'academic_level_id' => $module->semester->academic_level_id,
            'semester_id' => $module->semester_id,
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'slug' => $slug,
            'type' => $validated['type'],
            'description' => $validated['description'] ?? null,
            'file_path' => $filePath,
            'file_size_formatted' => $fileSizeFormatted,
            'external_url' => $validated['external_url'] ?? null,
            'file_type' => $fileType,
            'is_published' => $validated['is_published'] ?? true,
            'downloads_count' => 0,
            'views_count' => 0,
        ]);

        return back()->with('success', 'Ressource de Cybersécurité publiée avec succès.');
    }

    /**
     * Gestion et publication des documents d'Entrepreneuriat.
     */
    public function entrepreneurship(Request $request): Response
    {
        $this->checkAdmin();

        $search = $request->input('search');

        $query = Resource::with(['module', 'academicLevel', 'semester'])
            ->whereHas('module', function ($m) {
                $m->where('code', 'ENT601')
                    ->orWhere('slug', 'like', '%entrepreneuriat%');
            });

        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        $resources = $query->latest()->paginate(20)->withQueryString();
        $entModules = CourseModule::where('code', 'ENT601')
            ->orWhere('slug', 'like', '%entrepreneuriat%')
            ->get();

        return Inertia::render('Admin/Entrepreneurship', [
            'resources' => $resources,
            'entModules' => $entModules,
            'filters' => ['search' => $search],
        ]);
    }

    public function storeEntrepreneurshipResource(Request $request)
    {
        $this->checkAdmin();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'module_id' => 'required|exists:modules,id',
            'type' => 'required|in:course,project,summary',
            'description' => 'nullable|string',
            'external_url' => 'nullable|url',
            'file_type' => 'nullable|string',
            'file' => 'nullable|file|max:51200|mimes:pdf,doc,docx,ppt,pptx,zip,rar,mp4,odt,txt',
            'is_published' => 'boolean',
        ]);

        $module = CourseModule::with('semester.academicLevel')->findOrFail($validated['module_id']);
        $slug = Str::slug($validated['title']).'-'.Str::random(5);

        $filePath = null;
        $fileSizeFormatted = null;
        $fileType = $validated['file_type'] ?? 'pdf';

        if ($request->hasFile('file')) {
            $uploadedFile = $request->file('file');
            $extension = strtolower($uploadedFile->getClientOriginalExtension());
            $filePath = $uploadedFile->store('entrepreneurship', 'public');
            $fileType = $extension;

            $bytes = $uploadedFile->getSize();
            if ($bytes >= 1048576) {
                $fileSizeFormatted = round($bytes / 1048576, 1).' Mo';
            } elseif ($bytes >= 1024) {
                $fileSizeFormatted = round($bytes / 1024, 1).' Ko';
            } else {
                $fileSizeFormatted = $bytes.' B';
            }
        }

        Resource::create([
            'module_id' => $module->id,
            'academic_level_id' => $module->semester->academic_level_id,
            'semester_id' => $module->semester_id,
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'slug' => $slug,
            'type' => $validated['type'],
            'description' => $validated['description'] ?? null,
            'file_path' => $filePath,
            'file_size_formatted' => $fileSizeFormatted,
            'external_url' => $validated['external_url'] ?? null,
            'file_type' => $fileType,
            'is_published' => $validated['is_published'] ?? true,
            'downloads_count' => 0,
            'views_count' => 0,
        ]);

        return back()->with('success', 'Document Entrepreneuriat publié avec succès.');
    }

    /**
     * Gestion et publication des livres & synthèses de la Bibliothèque.
     */
    public function library(Request $request): Response
    {
        $this->checkAdmin();

        $search = $request->input('search');

        $query = Resource::with(['module', 'academicLevel', 'semester'])
            ->where('type', 'summary');

        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        $resources = $query->latest()->paginate(20)->withQueryString();
        $modules = CourseModule::orderBy('name')->get();
        $levels = AcademicLevel::with('semesters')->get();

        return Inertia::render('Admin/Library', [
            'resources' => $resources,
            'modules' => $modules,
            'levels' => $levels,
            'filters' => ['search' => $search],
        ]);
    }

    public function storeLibraryResource(Request $request)
    {
        $this->checkAdmin();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'module_id' => 'required|exists:modules,id',
            'description' => 'nullable|string',
            'external_url' => 'nullable|url',
            'file_type' => 'nullable|string',
            'file' => 'nullable|file|max:51200|mimes:pdf,epub,doc,docx,ppt,pptx,zip,rar,txt',
            'is_published' => 'boolean',
        ]);

        $module = CourseModule::with('semester.academicLevel')->findOrFail($validated['module_id']);
        $slug = Str::slug($validated['title']).'-'.Str::random(5);

        $filePath = null;
        $fileSizeFormatted = null;
        $fileType = $validated['file_type'] ?? 'pdf';

        if ($request->hasFile('file')) {
            $uploadedFile = $request->file('file');
            $extension = strtolower($uploadedFile->getClientOriginalExtension());
            $filePath = $uploadedFile->store('library', 'public');
            $fileType = $extension;

            $bytes = $uploadedFile->getSize();
            if ($bytes >= 1048576) {
                $fileSizeFormatted = round($bytes / 1048576, 1).' Mo';
            } elseif ($bytes >= 1024) {
                $fileSizeFormatted = round($bytes / 1024, 1).' Ko';
            } else {
                $fileSizeFormatted = $bytes.' B';
            }
        }

        Resource::create([
            'module_id' => $module->id,
            'academic_level_id' => $module->semester->academic_level_id,
            'semester_id' => $module->semester_id,
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'slug' => $slug,
            'type' => 'summary',
            'description' => $validated['description'] ?? null,
            'file_path' => $filePath,
            'file_size_formatted' => $fileSizeFormatted,
            'external_url' => $validated['external_url'] ?? null,
            'file_type' => $fileType,
            'is_published' => $validated['is_published'] ?? true,
            'downloads_count' => 0,
            'views_count' => 0,
        ]);

        return back()->with('success', 'Ouvrage de bibliothèque ajouté avec succès.');
    }

    /**
     * Gestion et publication des Opportunités (Stages, Bourses, Concours, Certifications).
     */
    public function opportunities(Request $request): Response
    {
        $this->checkAdmin();

        $search = $request->input('search');
        $type = $request->input('type');

        $query = Opportunity::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('organization', 'like', "%{$search}%");
            });
        }

        if ($type) {
            $query->where('type', $type);
        }

        $opportunities = $query->latest()->paginate(20)->withQueryString();

        return Inertia::render('Admin/Opportunities', [
            'opportunities' => $opportunities,
            'filters' => ['search' => $search, 'type' => $type],
        ]);
    }

    public function storeOpportunity(Request $request)
    {
        $this->checkAdmin();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:stage,bourse,concours,certification,formation,hackathon',
            'organization' => 'nullable|string|max:150',
            'location' => 'nullable|string|max:150',
            'deadline' => 'nullable|date',
            'apply_url' => 'nullable|url',
            'description' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $slug = Str::slug($validated['title']).'-'.Str::random(5);

        Opportunity::create([
            ...$validated,
            'slug' => $slug,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return back()->with('success', 'Opportunité publiée avec succès.');
    }

    public function toggleOpportunityStatus(int $id)
    {
        $this->checkAdmin();

        $opp = Opportunity::findOrFail($id);
        $opp->is_active = ! $opp->is_active;
        $opp->save();

        return back()->with('success', 'Statut de l\'opportunité mis à jour.');
    }

    public function destroyOpportunity(int $id)
    {
        $this->checkAdmin();

        $opp = Opportunity::findOrFail($id);
        $opp->delete();

        return back()->with('success', 'Opportunité supprimée avec succès.');
    }

    /**
     * Consultation des messages et suggestions reçus (MySQL).
     */
    public function messages(Request $request): Response
    {
        $this->checkAdmin();

        $search = $request->input('search');
        $type = $request->input('type');

        $query = ContactMessage::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%");
            });
        }

        if ($type) {
            $query->where('type', $type);
        }

        $messages = $query->latest()->paginate(25)->withQueryString();

        return Inertia::render('Admin/Messages', [
            'messages' => $messages,
            'filters' => ['search' => $search, 'type' => $type],
        ]);
    }

    public function toggleMessageRead(int $id)
    {
        $this->checkAdmin();

        $message = ContactMessage::findOrFail($id);
        $message->is_read = ! $message->is_read;
        $message->save();

        return back()->with('success', 'Statut du message mis à jour.');
    }

    public function destroyMessage(int $id)
    {
        $this->checkAdmin();

        $message = ContactMessage::findOrFail($id);
        $message->delete();

        return back()->with('success', 'Message supprimé avec succès.');
    }

    /**
     * Gestion des utilisateurs et de leurs rôles.
     */
    public function users(): Response
    {
        $this->checkAdmin();

        $users = User::latest()->paginate(25);

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function updateUserRole(Request $request, int $id)
    {
        $this->checkAdmin();

        $validated = $request->validate([
            'role' => 'required|in:student,moderator,admin',
        ]);

        $user = User::findOrFail($id);
        $user->update(['role' => $validated['role']]);

        return back()->with('success', 'Rôle de l\'utilisateur mis à jour.');
    }

    public function destroyUser(int $id)
    {
        $this->checkAdmin();

        if (Auth::id() === $id) {
            return back()->with('error', 'Vous ne pouvez pas supprimer votre propre compte administrateur.');
        }

        $user = User::findOrFail($id);
        $user->delete();

        return back()->with('success', 'Utilisateur supprimé avec succès.');
    }

    /**
     * Modification du mot de passe d'un utilisateur par l'administrateur.
     */
    public function updateUserPassword(Request $request, int $id)
    {
        $this->checkAdmin();

        $validated = $request->validate([
            'password' => ['required', 'string', 'min:6'],
        ]);

        $user = User::findOrFail($id);
        $user->password = Hash::make($validated['password']);
        $user->save();

        return back()->with('success', "Le mot de passe de {$user->name} a été mis à jour avec succès.");
    }

    /**
     * Mise à jour du profil personnel de l'administrateur (Photo de profil & Infos).
     */
    public function updateAdminProfile(Request $request)
    {
        $this->checkAdmin();

        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,'.$user->id,
            'bio' => 'nullable|string|max:500',
            'password' => 'nullable|string|min:6',
            'avatar' => 'nullable|image|max:5120|mimes:jpg,jpeg,png,webp,svg',
        ]);

        $dataToUpdate = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'bio' => $validated['bio'] ?? null,
        ];

        if (! empty($validated['password'])) {
            $dataToUpdate['password'] = Hash::make($validated['password']);
        }

        if ($request->hasFile('avatar')) {
            $avatarFile = $request->file('avatar');
            $avatarPath = $avatarFile->store('avatars', 'public');
            $dataToUpdate['avatar'] = '/storage/'.$avatarPath;
        }

        $user->update($dataToUpdate);

        return back()->with('success', 'Votre profil administrateur et votre photo ont été mis à jour avec succès.');
    }

    /**
     * Gestion et diffusion des alertes et messages d'information.
     */
    public function alerts(): Response
    {
        $this->checkAdmin();

        $alerts = SiteAlert::latest()->paginate(20);

        return Inertia::render('Admin/Alerts', [
            'alerts' => $alerts,
        ]);
    }

    public function storeAlert(Request $request)
    {
        $this->checkAdmin();

        $validated = $request->validate([
            'title' => 'nullable|string|max:200',
            'message' => 'required|string|max:1000',
            'type' => 'required|in:info,warning,danger,success,urgent',
            'action_text' => 'nullable|string|max:100',
            'action_url' => 'nullable|string|max:255',
            'is_blinking' => 'boolean',
            'expires_at' => 'nullable|date',
        ]);

        SiteAlert::create([
            ...$validated,
            'is_active' => true,
        ]);

        return back()->with('success', 'Alerte publiée et diffusée en direct.');
    }

    public function toggleAlertStatus(int $id)
    {
        $this->checkAdmin();

        $alert = SiteAlert::findOrFail($id);
        $alert->is_active = ! $alert->is_active;
        $alert->save();

        return back()->with('success', 'Statut de l\'alerte mis à jour.');
    }

    public function destroyAlert(int $id)
    {
        $this->checkAdmin();

        $alert = SiteAlert::findOrFail($id);
        $alert->delete();

        return back()->with('success', 'Alerte supprimée.');
    }
}

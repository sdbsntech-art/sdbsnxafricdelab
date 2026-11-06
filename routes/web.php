<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnnexController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\OpportunityController;
use Illuminate\Support\Facades\Route;

// Public Home
Route::get('/', [HomeController::class, 'index'])->name('home');

// Direct shortcuts matching sdbsnx.vercel.app navigation
Route::get('/cours/licence-1', fn () => app(CourseController::class)->showLevel('licence-1'))->name('courses.l1');
Route::get('/cours/licence-2', fn () => app(CourseController::class)->showLevel('licence-2'))->name('courses.l2');
Route::get('/cours/licence-3', fn () => app(CourseController::class)->showLevel('licence-3'))->name('courses.l3');

// Educational Courses
Route::prefix('cours')->name('courses.')->group(function () {
    Route::get('/', [CourseController::class, 'index'])->name('index');
    Route::get('/licence/{slug}', [CourseController::class, 'showLevel'])->name('level');
    Route::get('/semestre/{slug}', [CourseController::class, 'showSemester'])->name('semester');
    Route::get('/module/{slug}', [CourseController::class, 'showModule'])->name('module');
    Route::get('/ressource/{slug}', [CourseController::class, 'showResource'])->name('show');
    Route::get('/telecharger/{id}', [CourseController::class, 'download'])->name('download');
    Route::get('/apercu/{id}', [CourseController::class, 'preview'])->name('preview');
    Route::get('/{slug}', [CourseController::class, 'showLevel'])->where('slug', 'licence-[1-3]');
});

// Explorer Sections from sdbsnx.vercel.app
Route::get('/bibliotheque', [AnnexController::class, 'library'])->name('library');
Route::get('/videos', [AnnexController::class, 'videos'])->name('videos');
Route::get('/cybersecurite', [AnnexController::class, 'cybersecurity'])->name('cybersecurity');
Route::get('/entrepreneuriat', [OpportunityController::class, 'entrepreneurship'])->name('entrepreneurship');

// Community & Discussions (Open to all students without mandatory auth!)
Route::prefix('communaute')->name('community.')->group(function () {
    Route::get('/', [CommunityController::class, 'index'])->name('index');
    Route::get('/sujet/{slug}', [CommunityController::class, 'show'])->name('show');
    Route::post('/creer', [CommunityController::class, 'store'])->name('store');
    Route::post('/{id}/repondre', [CommunityController::class, 'storeComment'])->name('comment');
    Route::post('/{id}/like', [CommunityController::class, 'toggleLike'])->name('like');
});

// Opportunities (Bourses, Stages, Certifications)
Route::prefix('opportunites')->name('opportunities.')->group(function () {
    Route::get('/', [OpportunityController::class, 'index'])->name('index');
    Route::get('/{slug}', [OpportunityController::class, 'show'])->name('show');
});

// FAQ & Annexes
Route::get('/faq', [AnnexController::class, 'faq'])->name('faq');
Route::get('/annexes-faq', [AnnexController::class, 'index'])->name('annex.index');

// Legal & Compliance Pages (Conformité CDP Sénégal - Loi n° 2008-12)
Route::get('/mentions-legales', [LegalController::class, 'mentionsLegales'])->name('legal.mentions');
Route::get('/politique-de-confidentialite', [LegalController::class, 'confidentialite'])->name('legal.privacy');
Route::get('/confidentialite', [LegalController::class, 'confidentialite']);
Route::get('/cookies', [LegalController::class, 'cookies'])->name('legal.cookies');
Route::get('/conditions-generales-utilisation', [LegalController::class, 'cgu'])->name('legal.cgu');
Route::get('/cgu', [LegalController::class, 'cgu']);
Route::get('/a-propos', [LegalController::class, 'aPropos'])->name('legal.about');
Route::get('/contact', [LegalController::class, 'contact'])->name('legal.contact');
Route::post('/contact', [LegalController::class, 'submitContact'])->middleware('throttle:6,1')->name('legal.contact.submit');
Route::get('/contact/whatsapp-notify/{id}', [LegalController::class, 'whatsappNotify'])->middleware('throttle:10,1')->name('legal.contact.whatsapp');

// ADMINISTRATIVE PORTAL (THE ONLY SECTION REQUIRING AUTHENTICATION!)
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

    // Ressources Académiques L1, L2, L3
    Route::get('/ressources', [AdminController::class, 'resources'])->name('resources');
    Route::post('/ressources/ajouter', [AdminController::class, 'storeResource'])->name('resources.store');
    Route::post('/ressources/{id}/publier', [AdminController::class, 'toggleResourceStatus'])->name('resources.togglePublish');
    Route::post('/ressources/{id}/vedette', [AdminController::class, 'toggleResourceFeatured'])->name('resources.toggleFeatured');
    Route::delete('/ressources/{id}', [AdminController::class, 'destroyResource'])->name('resources.destroy');

    // Modules & Matières
    Route::get('/modules', [AdminController::class, 'modules'])->name('modules');
    Route::post('/modules/ajouter', [AdminController::class, 'storeModule'])->name('modules.store');
    Route::delete('/modules/{id}', [AdminController::class, 'destroyModule'])->name('modules.destroy');

    // Cybersécurité
    Route::get('/cybersecurite', [AdminController::class, 'cybersecurity'])->name('cybersecurity');
    Route::post('/cybersecurite/ajouter', [AdminController::class, 'storeCyberResource'])->name('cybersecurity.store');

    // Entrepreneuriat
    Route::get('/entrepreneuriat', [AdminController::class, 'entrepreneurship'])->name('entrepreneurship');
    Route::post('/entrepreneuriat/ajouter', [AdminController::class, 'storeEntrepreneurshipResource'])->name('entrepreneurship.store');

    // Bibliothèque Numérique
    Route::get('/bibliotheque', [AdminController::class, 'library'])->name('library');
    Route::post('/bibliotheque/ajouter', [AdminController::class, 'storeLibraryResource'])->name('library.store');

    // Opportunités & Stages
    Route::get('/opportunites', [AdminController::class, 'opportunities'])->name('opportunities');
    Route::post('/opportunites/ajouter', [AdminController::class, 'storeOpportunity'])->name('opportunities.store');
    Route::post('/opportunites/{id}/statut', [AdminController::class, 'toggleOpportunityStatus'])->name('opportunities.toggle');
    Route::delete('/opportunites/{id}', [AdminController::class, 'destroyOpportunity'])->name('opportunities.destroy');

    // Messages de Contact (MySQL)
    Route::get('/messages', [AdminController::class, 'messages'])->name('messages');
    Route::post('/messages/{id}/lu', [AdminController::class, 'toggleMessageRead'])->name('messages.toggleRead');
    Route::delete('/messages/{id}', [AdminController::class, 'destroyMessage'])->name('messages.destroy');

    // Utilisateurs & Profil Administrateur
    Route::get('/utilisateurs', [AdminController::class, 'users'])->name('users');
    Route::post('/utilisateurs/{id}/role', [AdminController::class, 'updateUserRole'])->name('users.role');
    Route::post('/utilisateurs/{id}/password', [AdminController::class, 'updateUserPassword'])->name('users.password');
    Route::post('/utilisateurs/mon-profil', [AdminController::class, 'updateAdminProfile'])->name('users.profile');
    Route::delete('/utilisateurs/{id}', [AdminController::class, 'destroyUser'])->name('users.destroy');

    // Alertes & Annonces en direct
    Route::get('/alertes', [AdminController::class, 'alerts'])->name('alerts');
    Route::post('/alertes/ajouter', [AdminController::class, 'storeAlert'])->name('alerts.store');
    Route::post('/alertes/{id}/statut', [AdminController::class, 'toggleAlertStatus'])->name('alerts.toggle');
    Route::delete('/alertes/{id}', [AdminController::class, 'destroyAlert'])->name('alerts.destroy');

    Route::post('/communaute/solution/{commentId}', [CommunityController::class, 'markSolution'])->name('community.solution');
});

require __DIR__.'/auth.php';

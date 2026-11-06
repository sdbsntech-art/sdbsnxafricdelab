<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\Resource;
use App\Models\UsefulLink;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnnexController extends Controller
{
    public function index(): Response
    {
        $unchkLinks = UsefulLink::where('category', 'un_chk')->orderBy('order')->get();
        $grafikartLinks = UsefulLink::where('category', 'grafikart')->orderBy('order')->get();
        $toolsLinks = UsefulLink::where('category', 'docs_outils')->orderBy('order')->get();
        $faqs = Faq::orderBy('order')->get();

        return Inertia::render('Annex/Index', [
            'unchkLinks' => $unchkLinks,
            'grafikartLinks' => $grafikartLinks,
            'toolsLinks' => $toolsLinks,
            'faqs' => $faqs,
        ]);
    }

    public function library(Request $request): Response
    {
        $search = $request->input('search');
        // Les ressources de la bibliothèque sont distinctes des cours de licences (ouvrages, synthèses, e-books)
        $query = Resource::with(['module', 'academicLevel', 'semester'])
            ->where('is_published', true)
            ->where('type', 'summary');

        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        $resources = $query->latest()->paginate(24)->withQueryString();

        return Inertia::render('Explorer/Library', [
            'resources' => $resources,
            'search' => $search,
        ]);
    }

    public function videos(): Response
    {
        $videoLinks = UsefulLink::where('category', 'grafikart')
            ->orWhere('category', 'videos')
            ->get();

        return Inertia::render('Explorer/Videos', [
            'videoLinks' => $videoLinks,
        ]);
    }

    public function cybersecurity(): Response
    {
        // Les cours de cybersécurité ajoutés par l'administrateur
        $resources = Resource::where('is_published', true)
            ->where(function ($q) {
                $q->where('type', 'cybersecurity')
                    ->orWhereHas('module', function ($m) {
                        $m->where('code', 'CYBER-SEC')
                            ->orWhere('code', 'SEC501')
                            ->orWhere('code', 'CRY501')
                            ->orWhere('slug', 'like', '%cyber%')
                            ->orWhere('slug', 'like', '%securite%');
                    });
            })
            ->latest()
            ->get();

        return Inertia::render('Explorer/Cybersecurity', [
            'resources' => $resources,
        ]);
    }

    public function faq(): Response
    {
        $faqs = Faq::orderBy('order')->get();

        return Inertia::render('Annex/Faq', [
            'faqs' => $faqs,
        ]);
    }
}

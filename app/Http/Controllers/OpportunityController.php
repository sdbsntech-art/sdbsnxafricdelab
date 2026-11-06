<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OpportunityController extends Controller
{
    public function index(Request $request): Response
    {
        $type = $request->input('type');
        $search = $request->input('search');

        $query = Opportunity::where('is_active', true);

        if ($type) {
            $query->where('type', $type);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('organization', 'like', "%{$search}%");
            });
        }

        $opportunities = $query->latest()->paginate(12)->withQueryString();

        return Inertia::render('Opportunities/Index', [
            'opportunities' => $opportunities,
            'filters' => [
                'type' => $type,
                'search' => $search,
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $opportunity = Opportunity::where('slug', $slug)->firstOrFail();

        $relatedOpportunities = Opportunity::where('id', '!=', $opportunity->id)
            ->where('is_active', true)
            ->take(3)
            ->get();

        return Inertia::render('Opportunities/Show', [
            'opportunity' => $opportunity,
            'relatedOpportunities' => $relatedOpportunities,
        ]);
    }

    public function entrepreneurship(): Response
    {
        $opportunities = Opportunity::where('is_active', true)
            ->where(function ($q) {
                $q->where('type', 'formation')
                    ->orWhere('type', 'hackathon')
                    ->orWhere('type', 'bourse')
                    ->orWhere('type', 'concours');
            })
            ->latest()
            ->get();

        $documents = \App\Models\Resource::where('is_published', true)
            ->whereHas('module', function ($m) {
                $m->where('code', 'ENT601')
                    ->orWhere('slug', 'like', '%entrepreneuriat%');
            })
            ->latest()
            ->get();

        return Inertia::render('Explorer/Entrepreneurship', [
            'opportunities' => $opportunities,
            'documents' => $documents,
        ]);
    }
}

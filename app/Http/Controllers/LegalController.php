<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    /**
     * Mentions légales.
     */
    public function mentionsLegales(): Response
    {
        return Inertia::render('Legal/MentionsLegales');
    }

    /**
     * Politique de confidentialité (Conformité CDP Sénégal - Loi n° 2008-12).
     */
    public function confidentialite(): Response
    {
        return Inertia::render('Legal/Confidentialite');
    }

    /**
     * Politique relative aux cookies et traceurs.
     */
    public function cookies(): Response
    {
        return Inertia::render('Legal/Cookies');
    }

    /**
     * Conditions Générales d'Utilisation (CGU).
     */
    public function cgu(): Response
    {
        return Inertia::render('Legal/Cgu');
    }

    /**
     * Page À propos du projet SDBSNX.
     */
    public function aPropos(): Response
    {
        return Inertia::render('Legal/APropos');
    }

    /**
     * Page Contact et signalements.
     */
    public function contact(): Response
    {
        return Inertia::render('Legal/Contact');
    }

    /**
     * Traitement et enregistrement du formulaire de contact dans MySQL,
     * réexpédition vers Formspree et préparation de la notification WhatsApp.
     */
    public function submitContact(Request $request): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:120',
            'email' => 'required|email|max:180',
            'type' => 'required|string|in:general,donnees_personnelles,droits_auteur,bug_technique,partenariat',
            'subject' => 'required|string|max:200',
            'message' => 'required|string|max:3000',
        ]);

        // 1. Enregistrement direct et assaini dans la base de données MySQL (Protection contre injections XSS / SQL)
        $cleanName = strip_tags(trim($validated['name']));
        $cleanEmail = filter_var(trim($validated['email']), FILTER_SANITIZE_EMAIL);
        $cleanSubject = strip_tags(trim($validated['subject']));
        $cleanMessage = strip_tags(trim($validated['message']));

        $contactMessage = ContactMessage::create([
            'name' => $cleanName,
            'email' => $cleanEmail,
            'type' => $validated['type'],
            'subject' => $cleanSubject,
            'message' => $cleanMessage,
            'ip_address' => $request->ip(),
            'is_read' => false,
        ]);

        // 2. Synchronisation en arrière-plan vers Formspree
        try {
            $formspreeEndpoint = config('services.formspree.endpoint', 'https://formspree.io/f/xqapevvv');
            Http::timeout(5)->asJson()->post($formspreeEndpoint, [
                'name' => $cleanName,
                'email' => $cleanEmail,
                '_replyto' => $cleanEmail,
                'type' => $validated['type'],
                'subject' => $validated['subject'],
                'message' => $validated['message'],
                'source' => 'SDBSNX Plateforme Officielle (MySQL)',
            ]);
        } catch (\Throwable $e) {
            Log::warning('Synchronisation Formspree non bloquante : '.$e->getMessage());
        }

        $whatsappNotifyUrl = route('legal.contact.whatsapp', ['id' => $contactMessage->id]);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Votre message a bien été enregistré dans notre base de données MySQL et transmis à l’équipe SDBSNX.',
                'id' => $contactMessage->id,
                'whatsapp_notify_url' => $whatsappNotifyUrl,
            ]);
        }

        return back()->with([
            'success' => 'Votre message a bien été enregistré dans notre base de données MySQL et transmis à l’équipe SDBSNX.',
            'contact_id' => $contactMessage->id,
            'whatsapp_notify_url' => $whatsappNotifyUrl,
        ]);
    }

    /**
     * Redirection sécurisée pour notification WhatsApp en temps réel.
     * Le numéro de téléphone administratif n'est JAMAIS visible dans le code HTML du site.
     */
    public function whatsappNotify(int $id): RedirectResponse
    {
        $message = ContactMessage::findOrFail($id);

        $adminPhone = config('services.whatsapp.admin_number', '221773624539');

        $text = "🔔 *NOUVEAU MESSAGE SDBSNX (MySQL #{$message->id})*\n"
            ."👤 *De :* {$message->name}\n"
            ."📧 *Email :* {$message->email}\n"
            ."🏷️ *Type :* {$message->type}\n"
            ."📌 *Sujet :* {$message->subject}\n\n"
            ."💬 *Message :*\n{$message->message}\n\n"
            .'🕒 _Reçu le '.$message->created_at->format('d/m/Y à H:i').'_';

        $whatsappUrl = 'https://api.whatsapp.com/send?phone='.urlencode($adminPhone).'&text='.urlencode($text);

        return redirect()->away($whatsappUrl);
    }
}

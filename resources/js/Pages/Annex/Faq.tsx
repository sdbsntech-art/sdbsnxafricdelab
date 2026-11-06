import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Faq as FaqType } from '@/types';
import {
    HelpCircle,
    ChevronDown,
    BookOpen,
    MessageSquare,
    ExternalLink,
} from 'lucide-react';

interface FaqProps {
    faqs: FaqType[];
}

export default function Faq({ faqs }: FaqProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const defaultFaqs: FaqType[] = [
        {
            id: 1,
            question: "Qu'est-ce que la plateforme SDBSNX pour l'UN-CHK ?",
            answer: "SDBSNX est une plateforme académique gratuite et indépendante destinée aux étudiants en Licence Informatique (filière IDA) de l'Université Numérique Cheikh Hamidou Kane. Elle réunit tous les supports de cours, travaux dirigés, annales et vidéos pédagogiques.",
            category: "general",
            order: 1,
        },
        {
            id: 2,
            question: "L'accès aux ressources nécessite-t-il une inscription ?",
            answer: "Non, absolument aucun compte ni mot de passe n'est requis pour les étudiants. Tous les cours, TD, examens, vidéos et fiches de révision sont en accès direct, libre et 100% gratuit.",
            category: "cours",
            order: 2,
        },
        {
            id: 3,
            question: "Comment fonctionne le mode hors ligne (PWA) ?",
            answer: "SDBSNX est une Progressive Web App (PWA). Vous pouvez l'installer directement sur votre écran d'accueil sur Android, iPhone, Windows ou Mac. Les cours que vous consultez ou marquez en favoris restent disponibles sans connexion internet.",
            category: "pwa",
            order: 3,
        },
        {
            id: 4,
            question: "Quelles sont les couleurs et symboles de l'UN-CHK adoptés sur le site ?",
            answer: "La plateforme adopte les couleurs officielles de l'UN-CHK : le Bleu Royal (#0069B4), le Vert Émeraude (#00A859) et l'Orange Solaire (#F37021), ainsi que l'emblème de FORCE-N (« sa ëllëg ci xarala »).",
            category: "general",
            order: 4,
        },
    ];

    const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

    return (
        <AppLayout>
            <Head title="FAQ et conseils pour réussir en informatique | SDBSNX UN-CHK" />

            <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-unchk-blue/10 text-unchk-blue border border-unchk-blue/20 text-xs font-mono font-bold mb-3">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>AIDE & CONSEILS ÉTUDIANTS</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
                        Foire Aux Questions (FAQ)
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-xl mx-auto leading-relaxed">
                        Retrouvez toutes les réponses pour organiser vos révisions, exploiter la plateforme hors ligne et préparer vos évaluations.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {displayFaqs.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={item.id || idx}
                                className="sdbsnx-card rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 transition"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                                >
                                    <span className="font-heading font-bold text-base text-slate-900 dark:text-white">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-unchk-blue shrink-0 transition-transform duration-200 ${
                                            isOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-white/10">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}

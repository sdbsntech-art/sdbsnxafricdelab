import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Faq, UsefulLink } from '@/types';
import {
    Heart,
    ExternalLink,
    HelpCircle,
    ChevronDown,
    GraduationCap,
    BookOpen,
    Code2,
    Sparkles,
} from 'lucide-react';

interface AnnexIndexProps {
    unchkLinks: UsefulLink[];
    grafikartLinks: UsefulLink[];
    toolsLinks: UsefulLink[];
    faqs: Faq[];
}

export default function AnnexIndex({
    unchkLinks,
    grafikartLinks,
    toolsLinks,
    faqs,
}: AnnexIndexProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <AppLayout>
            <Head title="Annexes, Liens Utiles & FAQ — IDA-COURS" />

            <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                {/* Header */}
                <div>
                    <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
                        Ressources Périphériques & Documentation
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                        Annexes, Liens Institutionnels & FAQ
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
                        Retrouvez les accès directs vers les portails de l'UN-CHK, les cours recommandés de Grafikart, la boîte à outils développeur et les réponses aux questions fréquentes.
                    </p>
                </div>

                {/* UN-CHK INSTITUTIONAL LINKS */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2.5">
                        <GraduationCap className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Portails Officiels de l'UN-CHK
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {unchkLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card rounded-2xl p-6 flex flex-col justify-between group"
                            >
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                                        <span>{link.title}</span>
                                        <ExternalLink className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                        {link.description}
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                                    Ouvrir le portail →
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* GRAFIKART TRIBUTE SECTION */}
                <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                            <Heart className="w-4 h-4 fill-rose-500" />
                            <span>Pédagogie Libre & Reconnaissance</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                            Hommage & Gratitude à Grafikart
                        </h2>

                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                            La communauté IDA-COURS salue avec émotion le travail monumental de <strong>Jonathan Boyer (Grafikart)</strong>. Depuis des années, ses formations gratuites en PHP, POO, Laravel, JavaScript moderne et CSS constituent le standard d'or pour tout apprenant autodidacte francophone.
                        </p>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {grafikartLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 hover:border-rose-400 dark:hover:border-rose-500/40 transition group block"
                                >
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors flex items-center justify-between">
                                        <span>{link.title}</span>
                                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                        {link.description}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* DEVELOPER TOOLS & DOCS */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2.5">
                        <Code2 className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Boîte à Outils & Documentations Recommandées
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {toolsLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card rounded-2xl p-6 flex flex-col justify-between group"
                            >
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                                        <span>{link.title}</span>
                                        <ExternalLink className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400" />
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                        {link.description}
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                                    Consulter la documentation →
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* FAQ ACCORDION */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2.5">
                        <HelpCircle className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Foire Aux Questions (FAQ)
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq) => {
                            const isOpen = openFaq === faq.id;
                            return (
                                <div
                                    key={faq.id}
                                    className="glass-panel rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                                        className="w-full p-5 text-left flex items-center justify-between gap-4"
                                    >
                                        <span className="text-base font-bold text-slate-900 dark:text-white">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-slate-400 transition-transform ${
                                                isOpen ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : ''
                                            }`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-white/5 font-sans">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

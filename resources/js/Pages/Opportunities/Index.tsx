import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Opportunity, PaginationMeta } from '@/types';
import {
    Briefcase,
    Calendar,
    MapPin,
    ExternalLink,
    Search,
    Award,
    Sparkles,
    GraduationCap,
    Clock,
    AlertTriangle,
    Bell,
    CheckCircle2,
    Archive,
} from 'lucide-react';

interface OpportunitiesIndexProps {
    opportunities: PaginationMeta<Opportunity>;
    filters: {
        type?: string;
        search?: string;
    };
}

export default function OpportunitiesIndex({
    opportunities,
    filters,
}: OpportunitiesIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');

    const types = [
        { id: '', label: 'Toutes les opportunités' },
        { id: 'stage', label: 'Stages & Emploi' },
        { id: 'bourse', label: "Bourses d'études" },
        { id: 'certification', label: 'Certifications Pro' },
        { id: 'concours', label: 'Concours & Hackathons' },
        { id: 'formation', label: 'Formations Spécialisées' },
    ];

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/opportunites', { search: search || undefined, type: type || undefined });
    };

    // Date calculations for classification
    const today = new Date().toISOString().split('T')[0];

    // Split opportunities into active/recent vs past/archived
    const recentOpportunities = opportunities.data.filter((opp) => {
        if (!opp.deadline) return true;
        return opp.deadline >= today;
    });

    const pastOpportunities = opportunities.data.filter((opp) => {
        if (!opp.deadline) return false;
        return opp.deadline < today;
    });

    // Detect urgent upcoming deadlines (within 10 days) for blinking alert
    const tenDaysFromNow = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const urgentOpportunities = recentOpportunities.filter(
        (opp) => opp.deadline && opp.deadline >= today && opp.deadline <= tenDaysFromNow
    );

    return (
        <AppLayout>
            <Head title="Opportunités, Bourses, Stages & Concours — SDBSNX" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header Title */}
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Insertion & Carrière Tech</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#1D3027] dark:text-white mt-1">
                        Opportunités, Bourses & Stages
                    </h1>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#849187] mt-2 max-w-2xl leading-relaxed">
                        Retrouvez les offres de stages technologiques, programmes de bourses académiques, certifications gratuites et concours ouverts pour les étudiants du Sénégal.
                    </p>
                </div>

                {/* ALERTE CLIGNOTANTE : Concours ou Certifications avec Date Limite Imminente */}
                {urgentOpportunities.length > 0 && (
                    <div className="space-y-2">
                        {urgentOpportunities.map((opp) => (
                            <div
                                key={opp.id}
                                className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/60 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md animate-pulse"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                                        <Bell className="w-5 h-5 animate-bounce" />
                                    </div>
                                    <div className="text-xs sm:text-sm">
                                        <span className="font-mono font-bold uppercase text-amber-700 dark:text-amber-300">
                                            🚨 ALERTE DATE LIMITE IMMINENTE ({opp.type.toUpperCase()}) :
                                        </span>{' '}
                                        <strong className="underline">{opp.title}</strong>
                                        <span className="block text-[11px] font-mono mt-0.5">
                                            Clôture des candidatures : <strong>{opp.deadline}</strong>
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href={`/opportunites/${opp.slug}`}
                                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs font-mono tracking-wider transition whitespace-nowrap text-center"
                                >
                                    Postuler avant clôture →
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {/* Filters & Search */}
                <div className="sdbsnx-card p-4 rounded-2xl border border-[#28372B]/12 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#1A241D]">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
                        {types.map((t) => (
                            <Link
                                key={t.id}
                                href={`/opportunites?type=${t.id}`}
                                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                                    (filters.type === t.id || (!filters.type && t.id === ''))
                                        ? 'bg-[#1E5B45] text-white shadow-xs'
                                        : 'bg-[#F7F5EF] dark:bg-[#101713] text-[#59685F] dark:text-[#C2CEC6] hover:text-[#1E5B45] dark:hover:text-[#62A87A]'
                                }`}
                            >
                                {t.label}
                            </Link>
                        ))}
                    </div>

                    <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-[#7D897F]" />
                        <input
                            type="text"
                            placeholder="Recherche entreprise, lieu..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#1D3027] dark:text-white placeholder-[#7D897F] focus:outline-none focus:ring-2 focus:ring-[#1E5B45]"
                        />
                    </form>
                </div>

                {/* ALERTE OFFICIELLE : SI VIDE */}
                {recentOpportunities.length === 0 && pastOpportunities.length === 0 && (
                    <div className="text-center py-16 px-4">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#A8743F]/10 dark:bg-[#A8743F]/15 flex items-center justify-center">
                            <Briefcase className="w-10 h-10 text-[#A8743F] dark:text-[#D5A45F]" />
                        </div>
                        <h2 className="text-2xl font-bold font-heading text-[#1D3027] dark:text-white mb-4">
                            Aucune opportunité active pour le moment
                        </h2>

                        {/* Grand encadré d'alerte demandé par l'utilisateur */}
                        <div className="max-w-xl mx-auto p-6 rounded-2xl bg-[#A8743F]/10 dark:bg-[#A8743F]/15 border-2 border-[#A8743F]/40 dark:border-[#D5A45F]/40 shadow-sm text-left">
                            <div className="flex items-center gap-2.5 text-[#A8743F] dark:text-[#D5A45F] font-bold text-sm mb-3">
                                <AlertTriangle className="w-5 h-5 shrink-0" />
                                <span className="font-heading uppercase tracking-wide">Information Importante</span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#1D3027] dark:text-[#C2CEC6] leading-relaxed">
                                <strong>Vous trouverez des opportunités (stages, bourses d'études, programmes de certification et concours tech) dès qu'elles seront disponibles et validées par l'administration.</strong>
                            </p>
                            <p className="text-[11px] text-[#59685F] dark:text-[#849187] mt-3 leading-relaxed">
                                Les offres sont vérifiées avant publication afin de garantir leur authenticité et leur adéquation avec les cursus en informatique. Revenez régulièrement consulter cette section ou activez les alertes du site.
                            </p>
                        </div>
                    </div>
                )}

                {/* RUBRIQUE 1 : ÉVÉNEMENTS & OPPORTUNITÉS EN COURS / RÉCENTS */}
                {recentOpportunities.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-[#28372B]/10 dark:border-white/10 pb-3">
                            <h2 className="text-lg font-bold font-heading text-[#1D3027] dark:text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#1E5B45] dark:text-[#62A87A]" />
                                <span>Événements & Opportunités Récents</span>
                            </h2>
                            <span className="text-xs font-mono font-bold text-[#1E5B45] dark:text-[#62A87A] bg-[#1E5B45]/10 px-2.5 py-0.5 rounded-full">
                                {recentOpportunities.length} disponible{recentOpportunities.length > 1 ? 's' : ''}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recentOpportunities.map((opp) => (
                                <div
                                    key={opp.id}
                                    className="sdbsnx-card rounded-2xl p-6 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 flex flex-col justify-between group shadow-xs hover:border-[#1E5B45]/40 transition-all"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 text-xs font-mono mb-3">
                                            <span className="px-2.5 py-0.5 rounded bg-[#1E5B45]/10 dark:bg-[#1E5B45]/15 text-[#1E5B45] dark:text-[#62A87A] border border-[#1E5B45]/20 uppercase font-bold text-[11px]">
                                                {opp.type}
                                            </span>
                                            {opp.deadline && (
                                                <span className="text-[#A8743F] dark:text-[#D5A45F] flex items-center gap-1 text-[11px] font-semibold">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>Date limite : {opp.deadline}</span>
                                                </span>
                                            )}
                                        </div>

                                        <Link href={`/opportunites/${opp.slug}`}>
                                            <h3 className="text-lg font-bold text-[#1D3027] dark:text-white group-hover:text-[#1E5B45] dark:group-hover:text-[#62A87A] transition-colors">
                                                {opp.title}
                                            </h3>
                                        </Link>

                                        <div className="flex items-center gap-4 text-xs font-mono text-[#59685F] dark:text-[#849187] mt-2">
                                            {opp.organization && <span>{opp.organization}</span>}
                                            {opp.location && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{opp.location}</span>
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] mt-3 line-clamp-3 leading-relaxed">
                                            {opp.description}
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-[#28372B]/10 dark:border-white/10 flex items-center justify-between">
                                        <Link
                                            href={`/opportunites/${opp.slug}`}
                                            className="text-xs font-semibold text-[#59685F] dark:text-[#C2CEC6] hover:text-[#1E5B45] dark:hover:text-[#62A87A]"
                                        >
                                            Consulter les détails →
                                        </Link>

                                        {opp.apply_url && (
                                            <a
                                                href={opp.apply_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white text-xs font-bold transition font-mono shadow-xs"
                                            >
                                                <span>Postuler</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* RUBRIQUE 2 : ÉVÉNEMENTS ANCIENS / PASSÉS (ARCHIVES) */}
                {pastOpportunities.length > 0 && (
                    <div className="space-y-6 pt-8 border-t border-[#28372B]/10 dark:border-white/10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold font-heading text-[#7D897F] dark:text-[#849187] flex items-center gap-2">
                                <Archive className="w-4 h-4" />
                                <span>Rubrique : Événements & Opportunités Clôturés</span>
                            </h2>
                            <span className="text-[11px] font-mono text-[#7D897F]">
                                Archives consultables à titre informatif
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-70 hover:opacity-100 transition-opacity">
                            {pastOpportunities.map((opp) => (
                                <div
                                    key={opp.id}
                                    className="sdbsnx-card rounded-2xl p-5 bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/10 dark:border-white/5 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 text-[11px] font-mono mb-2">
                                            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase">
                                                {opp.type} • Clôturé
                                            </span>
                                            {opp.deadline && (
                                                <span className="text-slate-400 line-through flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>Échéance : {opp.deadline}</span>
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-sm font-bold text-[#1D3027] dark:text-white">
                                            {opp.title}
                                        </h3>
                                        <p className="text-xs text-[#59685F] dark:text-[#849187] mt-1.5 line-clamp-2">
                                            {opp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Opportunity } from '@/types';
import {
    ChevronRight,
    Calendar,
    MapPin,
    ExternalLink,
    Building2,
    Briefcase,
} from 'lucide-react';

interface OpportunityShowProps {
    opportunity: Opportunity;
    relatedOpportunities: Opportunity[];
}

export default function OpportunityShow({ opportunity, relatedOpportunities }: OpportunityShowProps) {
    return (
        <AppLayout>
            <Head title={`${opportunity.title} — IDA-COURS`} />

            <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
                    <Link href="/" className="hover:text-slate-900 dark:hover:text-white">Accueil</Link>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                    <Link href="/opportunites" className="hover:text-slate-900 dark:hover:text-white">Opportunités</Link>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold truncate max-w-xs">{opportunity.title}</span>
                </div>

                <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/5 mb-10">
                    <div className="flex items-center justify-between gap-3 text-xs font-mono mb-4">
                        <span className="px-3 py-1 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/40 uppercase font-bold text-xs">
                            {opportunity.type}
                        </span>
                        {opportunity.deadline && (
                            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                                <span>Date limite : {opportunity.deadline}</span>
                            </span>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                        {opportunity.title}
                    </h1>

                    <div className="flex items-center gap-6 text-xs font-mono text-slate-500 dark:text-slate-400 mb-8 pb-6 border-b border-slate-200 dark:border-white/5">
                        {opportunity.organization && (
                            <div className="flex items-center gap-1.5">
                                <Building2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                                <span>{opportunity.organization}</span>
                            </div>
                        )}
                        {opportunity.location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                                <span>{opportunity.location}</span>
                            </div>
                        )}
                    </div>

                    <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line font-sans mb-10">
                        {opportunity.description}
                    </div>

                    {opportunity.apply_url && (
                        <div className="pt-6 border-t border-slate-200 dark:border-white/5 flex justify-end">
                            <a
                                href={opportunity.apply_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold font-mono inline-flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition active:scale-95"
                            >
                                <span>Postuler ou Accéder au Programme</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

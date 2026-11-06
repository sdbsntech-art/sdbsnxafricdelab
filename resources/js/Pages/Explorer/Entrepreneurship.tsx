import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ResourceCard from '@/Components/ResourceCard';
import { Opportunity, Resource } from '@/types';
import {
    Briefcase,
    Rocket,
    Compass,
    TrendingUp,
    Calendar,
    ExternalLink,
    Lightbulb,
    Target,
    FileText,
    Clock,
    Sparkles,
    AlertTriangle,
} from 'lucide-react';

interface EntrepreneurshipProps {
    opportunities: Opportunity[];
    documents?: Resource[];
}

export default function Entrepreneurship({ opportunities, documents = [] }: EntrepreneurshipProps) {
    const pillars = [
        {
            icon: Lightbulb,
            title: 'Idéation & Design Thinking',
            desc: 'Identifier les réels besoins du marché africain (fintech, agritech, edtech, santé) et prototyper rapidement une solution logicielle à fort impact.',
        },
        {
            icon: Target,
            title: 'Business Model Canvas',
            desc: 'Formaliser sa proposition de valeur, segments de clientèle, structures de coûts et flux de revenus prévisionnels pour structurer son projet.',
        },
        {
            icon: Rocket,
            title: 'Pitch & Financement Tech',
            desc: 'Maîtriser l\'art du pitch devant investisseurs, comprendre les mécanismes de levée de fonds et bénéficier du cadre du Startup Act Sénégal.',
        },
    ];

    const today = new Date().toISOString().split('T')[0];
    const recentOpportunities = opportunities.filter((opp) => !opp.deadline || opp.deadline >= today);
    const pastOpportunities = opportunities.filter((opp) => opp.deadline && opp.deadline < today);

    return (
        <AppLayout>
            <Head title="Entrepreneuriat & Startups Tech — SDBSNX" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Header */}
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8743F]/10 text-[#A8743F] dark:text-[#D5A45F] border border-[#A8743F]/20 text-xs font-mono font-bold mb-3">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>INNOVATION & ENTREPRENEURIAT NUMÉRIQUE</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#1D3027] dark:text-white">
                        Entrepreneuriat & Création Tech
                    </h1>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#849187] mt-2 max-w-2xl leading-relaxed">
                        Transformez vos compétences de développeur en projets entrepreneuriaux viables au service du Sénégal et de l'Afrique.
                    </p>
                </div>

                {/* Rubriques Pédagogiques (Maintenues en place) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pillars.map((pil, idx) => {
                        const Icon = pil.icon;
                        return (
                            <div
                                key={idx}
                                className="sdbsnx-card rounded-2xl p-6 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 space-y-3"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#A8743F]/10 text-[#A8743F] dark:text-[#D5A45F] flex items-center justify-center">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold font-heading text-[#1D3027] dark:text-white">
                                    {pil.title}
                                </h3>
                                <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                                    {pil.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Section Documents & Guides Méthodologiques */}
                <div className="space-y-4 pt-4 border-t border-[#28372B]/10 dark:border-white/10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold font-heading text-[#1D3027] dark:text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#A8743F] dark:text-[#D5A45F]" />
                            <span>Documents & Fiches Méthodologiques</span>
                        </h2>
                        {documents.length > 0 && (
                            <span className="text-xs font-mono font-bold text-[#A8743F] bg-[#A8743F]/10 px-2.5 py-0.5 rounded-full">
                                {documents.length} document{documents.length > 1 ? 's' : ''}
                            </span>
                        )}
                    </div>

                    {documents.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {documents.map((doc) => (
                                <ResourceCard key={doc.id} resource={doc} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 px-4 rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#A8743F]/10 text-[#A8743F] dark:text-[#D5A45F] flex items-center justify-center">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1D3027] dark:text-white mb-1">
                                Guides et modèles en cours de mise en ligne
                            </h3>
                            <p className="text-xs text-[#59685F] dark:text-[#849187] max-w-md mx-auto leading-relaxed">
                                Les templates de Business Plan, grilles de Lean Canvas et guides de subvention pour startups sénégalaises seront mis à disposition prochainement par l'administrateur.
                            </p>
                        </div>
                    )}
                </div>

                {/* Section Programmes, Bourses & Challenges */}
                <div className="space-y-6 pt-4 border-t border-[#28372B]/10 dark:border-white/10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold font-heading text-[#1D3027] dark:text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[#A8743F] dark:text-[#D5A45F]" />
                            <span>Programmes, Bourses & Challenges Actifs</span>
                        </h2>
                        {recentOpportunities.length > 0 && (
                            <span className="text-xs font-mono font-bold text-[#A8743F] bg-[#A8743F]/10 px-2.5 py-0.5 rounded-full">
                                {recentOpportunities.length} en cours
                            </span>
                        )}
                    </div>

                    {recentOpportunities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recentOpportunities.map((opp) => (
                                <div
                                    key={opp.id}
                                    className="sdbsnx-card rounded-2xl p-6 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between text-xs font-mono text-[#A8743F] dark:text-[#D5A45F] mb-2">
                                            <span className="uppercase font-bold">{opp.type}</span>
                                            {opp.deadline && (
                                                <span className="text-[#59685F] dark:text-[#849187] flex items-center gap-1 font-semibold">
                                                    <Calendar className="w-3.5 h-3.5" /> Date limite : {opp.deadline}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-base font-bold text-[#1D3027] dark:text-white">
                                            {opp.title}
                                        </h3>
                                        <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] mt-2 leading-relaxed">
                                            {opp.description}
                                        </p>
                                    </div>

                                    {opp.apply_url && (
                                        <div className="mt-5 pt-3 border-t border-[#28372B]/10 dark:border-white/10 flex justify-end">
                                            <a
                                                href={opp.apply_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#A8743F] hover:bg-[#A8743F]/90 text-white text-xs font-bold transition font-mono"
                                            >
                                                <span>Participer</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#A8743F]/10 text-[#A8743F] dark:text-[#D5A45F] flex items-center justify-center">
                                <Rocket className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-bold font-heading text-[#1D3027] dark:text-white mb-1.5">
                                Aucun programme ou challenge actif actuellement
                            </h3>
                            <p className="text-xs text-[#59685F] dark:text-[#849187] max-w-md mx-auto leading-relaxed">
                                Les concours d'innovation, hackathons et bourses de pré-incubation seront publiés ici dès leur ouverture avec dates limites et liens d'inscription.
                            </p>
                        </div>
                    )}

                    {/* Archives des événements passés si présents */}
                    {pastOpportunities.length > 0 && (
                        <div className="pt-6 border-t border-[#28372B]/10 dark:border-white/10">
                            <h3 className="text-sm font-bold text-[#7D897F] flex items-center gap-1.5 mb-4">
                                <Clock className="w-4 h-4" />
                                <span>Challenges & Programmes Clôturés (Archives)</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
                                {pastOpportunities.map((opp) => (
                                    <div key={opp.id} className="p-4 rounded-xl bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/10 text-xs">
                                        <span className="font-mono text-[#7D897F] uppercase text-[10px] block">{opp.type} • Clôturé le {opp.deadline}</span>
                                        <span className="font-bold text-[#1D3027] dark:text-white">{opp.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

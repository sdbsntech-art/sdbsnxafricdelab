import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ResourceCard from '@/Components/ResourceCard';
import { AcademicLevel, Resource } from '@/types';
import {
    GraduationCap,
    BookOpen,
    Layers,
    ArrowRight,
    ChevronRight,
} from 'lucide-react';

interface LevelProps {
    level: AcademicLevel;
    allLevels: AcademicLevel[];
    totalResources: number;
    featuredInLevel: Resource[];
}

export default function Level({ level, allLevels, totalResources, featuredInLevel }: LevelProps) {
    const isL1 = level.slug === 'licence-1';
    const isL2 = level.slug === 'licence-2';
    const brandColor = isL1 ? 'unchk-blue' : isL2 ? 'unchk-green' : 'unchk-orange';

    return (
        <AppLayout>
            <Head title={`${level.name} — Cours, TD & Examens Informatique | SDBSNX`} />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 flex-wrap">
                    <Link href="/" className="hover:text-unchk-blue">Accueil</Link>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <Link href="/cours" className="hover:text-unchk-blue">Cours</Link>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-unchk-blue font-semibold truncate max-w-xs">{level.name}</span>
                </div>

                {/* Level Hero Header */}
                <div className="sdbsnx-card rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/10 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div>
                            <span className="w-12 h-12 rounded-2xl bg-unchk-blue/10 dark:bg-unchk-blue/20 text-unchk-blue border border-unchk-blue/30 flex items-center justify-center font-bold font-mono text-lg mb-4">
                                {level.short_name}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
                                {level.name} (Licence Informatique & D.A. UN-CHK)
                            </h1>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                                {level.description}
                            </p>
                        </div>

                        <div className="sm:text-right shrink-0">
                            <div className="text-3xl font-extrabold text-unchk-blue font-mono">
                                {totalResources}
                            </div>
                            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Ressources indexées
                            </div>
                        </div>
                    </div>

                    {/* Quick navigation between levels */}
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-500 mr-2">Changer de niveau :</span>
                        {allLevels.map((lvl) => (
                            <Link
                                key={lvl.id}
                                href={`/cours/${lvl.slug}`}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition ${
                                    lvl.id === level.id
                                        ? 'bg-unchk-blue text-white shadow-sm'
                                        : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20'
                                }`}
                            >
                                {lvl.short_name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Semesters & Modules */}
                <div className="space-y-12">
                    {level.semesters?.map((sem) => (
                        <div key={sem.id} className="space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-unchk-blue/10 dark:bg-unchk-blue/20 border border-unchk-blue/30 text-unchk-blue flex items-center justify-center font-bold text-xs font-mono">
                                        S{sem.semester_number}
                                    </span>
                                    <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                                        {sem.name}
                                    </h2>
                                </div>
                                <Link
                                    href={`/cours?level=${level.slug}&semester=${sem.slug}`}
                                    className="text-xs font-semibold text-unchk-blue hover:underline inline-flex items-center gap-1 font-mono"
                                >
                                    <span>Toutes les ressources S{sem.semester_number}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {sem.modules?.map((mod) => (
                                    <Link
                                        key={mod.id}
                                        href={`/cours/module/${mod.slug}`}
                                        className="sdbsnx-card rounded-2xl p-5 border border-slate-200 dark:border-white/10 group block hover:shadow-xl transition-all"
                                    >
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-unchk-blue border border-unchk-blue/30">
                                                {mod.code || 'INFO'}
                                            </span>
                                            <span className="text-xs font-mono text-slate-500">
                                                {mod.credits} ECTS
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white group-hover:text-unchk-blue transition-colors">
                                            {mod.name}
                                        </h3>

                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                                            {mod.description}
                                        </p>

                                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 font-mono">
                                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                                                {mod.resources_count || 0} ressources
                                            </span>
                                            <span className="text-unchk-blue font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                                Consulter <ChevronRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Featured in this Level */}
                {featuredInLevel.length > 0 && (
                    <div className="pt-8 border-t border-slate-200 dark:border-white/10">
                        <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-6">
                            Ressources Recommandées en {level.short_name}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {featuredInLevel.map((res) => (
                                <ResourceCard key={res.id} resource={res} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

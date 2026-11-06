import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ResourceCard from '@/Components/ResourceCard';
import { CourseModule, Resource } from '@/types';
import {
    ChevronRight,
    BookOpen,
    Layers,
    FileText,
    Download,
    CheckCircle,
} from 'lucide-react';

interface ModuleProps {
    module: CourseModule;
    resourcesGrouped: Record<string, Resource[]>;
    relatedModules: CourseModule[];
    userBookmarks: number[];
}

export default function Module({
    module,
    resourcesGrouped,
    relatedModules,
    userBookmarks,
}: ModuleProps) {
    const level = module.semester?.academic_level;
    const semester = module.semester;

    const sections = [
        { key: 'course', title: 'Cours & Supports Magistraux', color: 'unchk-blue' },
        { key: 'td', title: 'Travaux Dirigés (TD) & Corrigés', color: 'unchk-green' },
        { key: 'exercise', title: 'Exercices & Travaux Pratiques (TP)', color: 'unchk-orange' },
        { key: 'project', title: 'Projets & Ateliers Pratiques', color: 'purple-600' },
        { key: 'exam', title: 'Évaluations & Devoirs Passés', color: 'rose-600' },
    ];

    return (
        <AppLayout>
            <Head title={`${module.name} — Ressources UN-CHK | SDBSNX`} />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
                    <Link href="/" className="hover:text-unchk-blue">Accueil</Link>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <Link href="/cours" className="hover:text-unchk-blue">Cours</Link>
                    {level && (
                        <>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            <Link href={`/cours/${level.slug}`} className="hover:text-unchk-blue">
                                {level.short_name}
                            </Link>
                        </>
                    )}
                    {semester && (
                        <>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-300 font-semibold">{semester.name}</span>
                        </>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-unchk-blue font-bold">{module.name}</span>
                </div>

                {/* Module Header Card */}
                <div className="sdbsnx-card rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/10 mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-unchk-blue/10 text-unchk-blue border border-unchk-blue/30">
                                    {module.code || 'UE'}
                                </span>
                                {level && (
                                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                        {level.name}
                                    </span>
                                )}
                                {semester && (
                                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                        {semester.name}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                                {module.name}
                            </h1>

                            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                                {module.description}
                            </p>
                        </div>

                        <div className="flex sm:flex-col gap-3 font-mono text-xs">
                            <div className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-center">
                                <span className="block text-xl font-bold text-unchk-blue">{module.credits}</span>
                                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Crédits ECTS</span>
                            </div>
                            <div className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-center">
                                <span className="block text-xl font-bold text-unchk-green">{module.coefficient}</span>
                                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Coefficient</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grouped Resources */}
                <div className="space-y-12">
                    {sections.map((section) => {
                        const items = resourcesGrouped[section.key] || [];
                        if (items.length === 0) return null;

                        return (
                            <div key={section.key} className="space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-unchk-blue" />
                                        <span>{section.title}</span>
                                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">({items.length})</span>
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {items.map((res) => (
                                        <ResourceCard
                                            key={res.id}
                                            resource={res}
                                            isBookmarked={userBookmarks.includes(res.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {Object.keys(resourcesGrouped).length === 0 && (
                        <div className="sdbsnx-card rounded-2xl p-10 text-center border border-slate-200 dark:border-white/10">
                            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                            <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
                                Aucune ressource disponible pour ce module pour le moment.
                            </p>
                        </div>
                    )}
                </div>

                {/* Related Modules in same semester */}
                {relatedModules.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-slate-200 dark:border-white/10">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 font-mono">
                            Autres modules du {semester?.name}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {relatedModules.map((rm) => (
                                <Link
                                    key={rm.id}
                                    href={`/cours/module/${rm.slug}`}
                                    className="sdbsnx-card rounded-xl p-4 border border-slate-200 dark:border-white/10 block hover:border-unchk-blue transition"
                                >
                                    <div className="text-xs font-mono text-unchk-blue mb-1">{rm.code || 'INFO'}</div>
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">{rm.name}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

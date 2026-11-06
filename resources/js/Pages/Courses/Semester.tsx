import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ResourceCard from '@/Components/ResourceCard';
import { Semester, Resource } from '@/types';
import {
    BookOpen,
    ArrowLeft,
    ChevronRight,
    Layers,
    GraduationCap,
} from 'lucide-react';

interface SemesterPageProps {
    semester: Semester & {
        academic_level: {
            id: number;
            name: string;
            slug: string;
            short_name: string;
        };
        modules: Array<{
            id: number;
            name: string;
            slug: string;
            code: string | null;
            icon: string;
            color: string;
            resources: Resource[];
        }>;
    };
}

export default function SemesterPage({ semester }: SemesterPageProps) {
    const level = semester.academic_level;

    return (
        <AppLayout>
            <Head title={`${semester.name} — ${level?.name ?? 'Licence'} | SDBSNX UN-CHK`} />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono flex-wrap">
                    <Link href="/" className="hover:text-unchk-blue transition">Accueil</Link>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    <Link href="/cours" className="hover:text-unchk-blue transition">Cours</Link>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    {level && (
                        <>
                            <Link
                                href={`/cours/${level.slug}`}
                                className="hover:text-unchk-blue transition"
                            >
                                {level.name}
                            </Link>
                            <ChevronRight className="w-3 h-3 text-slate-400" />
                        </>
                    )}
                    <span className="text-unchk-blue font-bold">{semester.name}</span>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-unchk-blue dark:text-unchk-green uppercase tracking-widest mb-1">
                            <GraduationCap className="w-4 h-4" />
                            <span>{level?.name} • {semester.name}</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                            {semester.name}
                        </h1>
                        {semester.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
                                {semester.description}
                            </p>
                        )}
                    </div>

                    <Link
                        href={level ? `/cours/${level.slug}` : '/cours'}
                        className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-unchk-blue hover:underline transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour à {level?.name ?? 'la liste'}
                    </Link>
                </div>

                {/* Modules Grid */}
                {semester.modules && semester.modules.length > 0 ? (
                    <div className="space-y-12">
                        {semester.modules.map((mod) => (
                            <div key={mod.id} className="space-y-5">
                                {/* Module Header */}
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={`/cours/module/${mod.slug}`}
                                        className="flex items-center gap-3 group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-unchk-blue/10 dark:bg-unchk-blue/20 border border-unchk-blue/30 flex items-center justify-center text-unchk-blue">
                                            <Layers className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-unchk-blue transition">
                                                {mod.name}
                                            </h3>
                                            {mod.code && (
                                                <span className="text-[10px] font-mono text-slate-500 font-semibold">{mod.code}</span>
                                            )}
                                        </div>
                                    </Link>

                                    <Link
                                        href={`/cours/module/${mod.slug}`}
                                        className="text-xs font-mono font-semibold text-unchk-blue hover:underline flex items-center gap-1 transition"
                                    >
                                        Voir tout <ChevronRight className="w-3 h-3" />
                                    </Link>
                                </div>

                                {/* Resources in this module */}
                                {mod.resources && mod.resources.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {mod.resources.map((resource) => (
                                            <ResourceCard
                                                key={resource.id}
                                                resource={resource}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="sdbsnx-card p-6 text-center border border-slate-200 dark:border-white/10">
                                        <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                        <p className="text-xs text-slate-500">
                                            Aucune ressource publiée pour ce module.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="sdbsnx-card p-12 text-center border border-slate-200 dark:border-white/10">
                        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                            Aucun module trouvé
                        </h3>
                        <p className="text-xs text-slate-500">
                            Les modules de ce semestre seront ajoutés prochainement.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ResourceCard from '@/Components/ResourceCard';
import { AcademicLevel, CourseModule, PaginatedData, Resource, Semester } from '@/types';
import {
    Search,
    BookOpen,
    Filter,
    RotateCcw,
    Layers,
    Calendar,
    FolderKanban,
} from 'lucide-react';

interface CoursesIndexProps {
    resources: PaginatedData<Resource>;
    levels: AcademicLevel[];
    semesters?: Semester[];
    modules?: CourseModule[];
    allModules?: CourseModule[];
    filters: {
        search?: string;
        level?: string;
        semester?: string;
        module?: string;
        type?: string;
    };
    userBookmarks?: number[];
}

export default function CoursesIndex({
    resources,
    levels = [],
    modules: modulesProp,
    allModules: allModulesProp,
    filters = {},
}: CoursesIndexProps) {
    const allModules = allModulesProp || modulesProp || [];
    const [search, setSearch] = useState(filters.search || '');
    const [level, setLevel] = useState(filters.level || '');
    const [semester, setSemester] = useState(filters.semester || '');
    const [module, setModule] = useState(filters.module || '');
    const [type, setType] = useState(filters.type || '');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/cours',
            {
                search: search || undefined,
                level: level || undefined,
                semester: semester || undefined,
                module: module || undefined,
                type: type || undefined,
            },
            { preserveState: true }
        );
    };

    const resetFilters = () => {
        setSearch('');
        setLevel('');
        setSemester('');
        setModule('');
        setType('');
        router.get('/cours');
    };

    return (
        <AppLayout>
            <Head title="Catalogue des cours et ressources en informatique | SDBSNX" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header Title */}
                <div>
                    <span className="text-xs font-mono font-bold text-unchk-blue dark:text-unchk-green uppercase tracking-widest">
                        Ressources Pédagogiques Libres
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
                        Catalogue des Cours, TD & Examens
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
                        Explorez plus de 525+ ressources d'informatique UN-CHK classées par Licence, Semestre et Matière. Accès 100% gratuit et direct.
                    </p>
                </div>

                {/* Filters Section */}
                <div className="sdbsnx-card p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
                    {/* Search & Reset row */}
                    <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Recherche par mot-clé (ex: listes chaînées, requêtes SQL, CSS Grid, socket, PHP...)"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white dark:bg-[#111C38] border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-unchk-blue transition"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                className="px-5 py-2.5 rounded-xl bg-unchk-blue hover:bg-unchk-blue/90 text-white text-xs font-bold transition shadow-md shadow-unchk-blue/20"
                            >
                                Filtrer
                            </button>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
                                title="Réinitialiser les filtres"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Reset</span>
                            </button>
                        </div>
                    </form>

                    {/* Filter Selects */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                        {/* Level */}
                        <div>
                            <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1">
                                Licence
                            </label>
                            <select
                                value={level}
                                onChange={(e) => {
                                    setLevel(e.target.value);
                                    setSemester('');
                                    router.get(
                                        '/cours',
                                        { search, level: e.target.value || undefined, type: type || undefined },
                                        { preserveState: true }
                                    );
                                }}
                                className="w-full bg-white dark:bg-[#111C38] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-unchk-blue"
                            >
                                <option value="">Toutes les Licences</option>
                                {levels.map((lvl) => (
                                    <option key={lvl.id} value={lvl.slug}>
                                        {lvl.name} ({lvl.short_name})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Semester */}
                        <div>
                            <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1">
                                Semestre
                            </label>
                            <select
                                value={semester}
                                onChange={(e) => {
                                    setSemester(e.target.value);
                                    router.get(
                                        '/cours',
                                        { search, level: level || undefined, semester: e.target.value || undefined, type: type || undefined },
                                        { preserveState: true }
                                    );
                                }}
                                className="w-full bg-white dark:bg-[#111C38] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-unchk-blue"
                            >
                                <option value="">Tous les Semestres</option>
                                <option value="semestre-1">Semestre 1 (L1)</option>
                                <option value="semestre-2">Semestre 2 (L1)</option>
                                <option value="semestre-3">Semestre 3 (L2)</option>
                                <option value="semestre-4">Semestre 4 (L2)</option>
                                <option value="semestre-5">Semestre 5 (L3)</option>
                                <option value="semestre-6">Semestre 6 (L3)</option>
                            </select>
                        </div>

                        {/* Module */}
                        <div>
                            <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1">
                                Matière / Module
                            </label>
                            <select
                                value={module}
                                onChange={(e) => {
                                    setModule(e.target.value);
                                    router.get(
                                        '/cours',
                                        { search, level: level || undefined, semester: semester || undefined, module: e.target.value || undefined, type: type || undefined },
                                        { preserveState: true }
                                    );
                                }}
                                className="w-full bg-white dark:bg-[#111C38] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-unchk-blue"
                            >
                                <option value="">Toutes les matières ({allModules.length})</option>
                                {allModules.map((mod) => (
                                    <option key={mod.id} value={mod.slug}>
                                        {mod.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold mb-1">
                                Catégorie
                            </label>
                            <select
                                value={type}
                                onChange={(e) => {
                                    setType(e.target.value);
                                    router.get(
                                        '/cours',
                                        { search, level: level || undefined, semester: semester || undefined, module: module || undefined, type: e.target.value || undefined },
                                        { preserveState: true }
                                    );
                                }}
                                className="w-full bg-white dark:bg-[#111C38] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-unchk-blue"
                            >
                                <option value="">Tous les types</option>
                                <option value="course">Cours magistraux (PDF)</option>
                                <option value="td">Travaux Dirigés (TD)</option>
                                <option value="exercise">Exercices / TP</option>
                                <option value="project">Projets pratiques</option>
                                <option value="exam">Examens & Devoirs</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <div>
                        Affichage de <span className="text-slate-900 dark:text-white font-bold">{resources.data.length}</span> sur <span className="text-unchk-blue font-bold">{resources.total}</span> ressources disponibles
                    </div>
                </div>

                {/* Grid */}
                {resources.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {resources.data.map((res) => (
                            <ResourceCard
                                key={res.id}
                                resource={res}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="sdbsnx-card rounded-2xl p-12 text-center border border-slate-200 dark:border-white/10">
                        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Aucune ressource trouvée
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                            Essayez de modifier votre mot-clé de recherche ou de réinitialiser les filtres.
                        </p>
                        <button
                            onClick={resetFilters}
                            className="mt-4 px-4 py-2 rounded-xl bg-unchk-blue text-white text-xs font-semibold shadow"
                        >
                            Réinitialiser
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {resources.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1 font-mono text-xs pt-6">
                        {resources.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                                    link.active
                                        ? 'bg-unchk-blue text-white'
                                        : link.url
                                        ? 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20'
                                        : 'bg-transparent text-slate-400 cursor-not-allowed'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import { AcademicLevel, CourseModule, Semester } from '@/types';
import {
    FolderTree,
    Plus,
    Search,
    Trash2,
    BookOpen,
    GraduationCap,
    Clock,
    Award,
    CheckCircle2,
    X,
} from 'lucide-react';

interface PaginatedModules {
    data: (CourseModule & {
        semester?: Semester & { academic_level?: AcademicLevel };
        resources_count?: number;
    })[];
    current_page: number;
    last_page: number;
    total: number;
}

interface ModulesProps {
    modules: PaginatedModules;
    levels: (AcademicLevel & { semesters: Semester[] })[];
    semesters: Semester[];
    filters: {
        search?: string;
        level?: string;
    };
}

export default function Modules({ modules, levels, semesters, filters }: ModulesProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedLevel, setSelectedLevel] = useState(filters.level || '');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        code: '',
        semester_id: semesters[0]?.id || '',
        description: '',
        credits: 2,
        coefficient: 2,
        icon: 'BookOpen',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/modules', { search: search || undefined, level: selectedLevel || undefined }, { preserveState: true });
    };

    const handleLevelFilter = (lvl: string) => {
        setSelectedLevel(lvl);
        router.get('/admin/modules', { search: search || undefined, level: lvl || undefined }, { preserveState: true });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/modules/ajouter', {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer le module "${name}" ?`)) {
            router.delete(`/admin/modules/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Gestion des Modules & Matières — Administration SDBSNX" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-mono text-xs font-bold uppercase tracking-wider mb-1">
                            <FolderTree className="w-4 h-4" />
                            <span>Curriculum Universitaire & Matières</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                            Modules de Cours ({modules.total})
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Gérez les matières officielles pour chaque Licence (L1, L2, L3) et chaque Semestre.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2.5 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white text-xs font-bold font-mono flex items-center gap-2 shadow-sm transition shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Ajouter un Nouveau Module</span>
                    </button>
                </div>

                {/* Unified Admin Navigation */}
                <AdminNav />

                {/* Filters */}
                <div className="sdbsnx-card p-4 rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
                        <button
                            onClick={() => handleLevelFilter('')}
                            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition font-mono ${
                                !selectedLevel ? 'bg-[#1E5B45] text-white' : 'bg-[#F7F5EF] dark:bg-[#101713] text-[#59685F] dark:text-[#C2CEC6]'
                            }`}
                        >
                            Toutes les Licences
                        </button>
                        {levels.map((lvl) => (
                            <button
                                key={lvl.id}
                                onClick={() => handleLevelFilter(String(lvl.id))}
                                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition font-mono ${
                                    selectedLevel === String(lvl.id) ? 'bg-[#1E5B45] text-white' : 'bg-[#F7F5EF] dark:bg-[#101713] text-[#59685F] dark:text-[#C2CEC6]'
                                }`}
                            >
                                {lvl.short_name}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSearch} className="relative w-full md:w-72">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-[#7D897F]" />
                        <input
                            type="text"
                            placeholder="Rechercher code, nom..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#1D3027] dark:text-white placeholder-[#7D897F] focus:outline-none focus:ring-2 focus:ring-[#1E5B45]"
                        />
                    </form>
                </div>

                {/* Table of Modules */}
                <div className="sdbsnx-card rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#F7F5EF] dark:bg-[#101713] text-[#59685F] dark:text-[#849187] font-mono uppercase text-[10px] border-b border-[#28372B]/10 dark:border-white/5">
                                <tr>
                                    <th className="py-3 px-4">Code</th>
                                    <th className="py-3 px-4">Nom du Module</th>
                                    <th className="py-3 px-4">Licence & Semestre</th>
                                    <th className="py-3 px-4 text-center">Crédits / Coeff</th>
                                    <th className="py-3 px-4 text-center">Ressources</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#28372B]/10 dark:divide-white/5">
                                {modules.data.map((mod) => (
                                    <tr key={mod.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                                        <td className="py-3 px-4 font-mono font-bold text-[#1E5B45] dark:text-[#62A87A]">
                                            {mod.code}
                                        </td>
                                        <td className="py-3 px-4 font-semibold text-[#1D3027] dark:text-white">
                                            {mod.name}
                                        </td>
                                        <td className="py-3 px-4 font-mono text-[#59685F] dark:text-[#C2CEC6]">
                                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
                                                {mod.semester?.name || 'Semestre'} ({mod.semester?.academic_level?.short_name || 'L'})
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-center font-mono">
                                            {mod.credits} ECTS • Coeff {mod.coefficient}
                                        </td>
                                        <td className="py-3 px-4 text-center font-mono font-bold">
                                            <span className="px-2 py-0.5 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A]">
                                                {mod.resources_count || 0} docs
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <button
                                                onClick={() => handleDelete(mod.id, mod.name)}
                                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition"
                                                title="Supprimer ce module"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal Create Module */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-[#1A241D] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#28372B]/15 dark:border-white/10 shadow-2xl relative space-y-5">
                            <div className="flex items-center justify-between border-b border-[#28372B]/10 dark:border-white/10 pb-4">
                                <h2 className="text-lg font-bold text-[#1D3027] dark:text-white flex items-center gap-2">
                                    <Plus className="w-5 h-5 text-[#1E5B45]" />
                                    <span>Nouveau Module Pédagogique</span>
                                </h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                <div>
                                    <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                        Nom complet du module *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Programmation Web Avancée"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white"
                                    />
                                    {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                            Code Matière *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Ex: WEB402"
                                            value={data.code}
                                            onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white font-mono uppercase"
                                        />
                                        {errors.code && <p className="text-red-500 mt-1">{errors.code}</p>}
                                    </div>

                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                            Semestre d'attribution *
                                        </label>
                                        <select
                                            value={data.semester_id}
                                            onChange={(e) => setData('semester_id', e.target.value)}
                                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white font-mono"
                                        >
                                            {semesters.map((s) => (
                                                <option key={s.id} value={s.id}>
                                                    {s.name} ({s.academic_level?.short_name || 'L'})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                            Crédits ECTS
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={data.credits}
                                            onChange={(e) => setData('credits', parseInt(e.target.value) || 1)}
                                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white font-mono"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                            Coefficient
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={data.coefficient}
                                            onChange={(e) => setData('coefficient', parseInt(e.target.value) || 1)}
                                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white font-mono"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                        Description & Objectifs du module
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Syllabus, prérequis et compétences visées..."
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#28372B]/10 dark:border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 font-semibold"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2.5 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white font-bold font-mono transition"
                                    >
                                        {processing ? 'Enregistrement...' : 'Créer le Module'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}


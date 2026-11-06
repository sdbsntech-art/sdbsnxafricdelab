import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import { AcademicLevel, CourseModule, PaginationMeta, Resource } from '@/types';
import {
    BookOpen,
    Plus,
    Search,
    Trash2,
    Eye,
    Star,
    CheckCircle,
    X,
    Filter,
    Download,
    ExternalLink,
    UploadCloud,
    FileText,
} from 'lucide-react';

interface AdminResourcesProps {
    resources: PaginationMeta<Resource>;
    levels: AcademicLevel[];
    modules: CourseModule[];
    filters: { search?: string };
}

export default function AdminResources({
    resources,
    levels,
    modules,
    filters,
}: AdminResourcesProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [addModalOpen, setAddModalOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm<{
        title: string;
        academic_level_id: number;
        semester_id: number;
        module_id: number;
        type: string;
        description: string;
        external_url: string;
        file_type: string;
        file: File | null;
        is_published: boolean;
        is_featured: boolean;
    }>({
        title: '',
        academic_level_id: levels[0]?.id || 1,
        semester_id: 1,
        module_id: modules[0]?.id || 1,
        type: 'course',
        description: '',
        external_url: '',
        file_type: 'pdf',
        file: null,
        is_published: true,
        is_featured: false,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/ressources', { search: search || undefined });
    };

    const handleCreateResource = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/ressources/ajouter', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setAddModalOpen(false);
            },
        });
    };

    const togglePublish = (id: number) => {
        router.post(`/admin/ressources/${id}/publier`, {}, { preserveScroll: true });
    };

    const toggleFeatured = (id: number) => {
        router.post(`/admin/ressources/${id}/vedette`, {}, { preserveScroll: true });
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Confirmez-vous la suppression de la ressource "${title}" ?`)) {
            router.delete(`/admin/ressources/${id}`, { preserveScroll: true });
        }
    };

    return (
        <AppLayout>
            <Head title="Gestion des Ressources — Administration SDBSNX" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                            <Link href="/admin" className="hover:text-slate-900 dark:hover:text-white">Admin</Link>
                            <span>/</span>
                            <span className="text-unchk-blue dark:text-indigo-400 font-bold">Ressources</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                            Gestion des {resources.total} Ressources Pédagogiques
                        </h1>
                    </div>

                    <button
                        onClick={() => setAddModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-unchk-blue hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-unchk-blue/25 transition active:scale-95 shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Ajouter une Ressource</span>
                    </button>
                </div>

                {/* Unified Admin Navigation */}
                <AdminNav />

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-md relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 dark:text-slate-500" />
                    <input
                        type="text"
                        placeholder="Rechercher par titre de ressource..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-1 focus:ring-unchk-blue"
                    />
                </form>

                {/* Resources Table */}
                <div className="glass-panel rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                            <thead className="bg-slate-100 dark:bg-slate-900/90 text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/5">
                                <tr>
                                    <th className="py-3 px-4">Titre & Matière</th>
                                    <th className="py-3 px-4">Niveau / Sem.</th>
                                    <th className="py-3 px-4">Type</th>
                                    <th className="py-3 px-4">Stats</th>
                                    <th className="py-3 px-4">Statut</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-white/5 font-sans">
                                {resources.data.map((res) => (
                                    <tr key={res.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
                                        <td className="py-3 px-4">
                                            <div className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 max-w-sm">
                                                {res.title}
                                            </div>
                                            <div className="text-xs text-unchk-blue dark:text-cyan-400 font-mono mt-0.5">
                                                {res.module?.name || 'Général'}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 font-mono">
                                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                                {res.academic_level?.short_name || 'L1'}
                                            </span>
                                            <span className="ml-1 text-slate-500 dark:text-slate-400">
                                                S{res.semester?.semester_number || 1}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-mono">
                                            <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-indigo-950 text-unchk-blue dark:text-indigo-300 border border-blue-200 dark:border-indigo-800/40 text-[11px]">
                                                {res.type}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                                            <div>{res.views_count} vues</div>
                                            <div>{res.downloads_count} téléch.</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => togglePublish(res.id)}
                                                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition ${
                                                        res.is_published
                                                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                                    }`}
                                                >
                                                    {res.is_published ? 'Publié' : 'Brouillon'}
                                                </button>
                                                <button
                                                    onClick={() => toggleFeatured(res.id)}
                                                    className={`p-1 rounded transition ${
                                                        res.is_featured ? 'text-amber-500 dark:text-amber-400' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'
                                                    }`}
                                                    title={res.is_featured ? 'En vedette' : 'Mettre en vedette'}
                                                >
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/cours/ressource/${res.slug}`}
                                                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                                                    title="Voir"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </Link>
                                                <a
                                                    href={`/cours/telecharger/${res.id}`}
                                                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-unchk-blue dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300"
                                                    title="Télécharger"
                                                >
                                                    <Download className="w-3.5 h-3.5" />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(res.id, res.title)}
                                                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {resources.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1 text-xs">
                        {resources.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                                    link.active
                                        ? 'bg-unchk-blue text-white'
                                        : link.url
                                        ? 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                                        : 'bg-transparent text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                }`}
                            />
                        ))}
                    </div>
                )}

                {/* Add Resource Modal */}
                {addModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 dark:border-white/10 relative shadow-2xl">
                            <button
                                onClick={() => setAddModalOpen(false)}
                                className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                Ajouter une nouvelle ressource
                            </h2>

                            <form onSubmit={handleCreateResource} className="space-y-4 text-xs">
                                <div>
                                    <label className="block font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                                        Titre du document *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:ring-1 focus:ring-unchk-blue"
                                    />
                                    {errors.title && <p className="text-red-500 mt-0.5">{errors.title}</p>}
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                                            Licence *
                                        </label>
                                        <select
                                            value={data.academic_level_id}
                                            onChange={(e) => setData('academic_level_id', Number(e.target.value))}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:ring-1 focus:ring-unchk-blue"
                                        >
                                            {levels.map((lvl) => (
                                                <option key={lvl.id} value={lvl.id}>{lvl.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                                            Semestre (1 à 6) *
                                        </label>
                                        <input
                                            type="number"
                                            min={1}
                                            max={6}
                                            value={data.semester_id}
                                            onChange={(e) => setData('semester_id', Number(e.target.value))}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:ring-1 focus:ring-unchk-blue"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                                            Type de support *
                                        </label>
                                        <select
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:ring-1 focus:ring-unchk-blue"
                                        >
                                            <option value="course">Cours magistral</option>
                                            <option value="td">Travaux Dirigés (TD)</option>
                                            <option value="exercise">Exercice / TP</option>
                                            <option value="project">Projet</option>
                                            <option value="exam">Examen / Devoir</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                                        Matière / Module *
                                    </label>
                                    <select
                                        value={data.module_id}
                                        onChange={(e) => setData('module_id', Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:ring-1 focus:ring-unchk-blue"
                                    >
                                        {modules.map((m) => (
                                            <option key={m.id} value={m.id}>{m.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                                        Description (optionnelle)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:ring-1 focus:ring-unchk-blue"
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                                        Fichier depuis votre ordinateur (PDF, Word, PPT, ZIP...)
                                    </label>
                                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center hover:border-unchk-blue transition bg-slate-50 dark:bg-slate-950">
                                        <input
                                            type="file"
                                            id="resource-file-upload"
                                            className="hidden"
                                            accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar,.mp4,.odt,.txt"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] || null;
                                                setData('file', file);
                                            }}
                                        />
                                        <label htmlFor="resource-file-upload" className="cursor-pointer flex flex-col items-center">
                                            <UploadCloud className="w-8 h-8 text-unchk-blue mb-1" />
                                            {data.file ? (
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                                                    <FileText className="w-4 h-4 text-emerald-500" />
                                                    <span>{data.file.name} ({(data.file.size / (1024 * 1024)).toFixed(2)} Mo)</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                                                        Cliquez pour choisir un fichier sur votre bureau
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                        PDF, DOCX, PPTX, ZIP jusqu'à 50 Mo
                                                    </span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                    {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file}</p>}
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                                        OU Lien externe (optionnel si fichier fourni)
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://drive.google.com/... ou https://..."
                                        value={data.external_url}
                                        onChange={(e) => setData('external_url', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:ring-1 focus:ring-unchk-blue"
                                    />
                                </div>

                                <div className="flex items-center gap-4 pt-2 text-slate-700 dark:text-slate-300">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_published}
                                            onChange={(e) => setData('is_published', e.target.checked)}
                                            className="rounded bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-unchk-blue focus:ring-0"
                                        />
                                        <span>Publier immédiatement</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_featured}
                                            onChange={(e) => setData('is_featured', e.target.checked)}
                                            className="rounded bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-unchk-blue focus:ring-0"
                                        />
                                        <span>Mettre en avant (Vedette)</span>
                                    </label>
                                </div>

                                <div className="pt-3 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setAddModalOpen(false)}
                                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2 rounded-xl bg-unchk-blue hover:bg-blue-700 text-white font-bold transition disabled:opacity-50 shadow-md shadow-unchk-blue/20"
                                    >
                                        {processing ? 'Enregistrement...' : 'Enregistrer la ressource'}
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

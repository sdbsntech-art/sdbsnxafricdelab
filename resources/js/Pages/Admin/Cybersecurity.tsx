import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import { AcademicLevel, CourseModule, Resource } from '@/types';
import {
    ShieldCheck,
    Plus,
    Search,
    Trash2,
    FileText,
    ExternalLink,
    Eye,
    CheckCircle2,
    X,
    Lock,
    Server,
    AlertTriangle,
    UploadCloud,
} from 'lucide-react';

interface PaginatedResources {
    data: Resource[];
    current_page: number;
    last_page: number;
    total: number;
}

interface CybersecurityProps {
    resources: PaginatedResources;
    cyberModules: CourseModule[];
    levels: AcademicLevel[];
    filters: {
        search?: string;
    };
}

export default function CybersecurityAdmin({
    resources,
    cyberModules,
    levels,
    filters,
}: CybersecurityProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<{
        title: string;
        module_id: string | number;
        type: 'course' | 'td' | 'exercise' | 'project' | 'exam' | 'video';
        description: string;
        external_url: string;
        file_type: string;
        file: File | null;
        is_published: boolean;
    }>({
        title: '',
        module_id: cyberModules[0]?.id || '',
        type: 'course',
        description: '',
        external_url: '',
        file_type: 'pdf',
        file: null,
        is_published: true,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/cybersecurite', { search: search || undefined }, { preserveState: true });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/cybersecurite/ajouter', {
            forceFormData: true,
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Supprimer la ressource de cybersécurité "${title}" ?`)) {
            router.delete(`/admin/ressources/${id}`);
        }
    };

    const handleTogglePublish = (id: number) => {
        router.post(`/admin/ressources/${id}/publier`, {}, { preserveScroll: true });
    };

    return (
        <AppLayout>
            <Head title="Publication Cybersécurité — Administration SDBSNX" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-mono text-xs font-bold uppercase tracking-wider mb-1">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Espace Spécialisation</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                            Gestion & Publication Cybersécurité ({resources.total})
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Publiez les cours de hacking éthique, fiches OWASP Top 10, cryptographie et labs réseau.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2.5 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white text-xs font-bold font-mono flex items-center gap-2 shadow-sm transition shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Publier un Cours / Support Cyber</span>
                    </button>
                </div>

                {/* Unified Admin Navigation */}
                <AdminNav />

                {/* Search */}
                <div className="sdbsnx-card p-4 rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 flex items-center justify-between gap-4">
                    <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-[#7D897F]" />
                        <input
                            type="text"
                            placeholder="Rechercher un support de cybersécurité..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#1D3027] dark:text-white placeholder-[#7D897F] focus:outline-none focus:ring-2 focus:ring-[#1E5B45]"
                        />
                    </form>
                    <a
                        href="/cybersecurite"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-bold text-[#1E5B45] dark:text-[#62A87A] flex items-center gap-1 hover:underline shrink-0"
                    >
                        <span>Voir la page publique</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>

                {/* Resources List */}
                <div className="sdbsnx-card rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden shadow-xs">
                    {resources.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-[#F7F5EF] dark:bg-[#101713] text-[#59685F] dark:text-[#849187] font-mono uppercase text-[10px] border-b border-[#28372B]/10 dark:border-white/5">
                                    <tr>
                                        <th className="py-3 px-4">Titre du Support</th>
                                        <th className="py-3 px-4">Matière / Code</th>
                                        <th className="py-3 px-4">Type</th>
                                        <th className="py-3 px-4 text-center">Format</th>
                                        <th className="py-3 px-4 text-center">Statut</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#28372B]/10 dark:divide-white/5">
                                    {resources.data.map((res) => (
                                        <tr key={res.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                                            <td className="py-3 px-4 font-semibold text-[#1D3027] dark:text-white max-w-xs truncate">
                                                {res.title}
                                            </td>
                                            <td className="py-3 px-4 font-mono text-[#1E5B45] dark:text-[#62A87A]">
                                                {res.module?.name || 'Sécurité'} ({res.module?.code || 'SEC'})
                                            </td>
                                            <td className="py-3 px-4 font-mono uppercase text-[11px]">
                                                <span className="px-2 py-0.5 rounded bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A]">
                                                    {res.type}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-center font-mono uppercase text-[11px] font-bold">
                                                .{res.file_type || 'pdf'}
                                            </td>
                                            <td className="py-3 px-4 text-center font-mono">
                                                <button
                                                    onClick={() => handleTogglePublish(res.id)}
                                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                                                        res.is_published
                                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                                    }`}
                                                >
                                                    {res.is_published ? 'Publié' : 'Brouillon'}
                                                </button>
                                            </td>
                                            <td className="py-3 px-4 text-right flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/cours/apercu/${res.id}`}
                                                    className="p-1.5 rounded-lg text-slate-500 hover:text-[#1E5B45] transition"
                                                    title="Aperçu"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(res.id, res.title)}
                                                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12 px-4">
                            <ShieldCheck className="w-12 h-12 text-[#1E5B45] mx-auto mb-3 opacity-60" />
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                                Aucun cours de cybersécurité publié
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
                                Utilisez le bouton ci-dessus pour publier les premiers supports, labs OWASP et syllabus de sécurité.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-4 py-2 rounded-xl bg-[#1E5B45] text-white text-xs font-mono font-bold"
                            >
                                + Publier maintenant
                            </button>
                        </div>
                    )}
                </div>

                {/* Modal Publish Cyber Resource */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-[#1A241D] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#28372B]/15 dark:border-white/10 shadow-2xl relative space-y-5">
                            <div className="flex items-center justify-between border-b border-[#28372B]/10 dark:border-white/10 pb-4">
                                <h2 className="text-lg font-bold text-[#1D3027] dark:text-white flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-[#1E5B45]" />
                                    <span>Publier un Support de Cybersécurité</span>
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
                                        Titre du cours / lab *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Analyse de vulnérabilités Web OWASP Top 10"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white"
                                    />
                                    {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                            Module rattaché *
                                        </label>
                                        <select
                                            value={data.module_id}
                                            onChange={(e) => setData('module_id', e.target.value)}
                                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white font-mono"
                                        >
                                            {cyberModules.map((m) => (
                                                <option key={m.id} value={m.id}>
                                                    {m.code} - {m.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                            Type de document *
                                        </label>
                                        <select
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value as any)}
                                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white font-mono"
                                        >
                                            <option value="course">Cours magistral</option>
                                            <option value="td">Fiche TD / TP</option>
                                            <option value="exercise">Exercice corrigé</option>
                                            <option value="project">Projet / Lab Pratique</option>
                                            <option value="exam">Épreuve d'examen</option>
                                            <option value="video">Tutoriel vidéo</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                            Format du fichier
                                        </label>
                                        <select
                                            value={data.file_type}
                                            onChange={(e) => setData('file_type', e.target.value)}
                                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white font-mono"
                                        >
                                            <option value="pdf">PDF Document</option>
                                            <option value="docx">Word (.docx)</option>
                                            <option value="zip">Archive ZIP</option>
                                            <option value="html">Page Web HTML</option>
                                        </select>
                                    </div>

                                <div>
                                    <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                        Fichier depuis votre ordinateur (PDF, Diapos, Scripts...)
                                    </label>
                                    <div className="border-2 border-dashed border-[#28372B]/20 dark:border-white/10 rounded-xl p-4 text-center hover:border-[#1E5B45] transition bg-[#F7F5EF] dark:bg-[#101713]">
                                        <input
                                            type="file"
                                            id="cyber-file-upload"
                                            className="hidden"
                                            accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar,.mp4,.txt"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] || null;
                                                setData('file', file);
                                            }}
                                        />
                                        <label htmlFor="cyber-file-upload" className="cursor-pointer flex flex-col items-center">
                                            <UploadCloud className="w-8 h-8 text-[#1E5B45] mb-1" />
                                            {data.file ? (
                                                <div className="flex items-center gap-2 text-xs font-bold text-[#1D3027] dark:text-white">
                                                    <FileText className="w-4 h-4 text-emerald-500" />
                                                    <span>{data.file.name} ({(data.file.size / (1024 * 1024)).toFixed(2)} Mo)</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="text-xs font-bold text-[#1D3027] dark:text-white">
                                                        Choisir un fichier sur votre bureau
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 mt-0.5">
                                                        Support PDF, PPTX, DOCX, ZIP jusqu'à 50 Mo
                                                    </span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                    {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file}</p>}
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                        OU Lien externe / Drive (optionnel si fichier fourni)
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://drive.google.com/... ou https://..."
                                        value={data.external_url}
                                        onChange={(e) => setData('external_url', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white"
                                    />
                                </div>
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                        Description & Thèmes abordés
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Points clés, protocoles étudiés (TLS, AES, SQLi, XSS)..."
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="cyber_pub"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                        className="rounded text-[#1E5B45] focus:ring-[#1E5B45]"
                                    />
                                    <label htmlFor="cyber_pub" className="font-semibold text-slate-700 dark:text-slate-300">
                                        Rendre immédiatement accessible aux apprenants
                                    </label>
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
                                        {processing ? 'Publication...' : 'Publier le Document'}
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


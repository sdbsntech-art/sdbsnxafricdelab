import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import { Opportunity } from '@/types';
import {
    Briefcase,
    Plus,
    Search,
    Trash2,
    Calendar,
    ExternalLink,
    MapPin,
    Building2,
    AlertTriangle,
    X,
    CheckCircle2,
    Clock,
} from 'lucide-react';

interface PaginatedOpportunities {
    data: Opportunity[];
    current_page: number;
    last_page: number;
    total: number;
}

interface OpportunitiesProps {
    opportunities: PaginatedOpportunities;
    filters: {
        search?: string;
        type?: string;
    };
}

export default function OpportunitiesAdmin({ opportunities, filters }: OpportunitiesProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedType, setSelectedType] = useState(filters.type || '');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        type: 'stage' as 'stage' | 'bourse' | 'concours' | 'certification' | 'formation' | 'hackathon',
        organization: '',
        location: 'Dakar, Sénégal',
        deadline: '',
        apply_url: '',
        description: '',
        is_active: true,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/opportunites', { search: search || undefined, type: selectedType || undefined }, { preserveState: true });
    };

    const handleTypeFilter = (type: string) => {
        setSelectedType(type);
        router.get('/admin/opportunites', { search: search || undefined, type: type || undefined }, { preserveState: true });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/opportunites/ajouter', {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Supprimer l'offre "${title}" ?`)) {
            router.delete(`/admin/opportunites/${id}`);
        }
    };

    const handleToggleStatus = (id: number) => {
        router.post(`/admin/opportunites/${id}/statut`, {}, { preserveScroll: true });
    };

    const types = [
        { id: '', label: 'Toutes les catégories' },
        { id: 'stage', label: 'Stages' },
        { id: 'bourse', label: 'Bourses' },
        { id: 'concours', label: 'Concours' },
        { id: 'certification', label: 'Certifications' },
        { id: 'hackathon', label: 'Hackathons' },
    ];

    return (
        <AppLayout>
            <Head title="Publication Opportunités & Stages — Administration SDBSNX" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
                            <Briefcase className="w-4 h-4" />
                            <span>Insertion Professionnelle & Bourses</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                            Gestion des Opportunités ({opportunities.total})
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Publiez les offres de stages tech, programmes de bourses, concours et certifications gratuites.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold font-mono flex items-center gap-2 shadow-sm transition shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Publier une Offre / Bourse</span>
                    </button>
                </div>

                {/* Unified Admin Navigation */}
                <AdminNav />

                {/* Filters */}
                <div className="sdbsnx-card p-4 rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
                        {types.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => handleTypeFilter(t.id)}
                                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition font-mono ${
                                    selectedType === t.id ? 'bg-amber-600 text-white' : 'bg-[#F7F5EF] dark:bg-[#101713] text-[#59685F] dark:text-[#C2CEC6]'
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSearch} className="relative w-full md:w-72">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-[#7D897F]" />
                        <input
                            type="text"
                            placeholder="Rechercher titre, entreprise..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#1D3027] dark:text-white placeholder-[#7D897F] focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </form>
                </div>

                {/* Opportunities Table */}
                <div className="sdbsnx-card rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden shadow-xs">
                    {opportunities.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-[#F7F5EF] dark:bg-[#101713] text-[#59685F] dark:text-[#849187] font-mono uppercase text-[10px] border-b border-[#28372B]/10 dark:border-white/5">
                                    <tr>
                                        <th className="py-3 px-4">Titre de l'Offre</th>
                                        <th className="py-3 px-4">Organisation / Lieu</th>
                                        <th className="py-3 px-4">Type</th>
                                        <th className="py-3 px-4 text-center">Date Limite</th>
                                        <th className="py-3 px-4 text-center">Statut</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#28372B]/10 dark:divide-white/5">
                                    {opportunities.data.map((opp) => (
                                        <tr key={opp.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                                            <td className="py-3 px-4 font-semibold text-[#1D3027] dark:text-white max-w-xs truncate">
                                                {opp.title}
                                            </td>
                                            <td className="py-3 px-4 font-mono text-[#59685F] dark:text-[#C2CEC6]">
                                                {opp.organization || 'Entreprise Tech'} • {opp.location || 'Sénégal'}
                                            </td>
                                            <td className="py-3 px-4 font-mono uppercase text-[11px]">
                                                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold">
                                                    {opp.type}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-center font-mono">
                                                {opp.deadline ? (
                                                    <span className="font-bold text-[#1D3027] dark:text-white">
                                                        {opp.deadline}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400">Permanente</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-center font-mono">
                                                <button
                                                    onClick={() => handleToggleStatus(opp.id)}
                                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                                                        opp.is_active
                                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                                            : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                                                    }`}
                                                >
                                                    {opp.is_active ? 'Active' : 'Archivée'}
                                                </button>
                                            </td>
                                            <td className="py-3 px-4 text-right flex items-center justify-end gap-2">
                                                {opp.apply_url && (
                                                    <a
                                                        href={opp.apply_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 transition"
                                                        title="Lien externe"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(opp.id, opp.title)}
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
                            <Briefcase className="w-12 h-12 text-amber-600 mx-auto mb-3 opacity-60" />
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                                Aucune opportunité enregistrée
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
                                Vous pouvez publier les premiers stages, programmes de bourses ou concours avec dates limites.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-mono font-bold"
                            >
                                + Publier maintenant
                            </button>
                        </div>
                    )}
                </div>

                {/* Modal Create Opportunity */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-[#1A241D] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#28372B]/15 dark:border-white/10 shadow-2xl relative space-y-5">
                            <div className="flex items-center justify-between border-b border-[#28372B]/10 dark:border-white/10 pb-4">
                                <h2 className="text-lg font-bold text-[#1D3027] dark:text-white flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-amber-600" />
                                    <span>Publier une Opportunité</span>
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
                                        Intitulé de l'offre ou du concours *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Stage Développeur Web Junior Laravel / React"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white"
                                    />
                                    {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                            Type d'opportunité *
                                        </label>
                                        <select
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value as any)}
                                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white font-mono"
                                        >
                                            <option value="stage">Stage en entreprise</option>
                                            <option value="bourse">Programme de Bourse</option>
                                            <option value="concours">Concours / Hackathon</option>
                                            <option value="certification">Certification Pro</option>
                                            <option value="formation">Formation certifiante</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                            Date limite de candidature
                                        </label>
                                        <input
                                            type="date"
                                            value={data.deadline}
                                            onChange={(e) => setData('deadline', e.target.value)}
                                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                            Entreprise / Organisme
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ex: Orange Digital Center"
                                            value={data.organization}
                                            onChange={(e) => setData('organization', e.target.value)}
                                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                            Lieu / Télétravail
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ex: Dakar / Hybride"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                        Lien pour postuler (URL)
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        value={data.apply_url}
                                        onChange={(e) => setData('apply_url', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-slate-500 mb-1 font-semibold">
                                        Description & Profil recherché *
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        placeholder="Missions, technologies exigées, profil et modalités..."
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white"
                                    />
                                    {errors.description && <p className="text-red-500 mt-1">{errors.description}</p>}
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="opp_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded text-amber-600 focus:ring-amber-500"
                                    />
                                    <label htmlFor="opp_active" className="font-semibold text-slate-700 dark:text-slate-300">
                                        Publier immédiatement cette opportunité en ligne
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
                                        className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold font-mono transition"
                                    >
                                        {processing ? 'Publication...' : 'Publier l\'Opportunité'}
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


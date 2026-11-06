import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { CommunityPost, CourseModule, PaginationMeta } from '@/types';
import {
    Users,
    MessageSquare,
    Plus,
    CheckCircle,
    Search,
    Sparkles,
    Filter,
    Clock,
    X,
    ThumbsUp,
} from 'lucide-react';

interface CommunityIndexProps {
    posts: PaginationMeta<CommunityPost>;
    modules: CourseModule[];
    stats: {
        total_posts: number;
        solved_posts: number;
        total_comments: number;
    };
    filters: {
        category?: string;
        module?: string;
        search?: string;
        filter?: string;
    };
}

export default function CommunityIndex({
    posts,
    modules,
    stats,
    filters,
}: CommunityIndexProps) {
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        category: 'entraide',
        module_id: '',
        author_name: '',
    });

    const handleCreatePost = (e: React.FormEvent) => {
        e.preventDefault();
        post('/communaute/creer', {
            onSuccess: () => {
                reset();
                setCreateModalOpen(false);
            },
        });
    };

    const categories = [
        { id: 'all', label: 'Toutes les catégories' },
        { id: 'entraide', label: 'Entraide Générale' },
        { id: 'question_cours', label: 'Questions de Cours' },
        { id: 'projet', label: 'Projets & Code' },
        { id: 'astuce', label: 'Astuces & Tutoriels' },
        { id: 'annonce', label: 'Annonces UN-CHK' },
    ];

    return (
        <AppLayout>
            <Head title="Communauté & Discussion | SDBSNX" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header Title & CTA */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30 text-xs font-mono font-bold mb-3">
                            <Users className="w-3.5 h-3.5" />
                            <span>ENTRAIDE ÉTUDIANTE OUVERTE À TOUS</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
                            Communauté & Discussions
                        </h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
                            Posez vos questions de code, partagez vos projets et résolvez les bugs ensemble. Accès libre et ouvert sans inscription obligatoire.
                        </p>
                    </div>

                    <button
                        onClick={() => setCreateModalOpen(true)}
                        className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition active:scale-95 shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Poser une Question (Sans compte)</span>
                    </button>
                </div>

                {/* Metrics Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-white/5 text-center">
                        <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{stats.total_posts}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-mono mt-0.5">Sujets Ouverts</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-white/5 text-center">
                        <div className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400">{stats.solved_posts}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-mono mt-0.5">Questions Résolues</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-white/5 text-center">
                        <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">{stats.total_comments}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-mono mt-0.5">Réponses</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full text-xs font-semibold">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/communaute?category=${cat.id}`}
                                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                                    (filters.category === cat.id || (!filters.category && cat.id === 'all'))
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white'
                                }`}
                            >
                                {cat.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                        <Link
                            href="/communaute?filter=latest"
                            className={`px-2.5 py-1 rounded-md ${filters.filter === 'latest' || !filters.filter ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
                        >
                            Récents
                        </Link>
                        <span className="text-slate-400">•</span>
                        <Link
                            href="/communaute?filter=solved"
                            className={`px-2.5 py-1 rounded-md ${filters.filter === 'solved' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
                        >
                            Résolus
                        </Link>
                    </div>
                </div>

                {/* Discussions List */}
                <div className="space-y-3.5">
                    {posts.data.map((post) => (
                        <Link
                            key={post.id}
                            href={`/communaute/sujet/${post.slug}`}
                            className="sdbsnx-card rounded-2xl p-5 block group"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                                        <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 text-[11px]">
                                            {post.category}
                                        </span>
                                        {post.module && (
                                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 text-[11px]">
                                                {post.module.name}
                                            </span>
                                        )}
                                        {post.is_solved && (
                                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                                                <CheckCircle className="w-3.5 h-3.5" /> Résolu
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        {post.title}
                                    </h3>

                                    <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                        Par <span className="text-slate-700 dark:text-slate-300 font-semibold">{post.user?.name || 'Étudiant'}</span> ({post.user?.promotion || 'UN-CHK'})
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                                    <div className="flex items-center gap-1">
                                        <ThumbsUp className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                                        <span>{post.likes_count}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                        <span className="font-bold">{post.comments_count || 0}</span>
                                        <span className="text-[11px] text-slate-400">réponses</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Create Modal (ZERO AUTH REQUIRED) */}
                {createModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 dark:border-white/10 relative">
                            <button
                                onClick={() => setCreateModalOpen(false)}
                                className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-1">
                                Poser une question à la communauté
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                Aucun compte requis. Renseignez simplement votre question et votre pseudo.
                            </p>

                            <form onSubmit={handleCreatePost} className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                                            Votre Nom / Pseudo (optionnel)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ex: Moussa, Étudiant L2..."
                                            value={data.author_name}
                                            onChange={(e) => setData('author_name', e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                                            Catégorie *
                                        </label>
                                        <select
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                                        >
                                            <option value="entraide">Entraide Générale</option>
                                            <option value="question_cours">Question de Cours</option>
                                            <option value="projet">Projet Pratique</option>
                                            <option value="astuce">Astuce / Tutoriel</option>
                                            <option value="annonce">Annonce</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                                        Titre de votre question *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Problème d'allocation dynamique avec malloc en langage C..."
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400"
                                    />
                                    {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                                        Description détaillée & Code *
                                    </label>
                                    <textarea
                                        rows={5}
                                        placeholder="Expliquez ce que vous tentez de faire, collez le message d'erreur ou le code..."
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        required
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 font-mono"
                                    />
                                    {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content}</p>}
                                </div>

                                <div className="pt-2 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setCreateModalOpen(false)}
                                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition disabled:opacity-50 font-mono"
                                    >
                                        {processing ? 'Publication...' : 'Publier la question'}
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

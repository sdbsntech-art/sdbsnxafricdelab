import React from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { CommunityPost, PageProps } from '@/types';
import {
    ChevronRight,
    MessageSquare,
    CheckCircle,
    ThumbsUp,
    Send,
    Award,
    Sparkles,
} from 'lucide-react';

interface CommunityShowProps {
    post: CommunityPost;
    relatedPosts: CommunityPost[];
}

export default function CommunityShow({ post, relatedPosts }: CommunityShowProps) {
    const { auth } = usePage<PageProps>().props;

    const { data, setData, post: submitReply, processing, reset, errors } = useForm({
        content: '',
        parent_id: '',
    });

    const handleReply = (e: React.FormEvent) => {
        e.preventDefault();
        submitReply(`/communaute/${post.id}/repondre`, {
            onSuccess: () => reset(),
        });
    };

    const handleLike = () => {
        if (!auth.user) {
            window.location.href = '/login';
            return;
        }
        router.post(`/communaute/${post.id}/like`, {}, { preserveScroll: true });
    };

    const handleMarkSolution = (commentId: number) => {
        router.post(`/communaute/solution/${commentId}`, {}, { preserveScroll: true });
    };

    const isAuthor = auth.user?.id === post.user_id || auth.user?.role === 'admin';

    return (
        <AppLayout>
            <Head title={`${post.title} — Communauté IDA-COURS`} />

            <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
                    <Link href="/" className="hover:text-slate-900 dark:hover:text-white">Accueil</Link>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                    <Link href="/communaute" className="hover:text-slate-900 dark:hover:text-white">Communauté</Link>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold truncate max-w-xs">{post.title}</span>
                </div>

                {/* Main Post Card */}
                <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 mb-8">
                    <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40">
                                {post.category}
                            </span>
                            {post.module && (
                                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-400">
                                    {post.module.name}
                                </span>
                            )}
                            {post.is_solved && (
                                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 font-bold flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Résolu
                                </span>
                            )}
                        </div>

                        <button
                            onClick={handleLike}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-mono border border-slate-200 dark:border-slate-700 transition"
                        >
                            <ThumbsUp className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                            <span>{post.likes_count}</span>
                        </button>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                        {post.title}
                    </h1>

                    <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line font-sans mb-6">
                        {post.content}
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-xs">
                                {post.user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <span className="text-slate-900 dark:text-white font-semibold">{post.user?.name}</span>
                                <span className="text-slate-400 dark:text-slate-500 ml-1.5">({post.user?.promotion || 'UN-CHK'})</span>
                            </div>
                        </div>

                        <div>
                            {post.views_count} vues
                        </div>
                    </div>
                </div>

                {/* Answers / Comments Section */}
                <div className="space-y-6 mb-12">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        <span>Réponses ({post.comments?.length || 0})</span>
                    </h2>

                    {post.comments?.map((comment) => (
                        <div
                            key={comment.id}
                            className={`rounded-2xl p-6 border transition ${
                                comment.is_solution
                                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/50 shadow-lg shadow-emerald-100 dark:shadow-emerald-950/30'
                                    : 'glass-panel border-slate-200 dark:border-white/5'
                            }`}
                        >
                            {comment.is_solution && (
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 text-xs font-bold mb-4">
                                    <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    <span>Solution Validée</span>
                                </div>
                            )}

                            <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line font-sans mb-4">
                                {comment.content}
                            </div>

                            <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 flex items-center justify-center font-bold text-xs">
                                        {comment.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <span className="text-slate-800 dark:text-white font-medium">{comment.user?.name}</span>
                                    <span className="text-slate-400 dark:text-slate-500">({comment.user?.promotion || 'Membre'})</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    {isAuthor && !comment.is_solution && (
                                        <button
                                            onClick={() => handleMarkSolution(comment.id)}
                                            className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-300 dark:border-emerald-500/40 text-[11px] font-bold transition"
                                        >
                                            Marquer comme solution
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reply Form */}
                <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 mb-14">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        Contribuer à cette discussion
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                        Votre réponse aide toute la communauté d'étudiants de l'UN-CHK. Vous recevez +5 points pour chaque contribution.
                    </p>

                    {auth.user ? (
                        <form onSubmit={handleReply} className="space-y-4">
                            <textarea
                                rows={4}
                                placeholder="Rédigez votre réponse ou apportez une précision..."
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                required
                                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-2xl p-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition disabled:opacity-50"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>{processing ? 'Envoi...' : 'Envoyer la réponse (+5 pts)'}</span>
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                                Connectez-vous pour participer aux échanges et cumuler des points.
                            </p>
                            <Link
                                href="/login"
                                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                            >
                                Se connecter
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

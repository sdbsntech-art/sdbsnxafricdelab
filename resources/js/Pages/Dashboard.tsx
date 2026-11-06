import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ResourceCard from '@/Components/ResourceCard';
import { AcademicLevel, CommunityPost, Resource, User } from '@/types';
import {
    Bookmark,
    CheckCircle,
    Award,
    Sparkles,
    BookOpen,
    MessageSquare,
    Clock,
    GraduationCap,
    TrendingUp,
    Shield,
} from 'lucide-react';

interface DashboardProps {
    user: User;
    bookmarkedResources: Resource[];
    inProgressResources: Resource[];
    completedResources: Resource[];
    myPosts: CommunityPost[];
    levels: AcademicLevel[];
    stats: {
        bookmarks_count: number;
        completed_count: number;
        posts_count: number;
        points: number;
        badge: string;
        next_tier: number;
    };
}

export default function Dashboard({
    user,
    bookmarkedResources,
    inProgressResources,
    completedResources,
    myPosts,
    levels,
    stats,
}: DashboardProps) {
    const [activeTab, setActiveTab] = useState<'bookmarks' | 'progress' | 'completed' | 'posts'>('bookmarks');

    const progressPercentage = Math.min(100, Math.round((stats.points / stats.next_tier) * 100));

    return (
        <AppLayout>
            <Head title="Tableau de bord Étudiant — IDA-COURS" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                {/* Profile & Gamification Header */}
                <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-unchk-blue via-unchk-green to-unchk-orange p-[2px] shadow-lg shadow-unchk-blue/20 shrink-0">
                                <div className="w-full h-full bg-slate-100 dark:bg-slate-900 rounded-[14px] flex items-center justify-center font-bold text-2xl text-unchk-blue dark:text-white">
                                    {user.name.charAt(0)}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                        {user.name}
                                    </h1>
                                    {user.role === 'admin' && (
                                        <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40 text-[11px] font-mono font-bold flex items-center gap-1">
                                            <Shield className="w-3 h-3" /> Admin
                                        </span>
                                    )}
                                </div>

                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                                    {user.promotion || 'Filière Informatique & Télécoms (UN-CHK)'} · {user.email}
                                </p>

                                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-unchk-blue/10 dark:bg-indigo-600/20 border border-unchk-blue/20 dark:border-indigo-500/30 text-unchk-blue dark:text-indigo-300 text-xs font-bold">
                                    <Award className="w-3.5 h-3.5 text-unchk-orange dark:text-cyan-400" />
                                    <span>Titre : {stats.badge}</span>
                                </div>
                            </div>
                        </div>

                        {/* Gamification progress bar */}
                        <div className="sm:text-right shrink-0 min-w-[200px]">
                            <div className="text-2xl font-extrabold text-unchk-blue dark:text-cyan-400 font-mono">
                                {stats.points} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">points XP</span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                                Prochain rang à {stats.next_tier} pts
                            </div>

                            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 mt-2 overflow-hidden border border-slate-300 dark:border-slate-700">
                                <div
                                    className="bg-gradient-to-r from-unchk-blue via-unchk-green to-unchk-orange h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/5 text-center">
                        <Bookmark className="w-5 h-5 text-amber-500 dark:text-amber-400 mx-auto mb-1" />
                        <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">{stats.bookmarks_count}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono mt-0.5">Favoris Sauvegardés</div>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/5 text-center">
                        <CheckCircle className="w-5 h-5 text-unchk-green dark:text-emerald-400 mx-auto mb-1" />
                        <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">{stats.completed_count}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono mt-0.5">Cours Validés</div>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/5 text-center">
                        <MessageSquare className="w-5 h-5 text-unchk-blue dark:text-cyan-400 mx-auto mb-1" />
                        <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">{stats.posts_count}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono mt-0.5">Questions Posées</div>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/5 text-center">
                        <GraduationCap className="w-5 h-5 text-purple-600 dark:text-indigo-400 mx-auto mb-1" />
                        <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">3 Niveaux</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono mt-0.5">Cursus Libre</div>
                    </div>
                </div>

                {/* Main Content Tabs */}
                <div>
                    <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/5 pb-3 mb-6 text-sm font-semibold overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('bookmarks')}
                            className={`px-4 py-2 rounded-xl transition shrink-0 ${
                                activeTab === 'bookmarks'
                                    ? 'bg-unchk-blue text-white font-bold shadow-md shadow-unchk-blue/20'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            Mes Favoris ({bookmarkedResources.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('progress')}
                            className={`px-4 py-2 rounded-xl transition shrink-0 ${
                                activeTab === 'progress'
                                    ? 'bg-unchk-blue text-white font-bold shadow-md shadow-unchk-blue/20'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            En Cours ({inProgressResources.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`px-4 py-2 rounded-xl transition shrink-0 ${
                                activeTab === 'completed'
                                    ? 'bg-unchk-blue text-white font-bold shadow-md shadow-unchk-blue/20'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            Terminés ({completedResources.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`px-4 py-2 rounded-xl transition shrink-0 ${
                                activeTab === 'posts'
                                    ? 'bg-unchk-blue text-white font-bold shadow-md shadow-unchk-blue/20'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            Mes Discussions ({myPosts.length})
                        </button>
                    </div>

                    {/* Tab 1: Bookmarks */}
                    {activeTab === 'bookmarks' && (
                        <div>
                            {bookmarkedResources.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {bookmarkedResources.map((res) => (
                                        <ResourceCard key={res.id} resource={res} isBookmarked={true} />
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-panel p-10 rounded-2xl text-center border border-slate-200 dark:border-white/5">
                                    <Bookmark className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                                    <h4 className="text-slate-900 dark:text-white font-bold">Aucun cours en favoris</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                                        Cliquez sur l'icône marque-page sur n'importe quel cours pour l'enregistrer ici et le retrouver rapidement.
                                    </p>
                                    <Link
                                        href="/cours"
                                        className="mt-4 inline-block px-4 py-2 rounded-xl bg-unchk-blue text-white text-xs font-semibold shadow-md shadow-unchk-blue/20"
                                    >
                                        Parcourir les cours
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab 2: In Progress */}
                    {activeTab === 'progress' && (
                        <div>
                            {inProgressResources.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {inProgressResources.map((res) => (
                                        <ResourceCard key={res.id} resource={res} />
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-panel p-10 rounded-2xl text-center border border-slate-200 dark:border-white/5">
                                    <Clock className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                                    <h4 className="text-slate-900 dark:text-white font-bold">Aucun cours entamé récemment</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        Consultez une ressource pour qu'elle apparaisse dans votre suivi de travail.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab 3: Completed */}
                    {activeTab === 'completed' && (
                        <div>
                            {completedResources.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {completedResources.map((res) => (
                                        <ResourceCard key={res.id} resource={res} />
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-panel p-10 rounded-2xl text-center border border-slate-200 dark:border-white/5">
                                    <CheckCircle className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                                    <h4 className="text-slate-900 dark:text-white font-bold">Pas encore de cours validés</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        Sur chaque page de cours, cliquez sur "Terminer" lorsque vous avez assimilé le document.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab 4: My Posts */}
                    {activeTab === 'posts' && (
                        <div className="space-y-3">
                            {myPosts.length > 0 ? (
                                myPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/communaute/sujet/${post.slug}`}
                                        className="glass-card rounded-2xl p-4 border border-slate-200 dark:border-white/5 flex items-center justify-between block group"
                                    >
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-unchk-blue dark:group-hover:text-cyan-300 transition">
                                                {post.title}
                                            </h4>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                                                {post.category} · {post.comments_count || 0} réponses
                                            </div>
                                        </div>
                                        <span className="text-unchk-blue dark:text-indigo-400 text-xs font-semibold font-mono">
                                            Consulter →
                                        </span>
                                    </Link>
                                ))
                            ) : (
                                <div className="glass-panel p-10 rounded-2xl text-center border border-slate-200 dark:border-white/5">
                                    <MessageSquare className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                                    <h4 className="text-slate-900 dark:text-white font-bold">Aucune question posée</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        N'hésitez pas à demander de l'aide dans le forum d'entraide !
                                    </p>
                                    <Link
                                        href="/communaute"
                                        className="mt-4 inline-block px-4 py-2 rounded-xl bg-unchk-blue text-white text-xs font-semibold shadow-md shadow-unchk-blue/20"
                                    >
                                        Aller au forum
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

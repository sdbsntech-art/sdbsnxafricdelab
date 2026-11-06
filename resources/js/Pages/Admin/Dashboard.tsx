import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import { Resource, User } from '@/types';
import {
    Shield,
    BookOpen,
    Download,
    Eye,
    Users,
    FolderTree,
    Plus,
    ExternalLink,
    CheckCircle2,
    Briefcase,
    MessageSquare,
    ShieldCheck,
    Rocket,
    Library,
} from 'lucide-react';

interface ContactMsg {
    id: number;
    name: string;
    email: string;
    type: string;
    subject: string;
    message: string;
    created_at: string;
}

interface AdminDashboardProps {
    stats: {
        total_resources: number;
        total_downloads: number;
        total_views: number;
        total_modules: number;
        total_users: number;
        total_posts: number;
        total_opportunities: number;
        total_messages?: number;
        total_cyber?: number;
        total_library?: number;
        total_entrepreneurship?: number;
    };
    latestUsers: User[];
    recentResources: Resource[];
    popularResources: Resource[];
    latestMessages?: ContactMsg[];
}

export default function AdminDashboard({
    stats,
    latestUsers,
    recentResources,
    popularResources = [],
    latestMessages = [],
}: AdminDashboardProps) {
    return (
        <AppLayout>
            <Head title="Panneau d'Administration SDBSNX — Données Réelles" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-mono text-xs font-bold uppercase tracking-wider mb-1">
                            <Shield className="w-4 h-4" />
                            <span>Panneau d'Administration SDBSNX</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                            Gestion Globale de la Plateforme
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Données réelles et certifiées de la base MySQL locale (aucune simulation).
                        </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <Link
                            href="/admin/ressources"
                            className="px-4 py-2.5 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition font-mono"
                        >
                            <BookOpen className="w-4 h-4" />
                            <span>Gérer les {stats.total_resources} Ressources</span>
                        </Link>
                    </div>
                </div>

                {/* Unified Admin Navigation Bar */}
                <AdminNav />

                {/* Overall Real Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                    <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#1A241D]">
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">Total Ressources</div>
                        <div className="text-2xl sm:text-3xl font-bold font-mono text-[#1E5B45] dark:text-[#62A87A] mt-2">
                            {stats.total_resources}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 font-sans">Supports réels en ligne</div>
                    </div>

                    <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#1A241D]">
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">Téléchargements</div>
                        <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-2">
                            {stats.total_downloads}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 font-sans">Compteur direct (réel)</div>
                    </div>

                    <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#1A241D]">
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">Étudiants Inscrits</div>
                        <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-2">
                            {stats.total_users}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 font-sans">Comptes actifs MySQL</div>
                    </div>

                    <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#1A241D]">
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">Modules Actifs</div>
                        <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-2">
                            {stats.total_modules}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 font-sans">Matières L1 · L2 · L3</div>
                    </div>

                    <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#1A241D] col-span-2 sm:col-span-1">
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">Messages Reçus</div>
                        <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-2">
                            {stats.total_messages || 0}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 font-sans">Formulaire & Suggestions</div>
                    </div>
                </div>

                {/* Rubriques Spécifiques de Publication (Cybersécurité, Entrepreneuriat, Bibliothèque, Opportunités) */}
                <div className="space-y-3">
                    <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                        <FolderTree className="w-4 h-4 text-[#1E5B45] dark:text-[#62A87A]" />
                        <span>Espaces de Publication Dédiés</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Carte Cybersécurité */}
                        <Link
                            href="/admin/cybersecurite"
                            className="p-4 rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 hover:border-[#1E5B45] transition group shadow-xs"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="w-9 h-9 rounded-xl bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#1E5B45]/10 text-[#1E5B45]">
                                    {stats.total_cyber || 0} cours
                                </span>
                            </div>
                            <h3 className="font-bold text-sm text-[#1D3027] dark:text-white group-hover:text-[#1E5B45] transition-colors">
                                Cybersécurité & Réseaux
                            </h3>
                            <p className="text-[11px] text-[#7D897F] dark:text-[#849187] mt-1">
                                Publier des cours, fiches OWASP et labs de sécurité.
                            </p>
                        </Link>

                        {/* Carte Entrepreneuriat */}
                        <Link
                            href="/admin/entrepreneuriat"
                            className="p-4 rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 hover:border-[#A8743F] transition group shadow-xs"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="w-9 h-9 rounded-xl bg-[#A8743F]/10 text-[#A8743F] dark:text-[#D5A45F] flex items-center justify-center">
                                    <Rocket className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#A8743F]/10 text-[#A8743F]">
                                    {stats.total_entrepreneurship || 0} docs
                                </span>
                            </div>
                            <h3 className="font-bold text-sm text-[#1D3027] dark:text-white group-hover:text-[#A8743F] transition-colors">
                                Entrepreneuriat & Startups
                            </h3>
                            <p className="text-[11px] text-[#7D897F] dark:text-[#849187] mt-1">
                                Publier des canevas BMC, pitch decks et guides juridiques.
                            </p>
                        </Link>

                        {/* Carte Bibliothèque */}
                        <Link
                            href="/admin/bibliotheque"
                            className="p-4 rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 hover:border-[#377657] transition group shadow-xs"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="w-9 h-9 rounded-xl bg-[#377657]/10 text-[#377657] dark:text-[#62A87A] flex items-center justify-center">
                                    <Library className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#377657]/10 text-[#377657]">
                                    {stats.total_library || 0} e-books
                                </span>
                            </div>
                            <h3 className="font-bold text-sm text-[#1D3027] dark:text-white group-hover:text-[#377657] transition-colors">
                                Bibliothèque Numérique
                            </h3>
                            <p className="text-[11px] text-[#7D897F] dark:text-[#849187] mt-1">
                                Publier des livres de référence et synthèses d'ouvrages.
                            </p>
                        </Link>

                        {/* Carte Opportunités */}
                        <Link
                            href="/admin/opportunites"
                            className="p-4 rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 hover:border-amber-600 transition group shadow-xs"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                                    <Briefcase className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                                    {stats.total_opportunities || 0} offres
                                </span>
                            </div>
                            <h3 className="font-bold text-sm text-[#1D3027] dark:text-white group-hover:text-amber-600 transition-colors">
                                Opportunités, Stages & Bourses
                            </h3>
                            <p className="text-[11px] text-[#7D897F] dark:text-[#849187] mt-1">
                                Publier des offres avec dates limites et alertes urgentes.
                            </p>
                        </Link>
                    </div>
                </div>

                {/* Detailed Sections: Recent Resources & Users */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Downloaded / Recent Resources */}
                    <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#1A241D] space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/5">
                            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-[#1E5B45] dark:text-[#62A87A]" />
                                <span>Ressources Pédagogiques Récentes</span>
                            </h2>
                            <Link href="/admin/ressources" className="text-xs text-[#1E5B45] dark:text-[#62A87A] hover:underline font-mono">
                                Voir tout ({stats.total_resources}) →
                            </Link>
                        </div>

                        <div className="space-y-2.5">
                            {recentResources.map((res) => (
                                <div
                                    key={res.id}
                                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4"
                                >
                                    <div className="space-y-0.5 min-w-0">
                                        <div className="text-[11px] font-mono text-[#1E5B45] dark:text-[#62A87A] truncate">
                                            {res.module?.name || 'Matière'} • {res.academic_level?.short_name || 'Licence'}
                                        </div>
                                        <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                                            {res.title}
                                        </div>
                                    </div>
                                    <div className="text-right font-mono text-xs shrink-0">
                                        <span className="font-bold text-slate-900 dark:text-white">{res.downloads_count}</span>
                                        <span className="text-slate-500 dark:text-slate-400 text-[10px] block">téléch.</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Latest Users Registered */}
                    <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#1A241D] space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/5">
                            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Users className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                                <span>Comptes Utilisateurs Enregistrés</span>
                            </h2>
                            <Link href="/admin/utilisateurs" className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-mono">
                                Gérer ({stats.total_users}) →
                            </Link>
                        </div>

                        <div className="space-y-2.5">
                            {latestUsers.map((u) => (
                                <div
                                    key={u.id}
                                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">
                                            {u.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{u.name}</div>
                                            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">{u.email}</div>
                                        </div>
                                    </div>

                                    <div className="text-right text-xs font-mono shrink-0">
                                        <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/30 text-[11px] font-bold uppercase">
                                            {u.role || 'student'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section : Messages & Suggestions reçus (Stockage MySQL) */}
                <div className="sdbsnx-card p-6 rounded-3xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#28372B]/10 dark:border-white/10">
                        <h2 className="text-base font-bold text-[#1D3027] dark:text-white flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-[#1E5B45] dark:text-[#62A87A]" />
                            <span>Derniers Messages de Contact & Suggestions (MySQL)</span>
                        </h2>
                        <Link
                            href="/admin/messages"
                            className="text-xs font-mono font-bold bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] px-2.5 py-1 rounded-full hover:underline"
                        >
                            Voir tous les {stats.total_messages || 0} messages →
                        </Link>
                    </div>

                    {latestMessages && latestMessages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {latestMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className="p-4 rounded-2xl bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/10 dark:border-white/5 space-y-2"
                                >
                                    <div className="flex items-center justify-between text-xs font-mono">
                                        <span className="font-bold text-[#1E5B45] dark:text-[#62A87A] uppercase text-[10px] px-2 py-0.5 rounded bg-[#1E5B45]/10">
                                            {msg.type}
                                        </span>
                                        <span className="text-[#7D897F] text-[11px]">
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="font-bold text-sm text-[#1D3027] dark:text-white">
                                        {msg.subject}
                                    </div>
                                    <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] line-clamp-3">
                                        {msg.message}
                                    </p>
                                    <div className="pt-2 border-t border-[#28372B]/10 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-[#7D897F]">
                                        <span>De: <strong>{msg.name}</strong> ({msg.email})</span>
                                        <a
                                            href={`/contact/whatsapp-notify/${msg.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                                        >
                                            Ouvrir WhatsApp →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-[#7D897F] py-4 text-center font-mono">
                            Aucun message de contact enregistré pour le moment dans MySQL.
                        </p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

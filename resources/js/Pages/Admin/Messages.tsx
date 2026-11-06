import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import {
    MessageSquare,
    Search,
    Trash2,
    CheckCircle2,
    Clock,
    Mail,
    User,
    ExternalLink,
    Filter,
} from 'lucide-react';

interface ContactMessageItem {
    id: number;
    name: string;
    email: string;
    type: string;
    subject: string;
    message: string;
    ip_address: string;
    is_read: boolean;
    created_at: string;
}

interface PaginatedMessages {
    data: ContactMessageItem[];
    current_page: number;
    last_page: number;
    total: number;
}

interface MessagesProps {
    messages: PaginatedMessages;
    filters: {
        search?: string;
        type?: string;
    };
}

export default function MessagesAdmin({ messages, filters }: MessagesProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedType, setSelectedType] = useState(filters.type || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/messages', { search: search || undefined, type: selectedType || undefined }, { preserveState: true });
    };

    const handleTypeFilter = (type: string) => {
        setSelectedType(type);
        router.get('/admin/messages', { search: search || undefined, type: type || undefined }, { preserveState: true });
    };

    const handleToggleRead = (id: number) => {
        router.post(`/admin/messages/${id}/lu`, {}, { preserveScroll: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer définitivement ce message ?')) {
            router.delete(`/admin/messages/${id}`);
        }
    };

    const types = [
        { id: '', label: 'Tous les messages' },
        { id: 'general', label: 'Général' },
        { id: 'donnees_personnelles', label: 'Données Personnelles (CDP)' },
        { id: 'droits_auteur', label: 'Droits d\'auteur' },
        { id: 'bug_technique', label: 'Bug technique' },
        { id: 'partenariat', label: 'Partenariat' },
    ];

    return (
        <AppLayout>
            <Head title="Messages & Suggestions reçus — Administration SDBSNX" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>Boîte de Réception MySQL</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                            Messages & Suggestions ({messages.total})
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Messages envoyés depuis le formulaire de contact officiel, stockés dans votre base locale MySQL.
                        </p>
                    </div>
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
                                    selectedType === t.id ? 'bg-[#1E5B45] text-white' : 'bg-[#F7F5EF] dark:bg-[#101713] text-[#59685F] dark:text-[#C2CEC6]'
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
                            placeholder="Rechercher nom, email, sujet..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-[#1D3027] dark:text-white placeholder-[#7D897F] focus:outline-none focus:ring-2 focus:ring-[#1E5B45]"
                        />
                    </form>
                </div>

                {/* Messages List */}
                <div className="space-y-4">
                    {messages.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {messages.data.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`sdbsnx-card rounded-2xl p-5 border transition flex flex-col justify-between ${
                                        msg.is_read
                                            ? 'bg-white dark:bg-[#1A241D] border-[#28372B]/10 dark:border-white/10 opacity-90'
                                            : 'bg-white dark:bg-[#1A241D] border-emerald-500/40 shadow-sm'
                                    }`}
                                >
                                    <div className="space-y-2.5">
                                        <div className="flex items-center justify-between text-xs font-mono">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-[#1E5B45] dark:text-[#62A87A] uppercase text-[10px] px-2 py-0.5 rounded bg-[#1E5B45]/10">
                                                    {msg.type}
                                                </span>
                                                {!msg.is_read && (
                                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold">
                                                        NOUVEAU
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-slate-400 text-[11px]">
                                                {new Date(msg.created_at).toLocaleString()}
                                            </span>
                                        </div>

                                        <h3 className="font-bold text-sm text-[#1D3027] dark:text-white">
                                            {msg.subject}
                                        </h3>

                                        <div className="p-3 rounded-xl bg-[#F7F5EF] dark:bg-[#101713] text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                                            {msg.message}
                                        </div>

                                        <div className="text-[11px] font-mono text-[#59685F] dark:text-[#849187] space-y-0.5">
                                            <div>De : <strong>{msg.name}</strong></div>
                                            <div>Email : <a href={`mailto:${msg.email}`} className="text-[#1E5B45] dark:text-[#62A87A] hover:underline">{msg.email}</a></div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-[#28372B]/10 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleToggleRead(msg.id)}
                                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                                                    msg.is_read
                                                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                                                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                                }`}
                                            >
                                                {msg.is_read ? 'Marquer non-lu' : 'Marquer comme lu'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(msg.id)}
                                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition"
                                                title="Supprimer le message"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <a
                                            href={`/contact/whatsapp-notify/${msg.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                                        >
                                            <span>Ouvrir WhatsApp →</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 px-4 sdbsnx-card rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                            <MessageSquare className="w-12 h-12 text-[#1E5B45] mx-auto mb-3 opacity-60" />
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                                Aucun message de contact pour le moment
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                Tous les messages et suggestions envoyés depuis la page contact seront centralisés ici avec accès direct WhatsApp.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}


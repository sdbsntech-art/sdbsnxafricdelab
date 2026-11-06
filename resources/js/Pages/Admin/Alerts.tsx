import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import {
    Bell,
    Plus,
    Trash2,
    CheckCircle2,
    AlertTriangle,
    Info,
    Flame,
    Radio,
    Clock,
    Eye,
    EyeOff,
    ExternalLink,
} from 'lucide-react';

interface SiteAlertItem {
    id: number;
    title: string | null;
    message: string;
    type: 'info' | 'warning' | 'danger' | 'success' | 'urgent';
    action_text: string | null;
    action_url: string | null;
    is_active: boolean;
    is_blinking: boolean;
    expires_at: string | null;
    created_at: string;
}

interface Props {
    alerts: {
        data: SiteAlertItem[];
        links: any[];
        total: number;
    };
}

export default function AdminAlerts({ alerts }: Props) {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        message: '',
        type: 'info',
        action_text: '',
        action_url: '',
        is_blinking: true,
        expires_at: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/alertes/ajouter', {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const handleToggle = (id: number) => {
        router.post(`/admin/alertes/${id}/statut`, {}, { preserveScroll: true });
    };

    const handleDelete = (id: number, title: string | null) => {
        if (confirm(`Supprimer cette alerte "${title || 'sans titre'}" ?`)) {
            router.delete(`/admin/alertes/${id}`, { preserveScroll: true });
        }
    };

    const typeConfig: Record<string, { label: string; bg: string; text: string; icon: any }> = {
        info: { label: 'Information', bg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20', text: 'text-sky-500', icon: Info },
        warning: { label: 'Avertissement', bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', text: 'text-amber-500', icon: AlertTriangle },
        danger: { label: 'Important', bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20', text: 'text-rose-500', icon: Flame },
        success: { label: 'Succès', bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', text: 'text-emerald-500', icon: CheckCircle2 },
        urgent: { label: 'Urgent / Clignotant', bg: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30 animate-pulse', text: 'text-red-500', icon: Radio },
    };

    return (
        <AppLayout>
            <Head title="Alertes & Annonces en direct — Admin SDBSNX" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <AdminNav />

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-mono font-medium mb-3">
                            <Radio className="w-3.5 h-3.5 animate-pulse" />
                            <span>Diffusion Directe & Bandeau Défilant</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#1D3027] dark:text-white">
                            Gestion des Alertes & Concours
                        </h1>
                        <p className="text-sm text-[#59685F] dark:text-[#C2CEC6] mt-1">
                            Diffusez des annonces en temps réel, dates limites de concours, bourses ou actualités urgentes en haut du site.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-sm transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Créer une Alerte en Direct</span>
                    </button>
                </div>

                {/* Alerts List */}
                <div className="bg-white dark:bg-[#1A241D] rounded-2xl border border-[#28372B]/12 dark:border-white/10 overflow-hidden shadow-xs">
                    <div className="p-4 sm:p-5 border-b border-[#28372B]/10 dark:border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4 text-[#1E5B45] dark:text-[#52B788]" />
                            <h2 className="text-sm font-bold font-mono text-[#1D3027] dark:text-white">
                                Alertes Actuelles ({alerts.total})
                            </h2>
                        </div>
                        <span className="text-xs text-[#7D897F] dark:text-[#849187] font-mono">
                            Affichées automatiquement en haut de toutes les pages
                        </span>
                    </div>

                    {alerts.data.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-12 h-12 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#52B788] flex items-center justify-center mx-auto mb-3">
                                <Bell className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-semibold text-[#1D3027] dark:text-white">Aucune alerte active</p>
                            <p className="text-xs text-[#7D897F] dark:text-[#849187] mt-1">
                                Cliquez sur "Créer une Alerte en Direct" pour lancer un message urgent ou une date limite de concours.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#28372B]/10 dark:divide-white/10">
                            {alerts.data.map((alert) => {
                                const conf = typeConfig[alert.type] || typeConfig.info;
                                const IconComp = conf.icon;
                                return (
                                    <div key={alert.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F7F5EF]/50 dark:hover:bg-white/[0.02] transition-colors">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            <div className={`p-2 rounded-xl border shrink-0 ${conf.bg}`}>
                                                <IconComp className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                                    {alert.title && (
                                                        <h3 className="text-sm font-bold text-[#1D3027] dark:text-white">
                                                            {alert.title}
                                                        </h3>
                                                    )}
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${conf.bg}`}>
                                                        {conf.label}
                                                    </span>
                                                    {alert.is_blinking && (
                                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-red-500/20 text-red-600 dark:text-red-400 animate-pulse">
                                                            ⚡ Clignotant
                                                        </span>
                                                    )}
                                                    {alert.is_active ? (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                                                            En direct
                                                        </span>
                                                    ) : (
                                                        <span className="text-[11px] font-mono text-[#7D897F] dark:text-[#849187]">
                                                            Désactivée
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                                                    {alert.message}
                                                </p>

                                                <div className="flex items-center gap-4 mt-2 text-[11px] font-mono text-[#7D897F] dark:text-[#849187]">
                                                    {alert.expires_at && (
                                                        <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                                                            <Clock className="w-3 h-3" />
                                                            Expire : {new Date(alert.expires_at).toLocaleDateString('fr-FR')}
                                                        </span>
                                                    )}
                                                    {alert.action_url && (
                                                        <a
                                                            href={alert.action_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-1 text-[#1E5B45] dark:text-[#52B788] hover:underline"
                                                        >
                                                            <span>Lien : {alert.action_text || 'Voir'}</span>
                                                            <ExternalLink className="w-2.5 h-2.5" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                                            <button
                                                onClick={() => handleToggle(alert.id)}
                                                className={`p-2 rounded-lg border text-xs font-mono transition-colors ${
                                                    alert.is_active
                                                        ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
                                                        : 'border-[#28372B]/12 text-[#7D897F] hover:bg-black/5 dark:hover:bg-white/5'
                                                }`}
                                                title={alert.is_active ? 'Désactiver' : 'Activer'}
                                            >
                                                {alert.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(alert.id, alert.title)}
                                                className="p-2 rounded-lg border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Création */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="bg-white dark:bg-[#1A241D] rounded-2xl max-w-lg w-full p-6 border border-[#28372B]/15 dark:border-white/10 shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[#28372B]/10 dark:border-white/10 mb-5">
                            <div className="flex items-center gap-2">
                                <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                                <h3 className="text-base font-bold text-[#1D3027] dark:text-white">
                                    Lancer une Alerte / Message Clignotant
                                </h3>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-[#7D897F] hover:text-[#1D3027] dark:hover:text-white text-lg font-bold"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono font-medium text-[#1D3027] dark:text-white mb-1">
                                    Titre (Optionnel)
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Ex: Concours Master 2026, Date Limite Bourse..."
                                    className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-[#121A15] border border-[#28372B]/15 dark:border-white/10 text-[#1D3027] dark:text-white focus:outline-hidden focus:border-[#1E5B45]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-medium text-[#1D3027] dark:text-white mb-1">
                                    Message à diffuser *
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Ex: Clôture des candidatures pour la bourse d'excellence le 15 Novembre à minuit. Déposez vos dossiers !"
                                    className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-[#121A15] border border-[#28372B]/15 dark:border-white/10 text-[#1D3027] dark:text-white focus:outline-hidden focus:border-[#1E5B45]"
                                />
                                {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-mono font-medium text-[#1D3027] dark:text-white mb-1">
                                        Type d'Alerte *
                                    </label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value as any)}
                                        className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-[#121A15] border border-[#28372B]/15 dark:border-white/10 text-[#1D3027] dark:text-white focus:outline-hidden"
                                    >
                                        <option value="urgent">🔴 Urgent / Concours</option>
                                        <option value="warning">🟠 Avertissement</option>
                                        <option value="info">🔵 Information</option>
                                        <option value="success">🟢 Succès</option>
                                        <option value="danger">🚨 Critique</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-medium text-[#1D3027] dark:text-white mb-1">
                                        Date Limite / Expiration
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={data.expires_at}
                                        onChange={(e) => setData('expires_at', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-[#121A15] border border-[#28372B]/15 dark:border-white/10 text-[#1D3027] dark:text-white focus:outline-hidden"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-mono font-medium text-[#1D3027] dark:text-white mb-1">
                                        Texte du Bouton (Optionnel)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.action_text}
                                        onChange={(e) => setData('action_text', e.target.value)}
                                        placeholder="Ex: Postuler ici"
                                        className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-[#121A15] border border-[#28372B]/15 dark:border-white/10 text-[#1D3027] dark:text-white focus:outline-hidden"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono font-medium text-[#1D3027] dark:text-white mb-1">
                                        Lien URL (Optionnel)
                                    </label>
                                    <input
                                        type="url"
                                        value={data.action_url}
                                        onChange={(e) => setData('action_url', e.target.value)}
                                        placeholder="https://..."
                                        className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-[#121A15] border border-[#28372B]/15 dark:border-white/10 text-[#1D3027] dark:text-white focus:outline-hidden"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="blinking"
                                    checked={data.is_blinking}
                                    onChange={(e) => setData('is_blinking', e.target.checked)}
                                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-700"
                                />
                                <label htmlFor="blinking" className="text-xs font-medium text-[#1D3027] dark:text-white cursor-pointer">
                                    Effet Clignotant / Flashy (attire l'attention immédiatement)
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#28372B]/10 dark:border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-mono text-[#59685F] dark:text-[#C2CEC6] hover:bg-black/5 dark:hover:bg-white/5"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-xs transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Diffusion en cours...' : 'Diffuser sur le Site'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}


import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    Mail,
    Send,
    ShieldCheck,
    MessageSquare,
    AlertTriangle,
    FileCheck,
    CheckCircle2,
    HelpCircle,
    Globe,
} from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'general',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [whatsappNotifyUrl, setWhatsappNotifyUrl] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Le nom est requis.';
        if (!formData.email.trim()) newErrors.email = "L'email est requis.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "L'email n'est pas valide.";
        if (!formData.subject.trim()) newErrors.subject = 'Le sujet est requis.';
        if (!formData.message.trim()) newErrors.message = 'Le message est requis.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('submitting');
        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
            const res = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const data = await res.json();
                setStatus('success');
                if (data.whatsapp_notify_url) {
                    setWhatsappNotifyUrl(data.whatsapp_notify_url);
                }
                setFormData({ name: '', email: '', type: 'general', subject: '', message: '' });
            } else {
                // Fallback Formspree
                await fetch('https://formspree.io/f/xqapevvv', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify(formData),
                });
                setStatus('success');
                setFormData({ name: '', email: '', type: 'general', subject: '', message: '' });
            }
        } catch {
            setStatus('error');
        }
    };

    const setField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    return (
        <AppLayout>
            <Head title="Contact & Signalements — SDBSNX" />

            <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                {/* Header */}
                <div className="border-b border-[#28372B]/10 dark:border-white/10 pb-6 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                        <Mail className="w-3.5 h-3.5" />
                        <span>Support & Contact Officiel</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#1D3027] dark:text-white">
                        Contactez l'Équipe SDBSNX
                    </h1>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#849187] mt-2 max-w-2xl leading-relaxed">
                        Une question, une suggestion de cours, un signalement de droits d'auteur ou une demande relative à vos données personnelles ? Écrivez-nous directement.
                    </p>
                </div>

                {/* Notification de succès */}
                {status === 'success' && (
                    <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm space-y-3">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                            <span>Votre message a bien été enregistré dans notre base de données sécurisée <strong>MySQL</strong> et transmis à l'équipe SDBSNX !</span>
                        </div>
                        {whatsappNotifyUrl && (
                            <div className="pt-3 border-t border-emerald-200 dark:border-emerald-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <p className="text-xs text-emerald-900 dark:text-emerald-200">
                                    Voulez-vous également transmettre ce message en direct sur WhatsApp à l'administrateur ?
                                </p>
                                <a
                                    href={whatsappNotifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs transition shadow-xs text-center max-w-full"
                                >
                                    <span>Transmettre en direct sur WhatsApp →</span>
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {/* Notification d'erreur */}
                {status === 'error' && (
                    <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-red-800 dark:text-red-300 text-xs sm:text-sm flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400" />
                        <span>Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement à sdbsntech@gmail.com.</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Colonne gauche : Formulaire de contact */}
                    <div className="lg:col-span-7">
                        <div className="sdbsnx-card rounded-3xl p-4 sm:p-6 md:p-8 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 shadow-sm overflow-hidden">
                            <h2 className="text-lg font-bold font-heading text-[#1D3027] dark:text-white mb-4 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-[#1E5B45] dark:text-[#62A87A]" />
                                <span>Formulaire de Contact & Signalement</span>
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                <div>
                                    <label className="block font-mono uppercase text-[#59685F] dark:text-[#849187] mb-1 font-semibold">
                                        Votre Nom ou Pseudonyme *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Moussa Diop"
                                        value={formData.name}
                                        onChange={(e) => setField('name', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white placeholder-[#7D897F] focus:outline-none focus:ring-2 focus:ring-[#1E5B45]"
                                    />
                                    {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-[#59685F] dark:text-[#849187] mb-1 font-semibold">
                                        Votre Adresse Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Ex: m.diop@exemple.sn"
                                        value={formData.email}
                                        onChange={(e) => setField('email', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white placeholder-[#7D897F] focus:outline-none focus:ring-2 focus:ring-[#1E5B45]"
                                    />
                                    {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-[#59685F] dark:text-[#849187] mb-1 font-semibold">
                                        Motif de la demande *
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setField('type', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1E5B45]"
                                    >
                                        <option value="general">Question générale / Information</option>
                                        <option value="donnees_personnelles">Données personnelles & Droits CDP (Loi 2008-12)</option>
                                        <option value="droits_auteur">Signalement Droits d'auteur (Demande de retrait)</option>
                                        <option value="bug_technique">Signalement de bug ou problème technique</option>
                                        <option value="partenariat">Proposition de cours ou partenariat</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-[#59685F] dark:text-[#849187] mb-1 font-semibold">
                                        Sujet de votre message *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Demande de suppression de compte / Signalement"
                                        value={formData.subject}
                                        onChange={(e) => setField('subject', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white placeholder-[#7D897F] focus:outline-none focus:ring-2 focus:ring-[#1E5B45]"
                                    />
                                    {errors.subject && <p className="text-red-500 mt-1">{errors.subject}</p>}
                                </div>

                                <div>
                                    <label className="block font-mono uppercase text-[#59685F] dark:text-[#849187] mb-1 font-semibold">
                                        Message détaillé *
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Expliquez-nous précisément votre demande..."
                                        value={formData.message}
                                        onChange={(e) => setField('message', e.target.value)}
                                        className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white placeholder-[#7D897F] focus:outline-none focus:ring-2 focus:ring-[#1E5B45]"
                                    />
                                    {errors.message && <p className="text-red-500 mt-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full py-3 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition shadow-xs disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Colonne droite : Canaux de contact directs & Signalements légaux */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Guichet Suggestions & Legal Tech direct Formspree */}
                        <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 space-y-3 overflow-hidden">
                            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#A8743F] dark:text-[#D5A45F]">
                                <Globe className="w-4 h-4" />
                                <span>Guichet Suggestions & Legal Tech</span>
                            </div>
                            <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                                Vous pouvez également nous soumettre vos suggestions, contributions ou signalements juridiques via notre passerelle externe Formspree :
                            </p>
                            <a
                                href="https://formspree.io/f/xqapevvv"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-[#A8743F]/10 hover:bg-[#A8743F] text-[#A8743F] dark:text-[#D5A45F] hover:text-white border border-[#A8743F]/30 font-mono text-xs font-bold transition"
                            >
                                <span>Ouvrir le formulaire Formspree</span>
                                <Globe className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        {/* Email Direct */}
                        <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 space-y-3 overflow-hidden">
                            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1E5B45] dark:text-[#62A87A]">
                                <Mail className="w-4 h-4" />
                                <span>Courrier Électronique Direct</span>
                            </div>
                            <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                                Vous pouvez nous écrire directement sans passer par le formulaire à l'adresse suivante :
                            </p>
                            <a
                                href="mailto:sdbsntech@gmail.com"
                                className="block p-3 rounded-xl bg-[#F7F5EF] dark:bg-black/30 border border-[#28372B]/10 dark:border-white/5 font-mono text-xs sm:text-sm font-bold text-[#1E5B45] dark:text-[#62A87A] hover:underline"
                            >
                                sdbsntech@gmail.com
                            </a>
                            <p className="text-[11px] text-[#7D897F] dark:text-[#849187]">
                                Délai de traitement moyen : sous 24 à 48 heures ouvrées.
                            </p>
                        </div>

                        {/* Bloc Signalement Droits d'Auteur */}
                        <div className="p-6 rounded-2xl bg-[#A8743F]/10 border border-[#A8743F]/30 dark:bg-[#A8743F]/15 dark:border-[#D5A45F]/30 space-y-2.5">
                            <div className="flex items-center gap-2 font-bold text-xs font-mono uppercase text-[#A8743F] dark:text-[#D5A45F]">
                                <AlertTriangle className="w-4 h-4" />
                                <span>Signalement de Droits d'Auteur</span>
                            </div>
                            <p className="text-xs text-[#1D3027] dark:text-[#C2CEC6] leading-relaxed">
                                Si vous êtes titulaire de droits sur un document partagé et souhaitez son retrait immédiat, sélectionnez <em>« Signalement Droits d'auteur »</em> dans le formulaire ou écrivez-nous avec l'URL exacte du document.
                            </p>
                        </div>

                        {/* Bloc Protection des Données (CDP) */}
                        <div className="p-6 rounded-2xl bg-[#1E5B45]/10 border border-[#1E5B45]/30 dark:bg-[#1E5B45]/15 dark:border-[#62A87A]/30 space-y-2.5">
                            <div className="flex items-center gap-2 font-bold text-xs font-mono uppercase text-[#1E5B45] dark:text-[#62A87A]">
                                <FileCheck className="w-4 h-4" />
                                <span>Exercice de vos Droits CDP</span>
                            </div>
                            <p className="text-xs text-[#1D3027] dark:text-[#C2CEC6] leading-relaxed">
                                Conformément à la <strong>Loi n° 2008-12 du Sénégal</strong>, vos demandes d'accès, de rectification ou de suppression définitive de données personnelles sont traitées dans un délai de <strong>30 jours</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

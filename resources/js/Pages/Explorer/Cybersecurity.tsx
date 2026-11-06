import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ResourceCard from '@/Components/ResourceCard';
import { Resource } from '@/types';
import {
    ShieldCheck,
    Lock,
    Terminal,
    AlertTriangle,
    Key,
    Server,
    BookOpen,
} from 'lucide-react';

interface CybersecurityProps {
    resources: Resource[];
}

export default function Cybersecurity({ resources }: CybersecurityProps) {
    const securityTopics = [
        {
            icon: Lock,
            title: 'Cryptographie Moderne',
            desc: 'Chiffrement symétrique (AES), asymétrique (RSA, ECC), signatures numériques et hachage (SHA-256).',
        },
        {
            icon: AlertTriangle,
            title: 'Vulnérabilités Web (OWASP)',
            desc: 'Injections SQL, XSS, CSRF, failles d\'authentification et audit de code applicatif.',
        },
        {
            icon: Server,
            title: 'Sécurité Réseau & Protocoles',
            desc: 'Pare-feux, VPN (IPSec, WireGuard), SSL/TLS, IDS/IPS et segmentation de sous-réseaux.',
        },
        {
            icon: Key,
            title: 'Droit du Numérique & RGPD',
            desc: 'Législation de la CDP au Sénégal, protection des données personnelles et gouvernance éthique.',
        },
    ];

    return (
        <AppLayout>
            <Head title="Cybersécurité & Réseaux Informatiques | SDBSNX UN-CHK" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-unchk-blue/10 text-unchk-blue border border-unchk-blue/20 text-xs font-mono font-bold mb-3">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>SPÉCIALISATION TECHNIQUE & SÉCURITÉ</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
                        Cybersécurité & Systèmes Résilients
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
                        Maîtrisez les concepts fondamentaux de la sécurité des données, de l'audit technique et de la protection des infrastructures numériques UN-CHK.
                    </p>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {securityTopics.map((topic, idx) => {
                        const Icon = topic.icon;
                        return (
                            <div
                                key={idx}
                                className="sdbsnx-card rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-3"
                            >
                                <div className="w-10 h-10 rounded-xl bg-unchk-blue/10 text-unchk-blue flex items-center justify-center">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                    {topic.title}
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {topic.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Related Courses */}
                <div className="space-y-6 pt-6 border-t border-[#28372B]/10 dark:border-white/10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold font-heading text-[#1D3027] dark:text-white">
                            Supports de Cours en Sécurité & Réseaux
                        </h2>
                        <span className="text-xs font-mono font-bold text-[#1E5B45] dark:text-[#62A87A] bg-[#1E5B45]/10 px-2.5 py-0.5 rounded-full">
                            {resources.length} document{resources.length > 1 ? 's' : ''}
                        </span>
                    </div>

                    {resources.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {resources.map((res) => (
                                <ResourceCard key={res.id} resource={res} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#1E5B45]/10 dark:bg-[#1E5B45]/15 flex items-center justify-center">
                                <ShieldCheck className="w-7 h-7 text-[#1E5B45] dark:text-[#62A87A]" />
                            </div>
                            <h3 className="text-base font-bold font-heading text-[#1D3027] dark:text-white mb-1.5">
                                Aucun cours publié pour le moment
                            </h3>
                            <p className="text-xs text-[#59685F] dark:text-[#849187] max-w-md mx-auto leading-relaxed">
                                Les syllabus, travaux dirigés et fiches pratiques de cybersécurité seront mis en ligne prochainement via le panneau d'administration.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

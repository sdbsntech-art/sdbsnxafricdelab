import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    Cookie,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    Sliders,
    Settings,
    Info,
    HelpCircle,
} from 'lucide-react';

export default function Cookies() {
    return (
        <AppLayout>
            <Head title="Politique Relative aux Cookies — SDBSNX" />

            <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                {/* Header */}
                <div className="border-b border-[#28372B]/10 dark:border-white/10 pb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                        <Cookie className="w-3.5 h-3.5" />
                        <span>Transparence Numérique</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#1D3027] dark:text-white">
                        Politique Relative aux Cookies et Traceurs
                    </h1>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#849187] mt-2 font-mono">
                        Dernière mise à jour : Novembre 2026 • Respect de la vie privée sur SDBSNX
                    </p>
                </div>

                {/* Synthèse claire : Aucun cookie publicitaire */}
                <div className="p-6 rounded-2xl bg-[#1E5B45]/10 border border-[#1E5B45]/30 dark:bg-[#1E5B45]/15 dark:border-[#62A87A]/30">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-6 h-6 text-[#1E5B45] dark:text-[#62A87A] shrink-0 mt-0.5" />
                        <div className="space-y-1.5">
                            <h2 className="text-base font-bold font-heading text-[#1D3027] dark:text-white">
                                Notre engagement : Zéro traceur publicitaire intrusif
                            </h2>
                            <p className="text-xs sm:text-sm text-[#1D3027] dark:text-[#C2CEC6] leading-relaxed">
                                La plateforme <strong>SDBSNX n'utilise aucun cookie publicitaire, aucun réseau d'affiliation commerciale et ne revend aucune donnée de profilage</strong>. Seuls des témoins techniques et de stockage local strictement nécessaires au fonctionnement du site sont mis en œuvre.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 1. Qu'est-ce qu'un cookie ? */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 space-y-3 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Info className="w-5 h-5" />
                        <h2>1. Qu'est-ce qu'un cookie ou traceur ?</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette ou smartphone) lors de la consultation d'un site web. Il permet au serveur de mémoriser temporairement des informations techniques utiles à la session (comme le maintien de votre connexion sécurisée ou vos préférences d'affichage).
                    </p>
                </div>

                {/* 2. Inventaire des cookies et stockages locaux utilisés */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Sliders className="w-5 h-5" />
                        <h2>2. Inventaire des technologies utilisées sur SDBSNX</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        Voici la liste exhaustive et transparente des témoins et clés de stockage local exploités par notre plateforme :
                    </p>

                    <div className="overflow-x-auto pt-2">
                        <table className="w-full text-left text-xs border border-[#28372B]/10 dark:border-white/10 rounded-xl overflow-hidden">
                            <thead className="bg-[#F7F5EF] dark:bg-black/40 text-[#1D3027] dark:text-white font-mono uppercase text-[10px]">
                                <tr>
                                    <th className="p-3 border-b border-[#28372B]/10 dark:border-white/10">Nom / Clé</th>
                                    <th className="p-3 border-b border-[#28372B]/10 dark:border-white/10">Type & Émetteur</th>
                                    <th className="p-3 border-b border-[#28372B]/10 dark:border-white/10">Finalité exacte</th>
                                    <th className="p-3 border-b border-[#28372B]/10 dark:border-white/10">Durée</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#28372B]/10 dark:divide-white/5 text-[#59685F] dark:text-[#C2CEC6]">
                                <tr>
                                    <td className="p-3 font-mono font-bold text-[#1E5B45] dark:text-[#62A87A]">sdbsnx_session</td>
                                    <td className="p-3">Cookie / Laravel (MySQL)</td>
                                    <td className="p-3">Authentification sécurisée et maintien de session utilisateur via MySQL.</td>
                                    <td className="p-3">Session / Max 120 minutes</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono font-bold text-[#1E5B45] dark:text-[#62A87A]">XSRF-TOKEN</td>
                                    <td className="p-3">Cookie de sécurité</td>
                                    <td className="p-3">Protection contre les attaques de falsification de requête (CSRF).</td>
                                    <td className="p-3">Durée de session</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono font-bold text-[#A8743F] dark:text-[#D5A45F]">sdbsnx_theme</td>
                                    <td className="p-3">localStorage (local)</td>
                                    <td className="p-3">Mémorise votre préférence de thème (mode clair ou mode sombre).</td>
                                    <td className="p-3">Persistant (local)</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono font-bold text-[#A8743F] dark:text-[#D5A45F]">sdbsnx_bookmarks</td>
                                    <td className="p-3">localStorage (local)</td>
                                    <td className="p-3">Conserve vos cours mis en favoris directement sur votre appareil, sans obligation de compte.</td>
                                    <td className="p-3">Persistant (local)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. Absence de cookies publicitaires */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 space-y-3 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <CheckCircle2 className="w-5 h-5" />
                        <h2>3. Cookies tiers et traceurs publicitaires</h2>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        <p>
                            • <strong>Pas de publicité comportementale :</strong> Aucun bandeau ou traceur de régie publicitaire (ex: Google AdSense, Criteo) n’est présent sur la plateforme.
                        </p>
                        <p>
                            • <strong>Pas de revente de données :</strong> Vos interactions avec les cours et ressources ne sont jamais transmises à des tiers pour du ciblage commercial.
                        </p>
                        <p>
                            • <strong>Vidéos externes :</strong> Lors de la consultation de vidéos hébergées sur YouTube, des cookies techniques de la plateforme YouTube peuvent être déposés par Google conformément à leur politique de confidentialité si vous activez la lecture.
                        </p>
                    </div>
                </div>

                {/* 4. Comment gérer et désactiver les cookies ? */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Settings className="w-5 h-5" />
                        <h2>4. Gestion de vos préférences via votre navigateur</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        Vous pouvez à tout moment configurer votre logiciel de navigation pour refuser ou supprimer les cookies et données locales. La procédure varie selon le navigateur utilisé :
                    </p>
                    <ul className="text-xs text-[#59685F] dark:text-[#849187] space-y-2 list-disc list-inside">
                        <li><strong>Google Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies et données de sites.</li>
                        <li><strong>Mozilla Firefox :</strong> Paramètres → Vie privée et sécurité → Cookies et données de sites.</li>
                        <li><strong>Apple Safari :</strong> Préférences → Confidentialité → Bloquer tous les cookies.</li>
                        <li><strong>Microsoft Edge :</strong> Paramètres → Cookies et autorisations de site.</li>
                    </ul>
                    <p className="text-xs text-[#59685F] dark:text-[#849187] italic">
                        Remarque : La désactivation complète des cookies techniques de session peut vous empêcher de vous connecter à votre compte utilisateur ou d'enregistrer vos favoris.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}


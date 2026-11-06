import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ShieldCheck,
    AlertTriangle,
    Server,
    Mail,
    Globe,
    FileText,
    ExternalLink,
    Scale,
    Info,
} from 'lucide-react';

export default function MentionsLegales() {
    return (
        <AppLayout>
            <Head title="Mentions Légales — SDBSNX" />

            <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                {/* Header */}
                <div className="border-b border-[#28372B]/10 dark:border-white/10 pb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                        <Scale className="w-3.5 h-3.5" />
                        <span>Transparence & Cadre Légal</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#1D3027] dark:text-white">
                        Mentions Légales
                    </h1>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#849187] mt-2 font-mono">
                        Dernière mise à jour : Novembre 2026 • Plateforme indépendante SDBSNX
                    </p>
                </div>

                {/* Avertissement Majeur / Clause de Non-Affiliation */}
                <div className="p-6 rounded-2xl bg-[#A8743F]/10 border-2 border-[#A8743F]/40 dark:bg-[#A8743F]/15 dark:border-[#D5A45F]/40 shadow-xs">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-[#A8743F] dark:text-[#D5A45F] shrink-0 mt-0.5" />
                        <div className="space-y-2">
                            <h2 className="text-base font-bold font-heading text-[#1D3027] dark:text-white uppercase tracking-tight">
                                Clause essentielle de non-affiliation institutionnelle
                            </h2>
                            <p className="text-xs sm:text-sm text-[#1D3027] dark:text-[#C2CEC6] leading-relaxed">
                                <strong>Cette plateforme est un projet éducatif et communautaire indépendant.</strong> Elle n'est <strong>ni affiliée, ni officiellement mandatée, ni représentante officielle</strong> de l'<strong>Université Numérique Cheikh Hamidou Kane (UN-CHK, ex-UVS)</strong>, du programme <strong>FORCE-N</strong> ou de la plateforme <strong>Grafikart</strong>.
                            </p>
                            <p className="text-xs text-[#59685F] dark:text-[#849187] leading-relaxed">
                                Les noms, acronymes, logos et marques institutionnels mentionnés le sont exclusivement à titre informatif, pédagogique ou de référencement académique légitime pour guider les étudiants dans leur cursus. L’ensemble de ces marques et éléments distinctifs demeurent la propriété stricte et exclusive de leurs détenteurs respectifs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 1 : Éditeur du site */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Info className="w-5 h-5" />
                        <h2>1. Éditeur de la plateforme</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        Conformément aux dispositions de la <strong>Loi n° 2008-08 du 25 janvier 2008 sur les transactions électroniques au Sénégal</strong>, il est porté à la connaissance des utilisateurs l’identité des différents intervenants dans le cadre de la réalisation et du suivi de la plateforme :
                    </p>
                    <ul className="text-xs sm:text-sm text-[#1D3027] dark:text-white space-y-2.5 font-sans pt-1">
                        <li>
                            <strong className="font-mono text-[#59685F] dark:text-[#849187]">Dénomination / Nom de l'éditeur :</strong>{' '}
                            <span>SDBSNX</span>
                        </li>
                        <li>
                            <strong className="font-mono text-[#59685F] dark:text-[#849187]">Statut juridique :</strong>{' '}
                            <span>Projet éducatif à but non lucratif — Initiative citoyenne et communautaire à vocation académique</span>
                        </li>
                        <li>
                            <strong className="font-mono text-[#59685F] dark:text-[#849187]">Siège / Adresse déclarée :</strong>{' '}
                            <span>Dakar, Sénégal</span>
                        </li>
                        <li>
                            <strong className="font-mono text-[#59685F] dark:text-[#849187]">Numéro d’immatriculation :</strong>{' '}
                            <span>Non applicable — Initiative étudiante et éducative libre à but non lucratif. Aucune activité commerciale n'est exercée sur le site. Une immatriculation formelle (NINEA / RCCM) sera déclarée en cas d'évolution vers une entité juridique distincte.</span>
                        </li>
                        <li>
                            <strong className="font-mono text-[#59685F] dark:text-[#849187]">Guichet Legal Tech & Suggestions :</strong>{' '}
                            <a
                                href="https://formspree.io/f/xqapevvv"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#A8743F] dark:text-[#D5A45F] font-semibold hover:underline inline-flex items-center gap-1"
                            >
                                <span>Formulaire externe de suggestions et signalements (Formspree)</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </li>
                        <li>
                            <strong className="font-mono text-[#59685F] dark:text-[#849187]">Responsable de la publication et du développement :</strong>{' '}
                            <span>SDBSNX</span>
                        </li>
                        <li>
                            <strong className="font-mono text-[#59685F] dark:text-[#849187]">Contact électronique direct :</strong>{' '}
                            <a href="mailto:sdbsntech@gmail.com" className="text-[#1E5B45] dark:text-[#62A87A] font-semibold hover:underline">
                                sdbsntech@gmail.com
                            </a>
                        </li>
                        <li>
                            <strong className="font-mono text-[#59685F] dark:text-[#849187]">Nom de domaine & Site officiel :</strong>{' '}
                            <span className="font-mono font-bold">sdbsnx.site</span> (et miroirs associés déclarés)
                        </li>
                    </ul>
                </div>

                {/* Section 2 : Hébergeur */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Server className="w-5 h-5" />
                        <h2>2. Hébergement de la plateforme</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        Le stockage de la plateforme web ainsi que l'infrastructure serveur sont assurés par le prestataire d'hébergement international suivant :
                    </p>
                    <ul className="text-xs sm:text-sm text-[#1D3027] dark:text-white space-y-2 pt-1">
                        <li>
                            <strong className="font-mono text-[#59685F] dark:text-[#849187]">Prestataire d'hébergement :</strong>{' '}
                            <strong>Hostinger International Ltd</strong>
                        </li>
                        <li>
                            <strong className="font-mono text-[#59685F] dark:text-[#849187]">Adresse de l'hébergeur :</strong>{' '}
                            <span>61 Lordou Vironos Street, 6023 Larnaca, Chypre</span>
                        </li>
                        <li>
                            <strong className="font-mono text-[#59685F] dark:text-[#849187]">Site internet de l'hébergeur :</strong>{' '}
                            <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer" className="text-[#1E5B45] dark:text-[#62A87A] hover:underline inline-flex items-center gap-1">
                                <span>www.hostinger.fr</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </li>
                        <li>
                            <strong className="font-mono text-[#59685F] dark:text-[#849187]">Système de gestion de base de données (SGBD) :</strong>{' '}
                            <span>MySQL / MariaDB sécurisé, hébergé sur les serveurs de production Hostinger</span>
                        </li>
                    </ul>
                </div>

                {/* Section 3 : Propriété intellectuelle & Droit d'auteur */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <FileText className="w-5 h-5" />
                        <h2>3. Propriété intellectuelle et contenus tiers</h2>
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        <p>
                            <strong>Contenus propres à SDBSNX :</strong> La structure générale du site, le code source développé, la charte graphique, les infographies originales, les résumés et les éléments textuels créés expressément par SDBSNX sont protégés au titre du droit d’auteur conformément aux lois sénégalaises en vigueur.
                        </p>
                        <p>
                            <strong>Supports pédagogiques universitaires :</strong> Les cours magistraux, fiches de travaux dirigés (TD), énoncés de devoirs et examens partagés sur la plateforme sont mis à disposition à titre purement pédagogique, gracieux et d'entraide communautaire. Ils demeurent la propriété intellectuelle de leurs enseignants et auteurs respectifs.
                        </p>
                        <p>
                            <strong>Contenus tiers & liens externes :</strong> Les vidéos de cours référencées (notamment celles de <em>Grafikart / Jonathan Boyer</em>) sont intégrées sous forme de liens hypertextes et d'intégrations conformes aux conditions d'utilisation de YouTube. SDBSNX ne revendique aucun droit de propriété sur ces tutoriels exceptionnels.
                        </p>
                    </div>

                    {/* Notice and Takedown Procedure */}
                    <div className="mt-4 p-4 rounded-xl bg-[#F7F5EF] dark:bg-black/25 border border-[#28372B]/10 dark:border-white/5 space-y-2">
                        <div className="flex items-center gap-2 font-bold text-xs text-[#1D3027] dark:text-white uppercase font-mono">
                            <ShieldCheck className="w-4 h-4 text-[#1E5B45] dark:text-[#62A87A]" />
                            <span>Procédure de signalement et de retrait (Notice and Takedown)</span>
                        </div>
                        <p className="text-xs text-[#59685F] dark:text-[#849187] leading-relaxed">
                            Si vous êtes auteur, titulaire de droits ou représentant légal d'un document publié sur cette plateforme et que vous vous opposez à sa diffusion, nous nous engageons à le retirer dans les plus brefs délais sur simple demande motivée adressée par email à :{' '}
                            <a href="mailto:sdbsntech@gmail.com" className="font-mono text-[#1E5B45] dark:text-[#62A87A] font-bold underline">
                                sdbsntech@gmail.com
                            </a>.
                        </p>
                    </div>
                </div>

                {/* Section 4 : Droit applicable & Juridiction compétente */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 space-y-3 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Scale className="w-5 h-5" />
                        <h2>4. Droit applicable</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        Le présent site et ses mentions légales sont régis par le droit en vigueur en République du Sénégal. Tout litige relatif à l’utilisation de la plateforme qui n'aurait pu trouver de résolution amiable préalable relèvera de la compétence des juridictions sénégalaises compétentes.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}


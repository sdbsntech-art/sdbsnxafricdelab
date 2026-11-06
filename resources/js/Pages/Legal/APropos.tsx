import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import DualEmblemPill from '@/Components/DualEmblemPill';
import {
    Heart,
    GraduationCap,
    Sparkles,
    ShieldCheck,
    Globe,
    CodeXml,
    Compass,
    Target,
    Users,
    ArrowRight,
    AlertCircle,
} from 'lucide-react';

export default function APropos() {
    return (
        <AppLayout>
            <Head title="À Propos — SDBSNX" />

            <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <DualEmblemPill />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] text-xs font-mono font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Notre Histoire & Notre Mission</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#1D3027] dark:text-white">
                        À Propos de <span className="text-[#1E5B45] dark:text-[#62A87A]">SDBSNX</span>
                    </h1>

                    <p className="text-sm sm:text-base text-[#59685F] dark:text-[#C2CEC6] max-w-2xl mx-auto leading-relaxed">
                        Une initiative bénévole et indépendante née de la passion du code et de la volonté d'offrir à chaque étudiant en informatique les meilleurs outils pour réussir son parcours.
                    </p>
                </div>

                {/* 1. Origine du projet */}
                <div className="sdbsnx-card rounded-3xl p-4 sm:p-6 md:p-8 space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-xl font-heading">
                        <Compass className="w-5 h-5" />
                        <h2>L'Origine du Projet</h2>
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        <p>
                            Le projet <strong>SDBSNX</strong> est né d'un constat simple sur le terrain : les étudiants en informatique (notamment ceux suivant le cursus <strong>IDA — Informatique et Développement d'Applications</strong>) font face à un éclatement important des supports de cours, des polycopiés de TD et des corrigés d'examens.
                        </p>
                        <p>
                            Créée par un étudiant passionné de technologies et de pédagogie numérique au Sénégal, la plateforme s'est fixé pour mission de <strong>centraliser, structurer et rendre accessible à 100% gratuitement</strong> l'ensemble des ressources pédagogiques nécessaires pour franchir avec succès chaque semestre universitaire.
                        </p>
                    </div>

                    {/* Slogan Pill */}
                    <div className="pt-2">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E5B45]/10 border border-[#1E5B45]/20 text-[#1E5B45] dark:text-[#62A87A] font-mono text-xs font-bold">
                            <span>CODE • TECH • IMPACT</span>
                        </div>
                    </div>
                </div>

                {/* 2. Notre Mission & Valeurs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 space-y-3 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] flex items-center justify-center">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading font-bold text-base text-[#1D3027] dark:text-white">
                            Accès Libre & Universel
                        </h3>
                        <p className="text-xs text-[#59685F] dark:text-[#849187] leading-relaxed">
                            L'éducation est un bien commun. Tous nos supports, polycopiés PDF et exercices sont téléchargeables immédiatement sans inscription obligatoire.
                        </p>
                    </div>

                    <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 space-y-3 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-[#A8743F]/12 text-[#A8743F] dark:text-[#D5A45F] flex items-center justify-center">
                            <CodeXml className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading font-bold text-base text-[#1D3027] dark:text-white">
                            Qualité Pédagogique
                        </h3>
                        <p className="text-xs text-[#59685F] dark:text-[#849187] leading-relaxed">
                            Des programmes alignés sur les réalités du marché de l'emploi technologique : C, POO Java, SQL, PHP/Laravel, Python, Cybersécurité et Web moderne.
                        </p>
                    </div>

                    <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 space-y-3 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-[#377657]/12 text-[#377657] dark:text-[#62A87A] flex items-center justify-center">
                            <Users className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading font-bold text-base text-[#1D3027] dark:text-white">
                            Entraide Communautaire
                        </h3>
                        <p className="text-xs text-[#59685F] dark:text-[#849187] leading-relaxed">
                            Un esprit d'encouragement mutuel où les étudiants plus avancés guident et partagent leurs connaissances avec les promotions entrantes.
                        </p>
                    </div>
                </div>

                {/* 3. Indépendance vis-à-vis des institutions */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#A8743F]/10 border border-[#A8743F]/30 dark:bg-[#A8743F]/15 dark:border-[#D5A45F]/30 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#1D3027] dark:text-white uppercase font-mono">
                        <AlertCircle className="w-5 h-5 text-[#A8743F] dark:text-[#D5A45F]" />
                        <span>Précision d'Indépendance Institutionnelle</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#1D3027] dark:text-[#C2CEC6] leading-relaxed">
                        Bien que notre curriculum soit directement inspiré des enseignements dispensés dans les universités publiques numériques (notamment l'UN-CHK), <strong>SDBSNX est une entité privée et autonome</strong>.
                    </p>
                    <p className="text-xs text-[#59685F] dark:text-[#849187] leading-relaxed">
                        Notre plateforme n'agit ni au nom, ni pour le compte, ni en sous-délégation des instances officielles universitaires ou ministérielles. Elle constitue un espace de révision complémentaire d'initiative citoyenne.
                    </p>
                </div>

                {/* 4. Rejoindre & Contribuer */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 text-center space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 overflow-hidden">
                    <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1D3027] dark:text-white">
                        Envie de contribuer ou de proposer des cours ?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#849187] max-w-xl mx-auto leading-relaxed">
                        Vous disposez d'un cours rédigé, d'une fiche de TD corrigée ou d'une suggestion d'amélioration ? N'hésitez pas à nous contacter pour enrichir la plateforme pour tous les apprenants.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white text-xs font-bold font-mono transition shadow-xs"
                        >
                            <span>Nous Contacter</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}


import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    FileText,
    ShieldAlert,
    AlertOctagon,
    CheckCircle2,
    BookOpen,
    Scale,
    Ban,
    UserCheck,
} from 'lucide-react';

export default function Cgu() {
    return (
        <AppLayout>
            <Head title="Conditions Générales d'Utilisation (CGU) — SDBSNX" />

            <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                {/* Header */}
                <div className="border-b border-[#28372B]/10 dark:border-white/10 pb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Cadre Contractuel Pédagogique</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#1D3027] dark:text-white">
                        Conditions Générales d'Utilisation (CGU)
                    </h1>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#849187] mt-2 font-mono">
                        Applicables à compter de Novembre 2026 • Plateforme indépendante SDBSNX
                    </p>
                </div>

                {/* Préambule */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-3 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <h2 className="text-base font-bold font-heading text-[#1D3027] dark:text-white">
                        Préambule
                    </h2>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        Les présentes Conditions Générales d'Utilisation régissent l'accès et l'utilisation de la plateforme <strong>SDBSNX</strong> (accessible notamment à l'adresse <em>sdbsnx.site</em>). Tout accès ou consultation de la plateforme implique l'acceptation sans réserve des présentes conditions par l'utilisateur.
                    </p>
                </div>

                {/* 1. Objet de la plateforme */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-3 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <BookOpen className="w-5 h-5" />
                        <h2>1. Objet du service</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        SDBSNX est une plateforme éducative indépendante d'entraide étudiante. Elle a pour objet de centraliser, classer et faciliter l'accès libre à des ressources pédagogiques en informatique (polycopiés de cours, travaux dirigés, devoirs corrigés, annales d'examens, tutoriels vidéo) pour les étudiants des filières technologiques (notamment Licence 1, 2 et 3).
                    </p>
                </div>

                {/* 2. Modalités d'accès au service */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <UserCheck className="w-5 h-5" />
                        <h2>2. Accès au service et création de compte</h2>
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        <p>
                            • <strong>Accès libre & gratuit :</strong> La consultation du catalogue, des fiches de cours, des vidéos et le téléchargement des supports sont entièrement gratuits et accessibles <strong>sans obligation d'inscription préalable</strong>.
                        </p>
                        <p>
                            • <strong>Création de compte facultative :</strong> Certaines fonctionnalités (sauvegarde synchronisée de favoris, participation active aux discussions du forum, alertes personnalisées) peuvent nécessiter la création d'un compte. L'utilisateur s'engage à fournir des informations exactes et à préserver la stricte confidentialité de ses identifiants.
                        </p>
                    </div>
                </div>

                {/* 3. Obligations et comportement de l'utilisateur */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <CheckCircle2 className="w-5 h-5" />
                        <h2>3. Obligations de l'utilisateur et règles de bonne conduite</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        En utilisant SDBSNX, l'utilisateur s'engage expressément à :
                    </p>
                    <ul className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] space-y-2 list-disc list-inside">
                        <li>Faire preuve de courtoisie, de bienveillance et de respect mutuel sur les espaces d’échanges et d’entraide.</li>
                        <li>Ne pas publier de messages à caractère injurieux, diffamatoire, discriminatoire, haineux, pornographique ou incitant à la violence.</li>
                        <li>Ne pas diffuser de pourriels (spam), de liens publicitaires non sollicités ou d'escroqueries numériques.</li>
                        <li>Ne pas tenter de contourner les mécanismes d'authentification, d'injecter du code malveillant ou de perturber le fonctionnement des serveurs (infraction sanctionnée par la Loi sénégalaise n° 2008-11 sur la cybercriminalité).</li>
                        <li>Ne pas effectuer d'aspiration automatisée massive (scraping non autorisé) susceptible de saturer les serveurs.</li>
                    </ul>
                </div>

                {/* 4. Limitation de responsabilité de SDBSNX */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <AlertOctagon className="w-5 h-5" />
                        <h2>4. Responsabilité de SDBSNX</h2>
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        <p>
                            • <strong>Caractère informatif des contenus :</strong> Les cours, corrigés et documents sont fournis à titre d'aide bénévole <em>« en l'état »</em>. Bien que l'équipe s'efforce de vérifier la rigueur pédagogique des fichiers, SDBSNX ne peut garantir l'exactitude absolue, l'exhaustivité ou l'absence d'erreurs typographiques dans les supports d'étude.
                        </p>
                        <p>
                            • <strong>Absence de garantie d'examen :</strong> L'utilisation des ressources fournies ne constitue en aucun cas une garantie de réussite aux examens officiels universitaires, concours ou obtention de diplômes délivrés par les universités partenaires.
                        </p>
                        <p>
                            • <strong>Disponibilité technique :</strong> SDBSNX s'efforce de maintenir la plateforme accessible 24h/24 et 7j/7, mais ne saurait être tenu responsable d'interruptions programmées pour maintenance, de pannes de l'hébergeur ou d'événements de force majeure indépendants de sa volonté.
                        </p>
                    </div>
                </div>

                {/* 5. Sanctions en cas de non-respect */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#A8743F] dark:text-[#D5A45F] font-bold text-lg font-heading">
                        <Ban className="w-5 h-5" />
                        <h2>5. Sanctions et modération</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        En cas de non-respect manifeste des présentes CGU ou d'infraction à la loi, l'équipe de modération de SDBSNX se réserve le droit d'appliquer les sanctions suivantes, sans indemnité ni préavis :
                    </p>
                    <ul className="text-xs text-[#59685F] dark:text-[#849187] space-y-1.5 list-disc list-inside">
                        <li>Suppression immédiate du contenu illicite ou inapproprié.</li>
                        <li>Avertissement formel par courrier électronique.</li>
                        <li>Suspension temporaire ou bannissement définitif du compte utilisateur.</li>
                        <li>Blocage d'adresse IP en cas d'attaque informatique caractérisée, avec transmission éventuelle aux autorités judiciaires compétentes.</li>
                    </ul>
                </div>

                {/* 6. Droit applicable */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-3 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Scale className="w-5 h-5" />
                        <h2>6. Modification des conditions & Loi applicable</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        SDBSNX se réserve le droit de modifier les présentes CGU pour les adapter aux évolutions techniques ou réglementaires. Les présentes CGU sont soumises à la législation de la République du Sénégal.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}


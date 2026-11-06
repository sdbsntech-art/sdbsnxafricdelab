import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import DualEmblemPill from '@/Components/DualEmblemPill';
import ResourceCard from '@/Components/ResourceCard';
import { AcademicLevel, CommunityPost, Opportunity, Resource } from '@/types';
import {
    BookOpen,
    GraduationCap,
    Sparkles,
    Search,
    ArrowRight,
    CheckCircle,
    Shield,
    Users,
    Download,
    FolderKanban,
    Video,
    Briefcase,
    ChevronRight,
    Play,
    ExternalLink,
    CodeXml,
    Heart,
    Youtube,
    Rocket,
    Award,
    FileText,
    CircleCheck,
    Lock,
} from 'lucide-react';

interface WelcomeProps {
    levels: AcademicLevel[];
    featuredResources: Resource[];
    latestResources: Resource[];
    latestDiscussions: CommunityPost[];
    activeOpportunities: Opportunity[];
    stats: {
        resources_count: number;
        modules_count: number;
        levels_count: number;
        downloads_count: number;
        students_count: number;
    };
}

export default function Welcome({
    levels,
    featuredResources,
    latestResources,
    latestDiscussions,
    activeOpportunities,
    stats,
}: WelcomeProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'course' | 'td' | 'exercise' | 'exam'>('all');
    const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/cours?search=${encodeURIComponent(searchQuery.trim())}`;
        }
    };

    const filteredResources = activeTab === 'all'
        ? latestResources
        : latestResources.filter((r) => r.type === activeTab);

    // Technologies vidéo (Grafikart)
    const techVideos = [
        { id: 'html', title: 'HTML5 & Sémantique', desc: 'Syntaxe, balisage accessible, formulaires et bonnes pratiques W3C.', vidCount: 16, color: '#E44D26' },
        { id: 'css', title: 'CSS3 Moderne', desc: 'Flexbox, Grid, animations, variables et responsive design avancé.', vidCount: 31, color: '#264DE4' },
        { id: 'js', title: 'JavaScript ES6+', desc: 'DOM, événements, asynchrone, promesses et programmation moderne.', vidCount: 24, color: '#F7DF1E' },
        { id: 'php', title: 'PHP & POO', desc: 'Bases, programmation orientée objet, architecture MVC et sécurité.', vidCount: 28, color: '#777BB4' },
        { id: 'python', title: 'Python & Données', desc: 'Structures de données, scripts d\'automatisation et bases algorithmiques.', vidCount: 12, color: '#3776AB' },
        { id: 'git', title: 'Git & GitHub', desc: 'Contrôle de version, branches, commits conventionnels et travail d\'équipe.', vidCount: 12, color: '#F05032' },
    ];

    // Semestres de révision
    const semesters = [
        { sem: 'Semestre 1', cycle: 'L1', focus: 'Langage C, Algorithmique, HTML/CSS, Architecture des ordinateurs', badge: 'Fondations L1', color: '#1E5B45' },
        { sem: 'Semestre 2', cycle: 'L1', focus: 'Structures de données, Systèmes Linux, Réseaux fondamentaux', badge: 'Systèmes L1', color: '#1E5B45' },
        { sem: 'Semestre 3', cycle: 'L2', focus: 'POO Java, Modélisation Merise/UML, Bases de données SQL', badge: 'Backend L2', color: '#A8743F' },
        { sem: 'Semestre 4', cycle: 'L2', focus: 'PHP/Laravel, Développement Mobile Android, Réseaux avancés', badge: 'Web & Mobile L2', color: '#A8743F' },
        { sem: 'Semestre 5', cycle: 'L3', focus: 'Architecture logicielle, Cryptographie, Sécurité applicative', badge: 'Ingénierie L3', color: '#377657' },
        { sem: 'Semestre 6', cycle: 'L3', focus: 'Projet de Fin d\'Études (PFE), Entrepreneuriat Tech, Stage', badge: 'Diplôme L3', color: '#377657' },
    ];

    return (
        <AppLayout>
            <Head title="SDBSNX | Cours d’informatique au Sénégal" />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20">
                {/* Glowing Ambient Background Orbs */}
                <div className="orb-glow top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-[#1E5B45]/20" />
                <div className="orb-glow top-1/3 left-1/4 w-[400px] h-[250px] bg-[#A8743F]/15" />
                <div className="orb-glow top-1/2 right-1/4 w-[350px] h-[220px] bg-[#377657]/15" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    {/* Triple Emblem Pill (SDBSNX + UN-CHK + FORCE-N) */}
                    <div className="flex justify-center mb-6">
                        <DualEmblemPill />
                    </div>

                    {/* Open Access Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/90 dark:bg-[#1A241D]/90 border border-[#28372B]/12 dark:border-white/10 shadow-xs text-xs font-semibold mb-6 max-w-full overflow-hidden">
                        <Sparkles className="w-3.5 h-3.5 text-[#A8743F] dark:text-[#D5A45F] shrink-0" />
                        <span className="text-[#1D3027] dark:text-white truncate">
                            <span className="hidden sm:inline">SDBSNX • </span>Plateforme 100% Gratuite &amp; Libre
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#1E5B45] dark:bg-[#62A87A] animate-pulse shrink-0" />
                    </div>

                    {/* Fluid Main Title */}
                    <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading max-w-4xl mx-auto leading-tight text-[#1D3027] dark:text-white px-2">
                        L&apos;Excellence en{' '}
                        <span className="text-[#1E5B45] dark:text-[#62A87A]">
                            Informatique
                        </span>{' '}
                        &{' '}
                        <span className="text-[#1E5B45] dark:text-[#62A87A]">
                            Développement
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-5 text-sm sm:text-base text-[#59685F] dark:text-[#C2CEC6] max-w-2xl mx-auto leading-relaxed">
                        Bienvenue sur <strong className="text-[#1D3027] dark:text-white font-extrabold">SDBSNX</strong>, une plateforme de ressources en informatique et développement d’applications : cours, TD, examens et vidéos pour les niveaux L1, L2 et L3.
                    </p>

                    {/* Hero Buttons Group */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold px-2">
                        <Link
                            href="/cours"
                            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white flex items-center gap-1.5 shadow-md shadow-[#1E5B45]/20 transition transform active:scale-95"
                        >
                            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                            <span>Explorer les Licences</span>
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 shrink-0" />
                        </Link>
                        <Link
                            href="/videos"
                            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white dark:bg-[#1A241D] text-[#1D3027] dark:text-white border border-[#28372B]/15 dark:border-white/10 hover:border-[#1E5B45] flex items-center gap-1.5 shadow-2xs transition"
                        >
                            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1E5B45] dark:text-[#62A87A] shrink-0" />
                            <span>Vidéothèque <span className="hidden sm:inline">HD </span>(123+)</span>
                        </Link>
                        <button
                            onClick={() => alert("Pour installer l'application SDBSNX, utilisez l'option 'Ajouter à l'écran d'accueil' de votre navigateur !")}
                            className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-[#A8743F] bg-[#A8743F]/10 hover:bg-[#A8743F]/20 text-[#A8743F] dark:text-[#D5A45F] flex items-center gap-1.5 transition"
                        >
                            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                            <span className="hidden sm:inline">Installer l'App</span>
                            <span className="sm:hidden">Installer</span>
                        </button>
                    </div>

                    {/* Interactive Quick Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="mt-8 max-w-xl mx-auto relative flex items-center w-full">
                        <Search className="w-4 h-4 absolute left-3.5 sm:left-4 text-[#7D897F] pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Rechercher un cours, un TD, un langage..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white dark:bg-[#1A241D] border border-[#28372B]/15 dark:border-white/15 rounded-2xl pl-10 pr-24 sm:pr-32 py-3 sm:py-3.5 text-xs sm:text-sm text-[#1D3027] dark:text-white placeholder-[#7D897F] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1E5B45] transition"
                        />
                        <button
                            type="submit"
                            className="absolute right-1.5 sm:right-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white text-xs font-bold transition shadow-xs"
                        >
                            Rechercher
                        </button>
                    </form>

                    {/* Stats Grid */}
                    <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto w-full">
                        <div className="sdbsnx-card p-3 sm:p-4 rounded-2xl text-center min-w-0 overflow-hidden">
                            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#1E5B45] dark:text-[#62A87A] truncate">
                                530+
                            </div>
                            <div className="text-[10px] font-mono uppercase text-[#7D897F] dark:text-[#849187] mt-1 font-semibold leading-tight">
                                Supports
                            </div>
                            <div className="text-[9px] font-mono uppercase text-[#7D897F]/70 dark:text-[#849187]/70 font-semibold leading-tight">
                                & Cours
                            </div>
                        </div>
                        <div className="sdbsnx-card p-3 sm:p-4 rounded-2xl text-center min-w-0 overflow-hidden">
                            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#1E5B45] dark:text-[#62A87A] truncate">
                                123
                            </div>
                            <div className="text-[10px] font-mono uppercase text-[#7D897F] dark:text-[#849187] mt-1 font-semibold leading-tight">
                                Tutoriels
                            </div>
                            <div className="text-[9px] font-mono uppercase text-[#7D897F]/70 dark:text-[#849187]/70 font-semibold leading-tight">
                                Vidéos
                            </div>
                        </div>
                        <div className="sdbsnx-card p-3 sm:p-4 rounded-2xl text-center min-w-0 overflow-hidden">
                            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#A8743F] dark:text-[#D5A45F] leading-none">
                                3
                            </div>
                            <div className="text-[10px] font-mono uppercase text-[#A8743F] dark:text-[#D5A45F] mt-1 font-bold leading-tight">
                                Niveaux
                            </div>
                            <div className="text-[9px] font-mono text-[#7D897F]/70 dark:text-[#849187]/70 font-semibold leading-tight mt-0.5">
                                L1 · L2 · L3
                            </div>
                        </div>
                        <div className="sdbsnx-card p-3 sm:p-4 rounded-2xl text-center min-w-0 overflow-hidden">
                            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#377657] dark:text-[#62A87A] truncate">
                                100%
                            </div>
                            <div className="text-[10px] font-mono uppercase text-[#7D897F] dark:text-[#849187] mt-1 font-semibold leading-tight">
                                Libre
                            </div>
                            <div className="text-[9px] font-mono uppercase text-[#7D897F]/70 dark:text-[#849187]/70 font-semibold leading-tight">
                                & Ouvert
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* REMERCIEMENTS SECTION (UNCHK, FORCE-N, LUCAD, GRAFIKART) */}
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="sdbsnx-card rounded-3xl p-6 sm:p-8 border border-[#28372B]/12 dark:border-white/10 relative overflow-hidden bg-white dark:bg-[#19231C]">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8743F]/12 border border-[#A8743F]/25 text-[#A8743F] dark:text-[#D5A45F] text-xs font-mono font-bold">
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            <span>REMERCIEMENTS</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] text-xs font-semibold">
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>Partenaires de formation</span>
                        </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-[#1D3027] dark:text-white">
                        Merci à l’<span className="text-[#1E5B45] dark:text-[#62A87A]">UNCHK</span> et à <span className="text-[#1E5B45] dark:text-[#62A87A]">FORCE-N</span>
                    </h2>

                    <div className="mt-4 p-5 rounded-2xl bg-[#F7F5EF] dark:bg-[#141C16] border border-[#28372B]/10 dark:border-white/5">
                        <p className="text-xs sm:text-sm text-[#1D3027] dark:text-[#C2CEC6] leading-relaxed italic">
                            « Nous remercions l’<strong className="text-[#1E5B45] dark:text-[#62A87A] font-bold">Université Numérique Cheikh Hamidou Kane (UNCHK)</strong> pour son engagement en faveur de la formation universitaire, ainsi que <strong className="text-[#1E5B45] dark:text-[#62A87A] font-bold">FORCE-N</strong> pour ses formations complémentaires et certifiantes. J’exprime également ma gratitude envers <strong className="text-[#1E5B45] dark:text-[#62A87A] font-bold">LUCAD</strong>, où j’ai bénéficié d’une solide formation en Python, qui m’a permis d’acquérir les connaissances nécessaires et de me préparer pleinement à la suite de mon parcours. »
                        </p>
                        <div className="mt-2 text-right text-[11px] font-mono font-bold text-[#7D897F] dark:text-[#849187]">
                            — SDBSNX • IDA COURS
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#28372B]/10 dark:border-white/10 flex items-center gap-2 text-xs text-[#59685F] dark:text-[#849187]">
                        <Youtube className="w-4 h-4 text-[#377657] dark:text-[#62A87A] shrink-0" />
                        <span>
                            Mention spéciale à <strong className="text-[#1D3027] dark:text-white font-bold">Grafikart</strong> pour ses vidéos pédagogiques, qui complètent les ressources proposées aux apprenants.
                        </span>
                    </div>
                </div>
            </section>

            {/* CURRICULUM UNIVERSITAIRE : LES 3 LICENCES */}
            <section className="py-14 bg-[#F0EEE6]/70 dark:bg-[#0E1511] border-y border-[#28372B]/10 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span>CURRICULUM UNIVERSITAIRE</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1D3027] dark:text-white">
                                Explorez Votre Niveau de Licence
                            </h2>
                            <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#849187] mt-1 max-w-xl">
                                Plus de 530 supports officiels (cours magistraux, fiches TD, TP et examens) directement accessibles.
                            </p>
                        </div>
                        <Link
                            href="/cours"
                            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1E5B45] dark:text-[#62A87A] hover:underline"
                        >
                            <span>Voir le catalogue complet (530+ ressources)</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* L1 Card */}
                        <div className="sdbsnx-card rounded-2xl p-6 relative group flex flex-col justify-between hover:shadow-xl transition-all bg-white dark:bg-[#1A241D]">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5B45]/12 border border-[#1E5B45]/30 text-[#1E5B45] dark:text-[#62A87A] font-mono font-bold text-xs mb-4">
                                    L1 • Fondations & Web
                                </div>
                                <h3 className="text-lg font-bold font-heading text-[#1D3027] dark:text-white group-hover:text-[#1E5B45] transition-colors">
                                    Licence 1 (L1) — Fondations & Algorithmique
                                </h3>
                                <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] mt-2 leading-relaxed">
                                    Acquérez les bases fondamentales : algorithmique, langage C, HTML5/CSS3, architecture des ordinateurs et mathématiques pour l'informatique.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F5EF] dark:bg-black/25 text-[#1D3027] dark:text-white font-bold border border-[#28372B]/10 dark:border-white/5">
                                        <FileText className="w-3 h-3 text-[#1E5B45]" /> 170 documents en ligne
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F5EF] dark:bg-black/25 text-[#377657] dark:text-[#62A87A] font-medium border border-[#28372B]/10 dark:border-white/5">
                                        <CircleCheck className="w-3 h-3 text-[#377657]" /> PDFs & TD Disponibles
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[#28372B]/10 dark:border-white/10">
                                <Link
                                    href="/cours/licence-1"
                                    className="w-full py-2.5 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition shadow-xs"
                                >
                                    <span>Accéder aux cours de L1</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* L2 Card */}
                        <div className="sdbsnx-card rounded-2xl p-6 relative group flex flex-col justify-between hover:shadow-xl transition-all bg-white dark:bg-[#1A241D]">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8743F]/12 border border-[#A8743F]/30 text-[#A8743F] dark:text-[#D5A45F] font-mono font-bold text-xs mb-4">
                                    L2 • Backend & Mobile
                                </div>
                                <h3 className="text-lg font-bold font-heading text-[#1D3027] dark:text-white group-hover:text-[#A8743F] transition-colors">
                                    Licence 2 (L2) — Programmation Avancée & Données
                                </h3>
                                <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] mt-2 leading-relaxed">
                                    Approfondissez la programmation orientée objet (Java, PHP), les bases de données relationnelles (SQL, Merise) et les réseaux informatiques.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F5EF] dark:bg-black/25 text-[#1D3027] dark:text-white font-bold border border-[#28372B]/10 dark:border-white/5">
                                        <FileText className="w-3 h-3 text-[#A8743F]" /> 333 documents en ligne
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F5EF] dark:bg-black/25 text-[#377657] dark:text-[#62A87A] font-medium border border-[#28372B]/10 dark:border-white/5">
                                        <CircleCheck className="w-3 h-3 text-[#377657]" /> PDFs & TD Disponibles
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[#28372B]/10 dark:border-white/10">
                                <Link
                                    href="/cours/licence-2"
                                    className="w-full py-2.5 rounded-xl bg-[#A8743F] hover:bg-[#8F5D30] text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition shadow-xs"
                                >
                                    <span>Accéder aux cours de L2</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* L3 Card */}
                        <div className="sdbsnx-card rounded-2xl p-6 relative group flex flex-col justify-between hover:shadow-xl transition-all bg-white dark:bg-[#1A241D]">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#377657]/12 border border-[#377657]/30 text-[#377657] dark:text-[#62A87A] font-mono font-bold text-xs mb-4">
                                    L3 • Architecture & Sécurité
                                </div>
                                <h3 className="text-lg font-bold font-heading text-[#1D3027] dark:text-white group-hover:text-[#377657] transition-colors">
                                    Licence 3 (L3) — Ingénierie Logicielle & Projets
                                </h3>
                                <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] mt-2 leading-relaxed">
                                    Maîtrisez les frameworks modernes (Laravel, React), le développement mobile, la sécurité applicative et préparez votre Projet de Fin d'Études (PFE).
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F5EF] dark:bg-black/25 text-[#1D3027] dark:text-white font-bold border border-[#28372B]/10 dark:border-white/5">
                                        <FileText className="w-3 h-3 text-[#377657]" /> 30 documents en ligne
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F5EF] dark:bg-black/25 text-[#377657] dark:text-[#62A87A] font-medium border border-[#28372B]/10 dark:border-white/5">
                                        <CircleCheck className="w-3 h-3 text-[#377657]" /> PDFs & TD Disponibles
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[#28372B]/10 dark:border-white/10">
                                <Link
                                    href="/cours/licence-3"
                                    className="w-full py-2.5 rounded-xl bg-[#377657] hover:bg-[#2A5C43] text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition shadow-xs"
                                >
                                    <span>Accéder aux cours de L3</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SPÉCIALISATIONS (Cybersécurité & Entrepreneuriat) */}
            <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1D3027] dark:text-white">
                        Spécialisations
                    </h2>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#849187] mt-1">
                        Cybersécurité et entrepreneuriat numérique au Sénégal.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cyber Card */}
                    <div className="sdbsnx-card rounded-2xl p-6 flex flex-col justify-between bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] font-mono font-bold text-xs mb-3">
                                <Shield className="w-3.5 h-3.5" />
                                <span>CYBERSÉCURITÉ</span>
                            </div>
                            <h3 className="text-lg font-bold font-heading text-[#1D3027] dark:text-white">
                                Ressources en Cybersécurité
                            </h3>
                            <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] mt-2 leading-relaxed">
                                Hacking éthique, vulnérabilités OWASP Top 10, analyse de trames Wireshark, durcissement serveur Linux et conformité avec la Commission des Données Personnelles (CDP Sénégal).
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F5EF] dark:bg-black/25 text-[#1D3027] dark:text-white font-bold border border-[#28372B]/10 dark:border-white/5">
                                    <Shield className="w-3 h-3 text-[#1E5B45]" /> Labs & Normes ISO
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F5EF] dark:bg-black/25 text-[#377657] dark:text-[#62A87A] font-medium border border-[#28372B]/10 dark:border-white/5">
                                    <CircleCheck className="w-3 h-3 text-[#377657]" /> Espace Documents Ouvert
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-[#28372B]/10 dark:border-white/10">
                            <Link
                                href="/cybersecurite"
                                className="w-full py-2.5 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition"
                            >
                                <span>Explorer les ressources Cybersécurité</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Entrepreneuriat Card */}
                    <div className="sdbsnx-card rounded-2xl p-6 flex flex-col justify-between bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8743F]/12 text-[#A8743F] dark:text-[#D5A45F] font-mono font-bold text-xs mb-3">
                                <Rocket className="w-3.5 h-3.5" />
                                <span>ENTREPRENEURIAT</span>
                            </div>
                            <h3 className="text-lg font-bold font-heading text-[#1D3027] dark:text-white">
                                Entrepreneuriat Tech & Business
                            </h3>
                            <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] mt-2 leading-relaxed">
                                Création d'entreprise au Sénégal (APIX, NINEA, RCCM), structuration du Business Model Canvas, rédaction de Pitch Decks percutants et accès aux financements (DER/FJ, CTIC, Force-N).
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F5EF] dark:bg-black/25 text-[#1D3027] dark:text-white font-bold border border-[#28372B]/10 dark:border-white/5">
                                    <Rocket className="w-3 h-3 text-[#A8743F]" /> Modèles & Pitch Decks
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F5EF] dark:bg-black/25 text-[#377657] dark:text-[#62A87A] font-medium border border-[#28372B]/10 dark:border-white/5">
                                    <CircleCheck className="w-3 h-3 text-[#377657]" /> Guides Légaux Sénégal
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-[#28372B]/10 dark:border-white/10">
                            <Link
                                href="/entrepreneuriat"
                                className="w-full py-2.5 rounded-xl bg-[#A8743F] hover:bg-[#8F5D30] text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition"
                            >
                                <span>Découvrir le Pôle Entrepreneuriat</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 123 VIDÉOS PAR TECHNOLOGIE (GRAFIKART) */}
            <section className="py-14 bg-[#F0EEE6]/70 dark:bg-[#0E1511] border-t border-[#28372B]/10 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8743F]/12 text-[#A8743F] dark:text-[#D5A45F] text-xs font-mono font-bold mb-2">
                                <CodeXml className="w-3.5 h-3.5" />
                                <span>VIDÉOTHÈQUE & COMPÉTENCES CLÉS</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1D3027] dark:text-white">
                                123 Vidéos par Technologie
                            </h2>
                            <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#849187] mt-1">
                                Cliquez sur un langage ou framework pour accéder immédiatement à toutes les vidéos dédiées réalisées par Grafikart.
                            </p>
                        </div>
                        <Link
                            href="/videos"
                            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1E5B45] dark:text-[#62A87A] hover:underline"
                        >
                            <span>Voir toute la vidéothèque HD</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {techVideos.map((tech) => (
                            <Link
                                key={tech.id}
                                href="/videos"
                                className="sdbsnx-card rounded-2xl p-5 group flex flex-col justify-between hover:shadow-xl transition-all bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm text-white"
                                            style={{ backgroundColor: tech.color }}
                                        >
                                            {tech.id.toUpperCase().slice(0, 3)}
                                        </div>
                                        <span
                                            className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full"
                                            style={{ backgroundColor: `${tech.color}18`, color: tech.color }}
                                        >
                                            <Play className="w-2.5 h-2.5 fill-current" />
                                            <span>{tech.vidCount} vidéos</span>
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold font-heading text-[#1D3027] dark:text-white group-hover:text-[#1E5B45] transition-colors">
                                        {tech.title}
                                    </h3>
                                    <p className="text-xs text-[#59685F] dark:text-[#849187] mt-1.5 leading-relaxed">
                                        {tech.desc}
                                    </p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-[#28372B]/10 dark:border-white/10 flex items-center justify-between text-xs font-mono font-bold" style={{ color: tech.color }}>
                                    <span>Visionner les tutoriels</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* UN-CHK INSTITUTIONAL SPOTLIGHT & VIDEO PRESENTATION */}
            <section className="py-14 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="sdbsnx-card rounded-3xl p-6 sm:p-10 border border-[#28372B]/12 dark:border-white/10 relative overflow-hidden bg-white dark:bg-[#1A241D]">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Text / Info column */}
                            <div className="lg:col-span-7">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E5B45]/10 border border-[#1E5B45]/20 text-[#1E5B45] dark:text-[#62A87A] text-xs font-bold font-mono mb-4">
                                    <Award className="w-3.5 h-3.5" />
                                    <span>VISION ACADÉMIQUE SÉNÉGAL</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1D3027] dark:text-white leading-tight">
                                    L'Excellence Numérique à l'UNCHK (ex-UVS)
                                </h2>
                                <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] mt-3 leading-relaxed">
                                    L'Université Numérique Cheikh Hamidou Kane offre une opportunité historique de démocratiser le savoir technologique de haut niveau. Grâce à la formation à distance, apprenez à votre rythme tout en développant une rigueur et une autonomie indispensables aux grands ingénieurs logiciels de demain.
                                </p>

                                <div className="mt-6 flex flex-col gap-2.5 text-xs font-medium text-[#1D3027] dark:text-white">
                                    <div className="flex items-center gap-2">
                                        <CircleCheck className="w-4 h-4 text-[#1E5B45] dark:text-[#62A87A] shrink-0" />
                                        <span>Diplômes universitaires reconnus par le CAMES</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CircleCheck className="w-4 h-4 text-[#1E5B45] dark:text-[#62A87A] shrink-0" />
                                        <span>Flexibilité totale pour étudiants et professionnels</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CircleCheck className="w-4 h-4 text-[#1E5B45] dark:text-[#62A87A] shrink-0" />
                                        <span>Espaces Numériques Ouverts (ENO) dans toutes les régions du Sénégal</span>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-wrap items-center gap-3">
                                    <button
                                        onClick={() => setActiveVideoModal('S2saQVUIBe8')}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white text-xs font-bold transition shadow-xs"
                                    >
                                        <Play className="w-4 h-4 fill-white" />
                                        <span>Regarder la Présentation Officielle</span>
                                    </button>
                                    <a
                                        href="https://unchk.sn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F7F5EF] dark:bg-white/10 hover:bg-[#F0EEE6] dark:hover:bg-white/20 text-[#1D3027] dark:text-white text-xs font-semibold transition"
                                    >
                                        <span>Portail unchk.sn</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>

                            {/* Video Preview thumbnail column */}
                            <div className="lg:col-span-5">
                                <div
                                    onClick={() => setActiveVideoModal('S2saQVUIBe8')}
                                    className="relative rounded-2xl overflow-hidden group cursor-pointer border border-[#28372B]/15 dark:border-white/10 shadow-xl aspect-video bg-slate-900"
                                >
                                    <img
                                        src="https://img.youtube.com/vi/S2saQVUIBe8/hqdefault.jpg"
                                        alt="L'importance d'étudier à L'UNCHK"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4">
                                        <div className="flex justify-end">
                                            <span className="px-2 py-0.5 rounded-md bg-black/70 text-white font-mono text-[10px] font-bold">
                                                UN-CHK Officiel
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-[#1E5B45] text-white flex items-center justify-center group-hover:scale-110 shadow-lg transition-transform">
                                                <Play className="w-5 h-5 fill-white ml-0.5" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-white line-clamp-1">
                                                    L'importance d'étudier à L'UNCHK
                                                </div>
                                                <div className="text-[10px] text-slate-300">
                                                    Vidéo de présentation institutionnelle
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATALOGUE RÉCENT AVEC ONGLETS */}
            <section className="py-14 bg-[#F0EEE6]/70 dark:bg-[#0E1511] border-t border-[#28372B]/10 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Bibliothèque Ouverte</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1D3027] dark:text-white">
                                Ressources Pédagogiques Récentes
                            </h2>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10 text-xs font-medium">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`px-3 py-1.5 rounded-lg transition ${
                                    activeTab === 'all'
                                        ? 'bg-[#1E5B45] text-white font-bold shadow-xs'
                                        : 'text-[#59685F] dark:text-[#849187] hover:text-[#1D3027] dark:hover:text-white'
                                }`}
                            >
                                Tous
                            </button>
                            <button
                                onClick={() => setActiveTab('course')}
                                className={`px-3 py-1.5 rounded-lg transition ${
                                    activeTab === 'course'
                                        ? 'bg-[#1E5B45] text-white font-bold shadow-xs'
                                        : 'text-[#59685F] dark:text-[#849187] hover:text-[#1D3027] dark:hover:text-white'
                                }`}
                            >
                                Cours
                            </button>
                            <button
                                onClick={() => setActiveTab('td')}
                                className={`px-3 py-1.5 rounded-lg transition ${
                                    activeTab === 'td'
                                        ? 'bg-[#1E5B45] text-white font-bold shadow-xs'
                                        : 'text-[#59685F] dark:text-[#849187] hover:text-[#1D3027] dark:hover:text-white'
                                }`}
                            >
                                TD & Exercices
                            </button>
                            <button
                                onClick={() => setActiveTab('exam')}
                                className={`px-3 py-1.5 rounded-lg transition ${
                                    activeTab === 'exam'
                                        ? 'bg-[#1E5B45] text-white font-bold shadow-xs'
                                        : 'text-[#59685F] dark:text-[#849187] hover:text-[#1D3027] dark:hover:text-white'
                                }`}
                            >
                                Examens
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {filteredResources.map((res) => (
                            <ResourceCard key={res.id} resource={res} />
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            href="/cours"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white text-xs font-bold font-mono transition shadow-xs"
                        >
                            <BookOpen className="w-4 h-4" />
                            <span>Voir le catalogue complet des {stats.resources_count}+ ressources</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* VIDEO PLAYER MODAL */}
            {activeVideoModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
                    onClick={() => setActiveVideoModal(null)}
                >
                    <div
                        className="relative w-full max-w-4xl bg-[#101713] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-3.5 bg-[#151E18] border-b border-white/10">
                            <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                                <Video className="w-3.5 h-3.5 text-[#1E5B45] dark:text-[#62A87A]" />
                                <span>Présentation UN-CHK</span>
                            </span>
                            <button
                                onClick={() => setActiveVideoModal(null)}
                                className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded"
                            >
                                ✕ Fermer
                            </button>
                        </div>
                        <div className="aspect-video w-full bg-black">
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal}?autoplay=1`}
                                title="Vidéo UN-CHK"
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

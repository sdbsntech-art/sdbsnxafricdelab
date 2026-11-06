import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import SdbsnxBrand from '@/Components/SdbsnxBrand';
import {
    BookOpen,
    GraduationCap,
    Shield,
    Sparkles,
    Search,
    Sun,
    Moon,
    Download,
    Lock,
    X,
    ChevronDown,
    Menu,
    LogOut,
    ExternalLink,
    HelpCircle,
    Users,
    Video,
    Briefcase,
    ShieldCheck,
    MessageSquare,
    FolderKanban,
    Rocket,
    House,
    Radio,
    Heart,
    Coffee,
} from 'lucide-react';

interface AppLayoutProps {
    title?: string;
}

export default function AppLayout({ children }: PropsWithChildren<AppLayoutProps>) {
    const pageProps = usePage<PageProps & { activeAlerts?: any[] }>().props;
    const { auth } = pageProps;
    const activeAlerts = pageProps.activeAlerts || [];
    const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);

    // Theme state
    const [isDark, setIsDark] = useState(true);

    // Dropdowns & Modals
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [adminModalOpen, setAdminModalOpen] = useState(false);

    // Admin login form
    const { data: adminData, setData: setAdminData, post: postAdminLogin, processing: adminProcessing, errors: adminErrors, reset: resetAdminForm } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        const currentTheme = localStorage.getItem('sdbsnx_theme') || 'dark';
        if (currentTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        } else {
            setIsDark(true);
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        }

        // Global Ctrl+K keyboard shortcut for search
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setSearchModalOpen((prev) => !prev);
            } else if (e.key === 'Escape') {
                setSearchModalOpen(false);
                setAdminModalOpen(false);
                setOpenDropdown(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const toggleTheme = () => {
        const nextDark = !isDark;
        setIsDark(nextDark);
        if (nextDark) {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            localStorage.setItem('sdbsnx_theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('sdbsnx_theme', 'light');
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setSearchModalOpen(false);
            window.location.href = `/cours?search=${encodeURIComponent(searchQuery.trim())}`;
        }
    };

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        postAdminLogin('/login', {
            onSuccess: () => {
                setAdminModalOpen(false);
                resetAdminForm();
                window.location.href = '/admin';
            },
        });
    };

    const isAdmin = auth.user && auth.user.role === 'admin';

    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 bg-[#F7F5EF] dark:bg-[#101713] text-[#1D3027] dark:text-[#FFFFFF] overflow-x-hidden w-full max-w-full">
            {/* Top Announcement Bar */}
            <div className="bg-gradient-to-r from-[#1E5B45] via-[#2F6D52] to-[#A8743F] text-white text-xs py-1.5 px-3 sm:px-4 text-center flex items-center justify-center gap-2 shadow-xs overflow-hidden">
                <span className="inline-flex items-center gap-1 font-bold text-white bg-black/25 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider truncate">
                    <Sparkles className="w-3 h-3 text-[#D5A45F] shrink-0" /> SDBSNX • IDA
                </span>
                <span className="text-white/95 text-xs font-medium hidden sm:inline truncate">
                    Accès 100% libre et gratuit aux cours, TD, examens et vidéos • Licence 1, 2, 3
                </span>
            </div>

            {/* LIVE SITE ALERTS (Diffusées en direct par l'admin) */}
            {activeAlerts
                .filter((alert: any) => !dismissedAlerts.includes(alert.id))
                .map((alert: any) => {
                    const isUrgent = alert.type === 'urgent' || alert.type === 'danger';
                    const isWarning = alert.type === 'warning';
                    const isSuccess = alert.type === 'success';

                    let bannerBg = 'bg-sky-600 text-white';
                    if (isUrgent) bannerBg = 'bg-red-600 text-white';
                    else if (isWarning) bannerBg = 'bg-amber-600 text-white';
                    else if (isSuccess) bannerBg = 'bg-emerald-700 text-white';

                    return (
                        <div
                            key={alert.id}
                            className={`${bannerBg} px-3 sm:px-4 py-2 border-b border-black/10 flex items-center justify-between text-xs transition-all`}
                        >
                            <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap justify-center text-center flex-1">
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono font-bold text-[10px] bg-black/25 ${alert.is_blinking ? 'animate-pulse' : ''}`}>
                                    <Radio className="w-3 h-3 animate-ping" />
                                    <span>{alert.title || 'ALERTE OFFICIELLE'}</span>
                                </span>
                                <span className={`font-medium ${alert.is_blinking ? 'animate-pulse font-bold' : ''}`}>
                                    {alert.message}
                                </span>
                                {alert.action_url && (
                                    <a
                                        href={alert.action_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 underline font-bold hover:text-white/80 ml-2"
                                    >
                                        <span>{alert.action_text || 'Consulter les détails'}</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                            <button
                                onClick={() => setDismissedAlerts((prev) => [...prev, alert.id])}
                                className="p-1 rounded-md hover:bg-black/20 text-white/80 hover:text-white shrink-0 ml-2"
                                title="Fermer cette notification"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    );
                })}

            {/* STICKY HEADER */}
            <header className="sticky top-0 z-50 bg-[#F7F5EF]/95 dark:bg-[#101713]/95 backdrop-blur-md border-b border-[#28372B]/10 dark:border-white/10 shadow-xs">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
                        {/* Left: Brand */}
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <SdbsnxBrand />
                        </div>

                        {/* Center: Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1.5">
                            <Link
                                href="/"
                                className="px-3 py-2 rounded-lg text-xs font-semibold text-[#59685F] dark:text-[#C2CEC6] hover:text-[#1E5B45] dark:hover:text-[#62A87A] hover:bg-[#1E5B45]/08 dark:hover:bg-white/5 transition flex items-center gap-1.5"
                            >
                                <House className="w-3.5 h-3.5 text-[#1E5B45] dark:text-[#62A87A]" />
                                <span>Accueil</span>
                            </Link>

                            {/* Dropdown 1: Cours (L1, L2, L3) */}
                            <div className="relative">
                                <button
                                    onClick={() => setOpenDropdown(openDropdown === 'cours' ? null : 'cours')}
                                    onBlur={() => setTimeout(() => setOpenDropdown(null), 250)}
                                    className="px-3 py-2 rounded-lg text-xs font-semibold text-[#59685F] dark:text-[#C2CEC6] hover:text-[#1E5B45] dark:hover:text-[#62A87A] hover:bg-[#1E5B45]/08 dark:hover:bg-white/5 transition flex items-center gap-1"
                                >
                                    <GraduationCap className="w-3.5 h-3.5 text-[#1E5B45] dark:text-[#62A87A]" />
                                    <span>Cours</span>
                                    <ChevronDown className={`w-3 h-3 opacity-70 transition-transform ${openDropdown === 'cours' ? 'rotate-180' : ''}`} />
                                </button>

                                {openDropdown === 'cours' && (
                                    <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-[#1A241D] shadow-2xl p-2 border border-[#28372B]/12 dark:border-white/10 z-50">
                                        <Link
                                            href="/cours/licence-1"
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-[#1D3027] dark:text-[#FFFFFF] hover:bg-[#1E5B45]/08 dark:hover:bg-white/5 hover:text-[#1E5B45] dark:hover:text-[#62A87A] transition"
                                        >
                                            <span className="w-7 h-7 rounded-lg bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] font-mono font-bold flex items-center justify-center text-xs">L1</span>
                                            <div>
                                                <div className="font-bold">Licence 1 (L1)</div>
                                                <div className="text-[10px] text-[#7D897F] dark:text-[#849187]">170 supports • Fondations & Web</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/cours/licence-2"
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-[#1D3027] dark:text-[#FFFFFF] hover:bg-[#A8743F]/08 dark:hover:bg-white/5 hover:text-[#A8743F] dark:hover:text-[#D5A45F] transition"
                                        >
                                            <span className="w-7 h-7 rounded-lg bg-[#A8743F]/10 text-[#A8743F] dark:text-[#D5A45F] font-mono font-bold flex items-center justify-center text-xs">L2</span>
                                            <div>
                                                <div className="font-bold">Licence 2 (L2)</div>
                                                <div className="text-[10px] text-[#7D897F] dark:text-[#849187]">333 supports • Spécialisations</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/cours/licence-3"
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-[#1D3027] dark:text-[#FFFFFF] hover:bg-[#377657]/08 dark:hover:bg-white/5 hover:text-[#377657] dark:hover:text-[#62A87A] transition"
                                        >
                                            <span className="w-7 h-7 rounded-lg bg-[#377657]/10 text-[#377657] dark:text-[#62A87A] font-mono font-bold flex items-center justify-center text-xs">L3</span>
                                            <div>
                                                <div className="font-bold">Licence 3 (L3)</div>
                                                <div className="text-[10px] text-[#7D897F] dark:text-[#849187]">30 supports • Ingénierie & Sécurité</div>
                                            </div>
                                        </Link>
                                        <div className="border-t border-[#28372B]/10 dark:border-white/10 my-1" />
                                        <Link
                                            href="/cours"
                                            className="block px-3 py-2 text-[11px] font-mono font-semibold text-[#1E5B45] dark:text-[#62A87A] hover:underline"
                                        >
                                            Voir tout le catalogue complet (530+ supports) →
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Dropdown 2: Explorer */}
                            <div className="relative">
                                <button
                                    onClick={() => setOpenDropdown(openDropdown === 'explorer' ? null : 'explorer')}
                                    onBlur={() => setTimeout(() => setOpenDropdown(null), 250)}
                                    className="px-3 py-2 rounded-lg text-xs font-semibold text-[#59685F] dark:text-[#C2CEC6] hover:text-[#1E5B45] dark:hover:text-[#62A87A] hover:bg-[#1E5B45]/08 dark:hover:bg-white/5 transition flex items-center gap-1"
                                >
                                    <BookOpen className="w-3.5 h-3.5 text-[#A8743F] dark:text-[#D5A45F]" />
                                    <span>Explorer</span>
                                    <ChevronDown className={`w-3 h-3 opacity-70 transition-transform ${openDropdown === 'explorer' ? 'rotate-180' : ''}`} />
                                </button>

                                {openDropdown === 'explorer' && (
                                    <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#1A241D] shadow-2xl p-2 border border-[#28372B]/12 dark:border-white/10 z-50">
                                        <Link
                                            href="/videos"
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-[#1D3027] dark:text-[#FFFFFF] hover:bg-[#1E5B45]/08 dark:hover:bg-white/5 hover:text-[#1E5B45] transition"
                                        >
                                            <Video className="w-4 h-4 text-[#A8743F]" />
                                            <div>
                                                <div className="font-bold flex items-center gap-1.5">
                                                    <span>Vidéothèque HD</span>
                                                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#A8743F]/15 text-[#A8743F] font-mono">123 HD</span>
                                                </div>
                                                <div className="text-[10px] text-[#7D897F] dark:text-[#849187]">123 tutoriels Grafikart</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/cybersecurite"
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-[#1D3027] dark:text-[#FFFFFF] hover:bg-[#1E5B45]/08 dark:hover:bg-white/5 hover:text-[#1E5B45] transition"
                                        >
                                            <ShieldCheck className="w-4 h-4 text-[#1E5B45] dark:text-[#62A87A]" />
                                            <div>
                                                <div className="font-bold">Cybersécurité</div>
                                                <div className="text-[10px] text-[#7D897F] dark:text-[#849187]">Réseaux, OWASP & Protocoles</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/entrepreneuriat"
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-[#1D3027] dark:text-[#FFFFFF] hover:bg-[#1E5B45]/08 dark:hover:bg-white/5 hover:text-[#A8743F] transition"
                                        >
                                            <Rocket className="w-4 h-4 text-[#A8743F]" />
                                            <div>
                                                <div className="font-bold">Entrepreneuriat</div>
                                                <div className="text-[10px] text-[#7D897F] dark:text-[#849187]">Startups, BMC & Pitch Decks</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/bibliotheque"
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-[#1D3027] dark:text-[#FFFFFF] hover:bg-[#1E5B45]/08 dark:hover:bg-white/5 hover:text-[#1E5B45] transition"
                                        >
                                            <FolderKanban className="w-4 h-4 text-[#377657] dark:text-[#62A87A]" />
                                            <div>
                                                <div className="font-bold">Bibliothèque</div>
                                                <div className="text-[10px] text-[#7D897F] dark:text-[#849187]">E-books & Livres de référence</div>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Dropdown 3: Communauté */}
                            <div className="relative">
                                <button
                                    onClick={() => setOpenDropdown(openDropdown === 'communaute' ? null : 'communaute')}
                                    onBlur={() => setTimeout(() => setOpenDropdown(null), 250)}
                                    className="px-3 py-2 rounded-lg text-xs font-semibold text-[#59685F] dark:text-[#C2CEC6] hover:text-[#1E5B45] dark:hover:text-[#62A87A] hover:bg-[#1E5B45]/08 dark:hover:bg-white/5 transition flex items-center gap-1"
                                >
                                    <Users className="w-3.5 h-3.5 text-[#377657] dark:text-[#62A87A]" />
                                    <span>Communauté</span>
                                    <ChevronDown className={`w-3 h-3 opacity-70 transition-transform ${openDropdown === 'communaute' ? 'rotate-180' : ''}`} />
                                </button>

                                {openDropdown === 'communaute' && (
                                    <div className="absolute top-full left-0 mt-2 w-60 rounded-2xl bg-white dark:bg-[#1A241D] shadow-2xl p-2 border border-[#28372B]/12 dark:border-white/10 z-50">
                                        <Link
                                            href="/communaute"
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1D3027] dark:text-[#FFFFFF] hover:bg-[#1E5B45]/08 dark:hover:bg-white/5 hover:text-[#1E5B45] transition"
                                        >
                                            <MessageSquare className="w-4 h-4 text-[#1E5B45] dark:text-[#62A87A]" />
                                            <div>
                                                <div className="font-bold">Discussion & Forum</div>
                                                <div className="text-[10px] text-[#7D897F] dark:text-[#849187]">Entraide entre étudiants</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/opportunites"
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1D3027] dark:text-[#FFFFFF] hover:bg-[#A8743F]/08 dark:hover:bg-white/5 hover:text-[#A8743F] transition"
                                        >
                                            <Briefcase className="w-4 h-4 text-[#A8743F]" />
                                            <div>
                                                <div className="font-bold">Opportunités & Stages</div>
                                                <div className="text-[10px] text-[#7D897F] dark:text-[#849187]">Certifications & insertions</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/faq"
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1D3027] dark:text-[#FFFFFF] hover:bg-[#1E5B45]/08 dark:hover:bg-white/5 hover:text-[#1E5B45] transition"
                                        >
                                            <HelpCircle className="w-4 h-4 text-[#377657] dark:text-[#62A87A]" />
                                            <div>
                                                <div className="font-bold">Aide & FAQ</div>
                                                <div className="text-[10px] text-[#7D897F] dark:text-[#849187]">Questions fréquentes</div>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/faq"
                                className="px-3 py-2 rounded-lg text-xs font-semibold text-[#59685F] dark:text-[#C2CEC6] hover:text-[#1E5B45] dark:hover:text-[#62A87A] hover:bg-[#1E5B45]/08 dark:hover:bg-white/5 transition"
                            >
                                FAQ
                            </Link>
                        </nav>

                        {/* Right: Actions (Search, Theme, PWA Install, Admin Button) */}
                        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                            {/* Search Button (Ctrl+K) */}
                            <button
                                onClick={() => setSearchModalOpen(true)}
                                className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-[#28372B]/12 dark:border-white/10 bg-white dark:bg-[#1A241D] hover:border-[#1E5B45]/50 text-xs text-[#59685F] dark:text-[#C2CEC6] flex items-center gap-1.5 sm:gap-2 transition shadow-2xs"
                                title="Rechercher (Ctrl+K)"
                            >
                                <Search className="w-3.5 h-3.5 text-[#7D897F] dark:text-[#849187]" />
                                <span className="hidden sm:inline font-medium">Rechercher</span>
                                <kbd className="hidden md:inline font-mono text-[10px] bg-[#F7F5EF] dark:bg-black/30 border border-[#28372B]/10 dark:border-white/10 px-1.5 py-0.5 rounded text-[#7D897F]">Ctrl K</kbd>
                            </button>

                            {/* Theme Toggle Button */}
                            <button
                                onClick={toggleTheme}
                                className="p-1.5 sm:p-2 rounded-xl border border-[#28372B]/12 dark:border-white/10 bg-white dark:bg-[#1A241D] text-[#59685F] dark:text-[#C2CEC6] hover:text-[#A8743F] transition shadow-2xs"
                                title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
                            >
                                {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D5A45F]" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1E5B45]" />}
                            </button>

                            {/* PWA Install Button */}
                            <button
                                onClick={() => {
                                    alert("Pour installer SDBSNX sur votre appareil, cliquez sur 'Ajouter à l'écran d'accueil' dans les paramètres de votre navigateur !");
                                }}
                                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white font-semibold text-xs shadow-xs transition"
                            >
                                <Download className="w-3.5 h-3.5" />
                                <span>Installer</span>
                            </button>

                            {/* ADMIN ONLY AUTHENTICATION BUTTON */}
                            {isAdmin ? (
                                <div className="flex items-center gap-1 sm:gap-1.5 ml-0.5 sm:ml-1">
                                    <Link
                                        href="/admin"
                                        className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#1E5B45]/15 text-[#1E5B45] dark:text-[#62A87A] border border-[#1E5B45]/30 text-[11px] sm:text-xs font-bold font-mono flex items-center gap-1"
                                    >
                                        <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        <span className="hidden xs:inline">Admin</span>
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="p-1 sm:p-1.5 rounded-xl text-[#7D897F] hover:text-red-500 transition"
                                        title="Déconnexion Admin"
                                    >
                                        <LogOut className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setAdminModalOpen(true)}
                                    className="hidden sm:flex p-2 rounded-xl border border-[#28372B]/12 dark:border-white/10 bg-white dark:bg-[#1A241D] text-[#7D897F] hover:text-[#1E5B45] dark:hover:text-[#62A87A] transition ml-1"
                                    title="Espace Administrateur"
                                >
                                    <Lock className="w-3.5 h-3.5" />
                                </button>
                            )}

                            {/* Mobile menu trigger */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-1.5 sm:p-2 text-[#59685F] dark:text-[#C2CEC6] hover:text-[#1D3027] dark:hover:text-white"
                                aria-label="Menu"
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-[#F7F5EF] dark:bg-[#101713] border-t border-[#28372B]/10 dark:border-white/10 p-4 space-y-4 shadow-xl">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1.5">
                                <div className="font-mono uppercase font-bold text-[#1E5B45] dark:text-[#62A87A] text-[10px] mb-1">COURS</div>
                                <Link href="/cours/licence-1" className="block py-1 text-[#1D3027] dark:text-[#C2CEC6] hover:text-[#1E5B45]">• Licence 1 (L1)</Link>
                                <Link href="/cours/licence-2" className="block py-1 text-[#1D3027] dark:text-[#C2CEC6] hover:text-[#1E5B45]">• Licence 2 (L2)</Link>
                                <Link href="/cours/licence-3" className="block py-1 text-[#1D3027] dark:text-[#C2CEC6] hover:text-[#1E5B45]">• Licence 3 (L3)</Link>
                                <Link href="/cours" className="block py-1 text-[#1E5B45] dark:text-[#62A87A] font-semibold">• Tout le catalogue</Link>
                            </div>

                            <div className="space-y-1.5">
                                <div className="font-mono uppercase font-bold text-[#A8743F] dark:text-[#D5A45F] text-[10px] mb-1">EXPLORER</div>
                                <Link href="/videos" className="block py-1 text-[#1D3027] dark:text-[#C2CEC6] hover:text-[#1E5B45]">• Vidéothèque HD</Link>
                                <Link href="/bibliotheque" className="block py-1 text-[#1D3027] dark:text-[#C2CEC6] hover:text-[#1E5B45]">• Bibliothèque PDF</Link>
                                <Link href="/cybersecurite" className="block py-1 text-[#1D3027] dark:text-[#C2CEC6] hover:text-[#1E5B45]">• Cybersécurité</Link>
                                <Link href="/entrepreneuriat" className="block py-1 text-[#1D3027] dark:text-[#C2CEC6] hover:text-[#1E5B45]">• Entrepreneuriat</Link>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-[#28372B]/10 dark:border-white/10 flex items-center justify-between text-xs">
                            <Link href="/communaute" className="font-semibold text-[#1E5B45] dark:text-[#62A87A]">
                                Forum d'entraide
                            </Link>
                            <Link href="/faq" className="font-semibold text-[#59685F] dark:text-[#C2CEC6]">
                                FAQ & Aide
                            </Link>
                            {!isAdmin && (
                                <button
                                    onClick={() => setAdminModalOpen(true)}
                                    className="font-mono text-[#A8743F] dark:text-[#D5A45F] flex items-center gap-1"
                                >
                                    <Lock className="w-3 h-3" /> Espace Admin
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1">
                {children}
            </main>

            {/* FOOTER */}
            <footer className="border-t border-[#28372B]/12 dark:border-white/10 bg-[#F0EEE6] dark:bg-[#0A100D] pt-10 pb-10 text-xs text-[#59685F] dark:text-[#849187] transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Band */}
                    <div className="mb-10 p-5 rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/10 dark:border-white/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
                            <span className="px-2.5 py-1 rounded-full bg-[#1E5B45]/10 dark:bg-[#62A87A]/15 text-[#1E5B45] dark:text-[#62A87A] font-bold text-[11px] font-mono">
                                Accès gratuit
                            </span>
                            <span className="font-heading font-bold text-sm text-[#1D3027] dark:text-white">
                                Cours, TD, examens, vidéos et ressources de haute qualité académique.
                            </span>
                        </div>
                        <Link
                            href="/cours"
                            className="px-4 py-2 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white font-semibold text-xs shadow-xs transition whitespace-nowrap"
                        >
                            Explorer les cours
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#28372B]/10 dark:border-white/10">
                        {/* Column 1: Brand & Slogan */}
                        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/sdbsnx-logo.png"
                                    alt="SDBSNX"
                                    className="h-9 w-auto object-contain rounded-lg bg-white px-2 py-1 shadow-2xs border border-slate-200/60"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-extrabold text-base text-[#1D3027] dark:text-white">
                                    SDBSNX
                                </span>
                                <span className="text-[11px] font-semibold text-[#7D897F] dark:text-[#849187]">
                                    Licence Informatique & Développement d'Applications
                                </span>
                            </div>
                            <p className="text-[#59685F] dark:text-[#849187] leading-relaxed text-xs">
                                Plateforme éducative indépendante d'entraide pour étudiants en informatique au Sénégal.
                            </p>
                            <div className="font-mono text-[#1E5B45] dark:text-[#62A87A] text-[11px] font-bold">
                                « CODE • TECH • IMPACT »
                            </div>
                        </div>

                        {/* Column 2: Cursus */}
                        <div className="space-y-2">
                            <div className="font-mono font-bold uppercase text-[#1D3027] dark:text-white text-xs">
                                Formations & Cursus
                            </div>
                            <ul className="space-y-1.5">
                                <li><Link href="/cours/licence-1" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Licence 1 (L1) • Fondations</Link></li>
                                <li><Link href="/cours/licence-2" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Licence 2 (L2) • Spécialisation</Link></li>
                                <li><Link href="/cours/licence-3" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Licence 3 (L3) • Ingénierie</Link></li>
                                <li><Link href="/cours" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A] font-semibold text-[#1E5B45] dark:text-[#62A87A]">Catalogue des Cours →</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Explorer & Outils */}
                        <div className="space-y-2">
                            <div className="font-mono font-bold uppercase text-[#1D3027] dark:text-white text-xs">
                                Explorer & Outils
                            </div>
                            <ul className="space-y-1.5">
                                <li><Link href="/videos" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Vidéothèque HD (123 tutos)</Link></li>
                                <li><Link href="/bibliotheque" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Bibliothèque E-books</Link></li>
                                <li><Link href="/cybersecurite" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Cybersécurité & Réseaux</Link></li>
                                <li><Link href="/entrepreneuriat" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Entrepreneuriat Tech</Link></li>
                            </ul>
                        </div>

                        {/* Column 4: Cadre Juridique & Conformité */}
                        <div className="space-y-2">
                            <div className="font-mono font-bold uppercase text-[#1D3027] dark:text-white text-xs">
                                Légal & Conformité
                            </div>
                            <ul className="space-y-1.5">
                                <li><Link href="/mentions-legales" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Mentions Légales</Link></li>
                                <li><Link href="/politique-de-confidentialite" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Confidentialité (CDP Sénégal)</Link></li>
                                <li><Link href="/cookies" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Gestion des Cookies</Link></li>
                                <li><Link href="/conditions-generales-utilisation" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Conditions d'Utilisation (CGU)</Link></li>
                                <li><Link href="/a-propos" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">À Propos du Projet</Link></li>
                                <li><Link href="/contact" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A] font-semibold text-[#1E5B45] dark:text-[#62A87A]">Contact & Signalements</Link></li>
                            </ul>
                        </div>

                        {/* Column 5: Liens & Partenaires */}
                        <div className="space-y-2">
                            <div className="font-mono font-bold uppercase text-[#1D3027] dark:text-white text-xs">
                                Liens & Entraide
                            </div>
                            <ul className="space-y-1.5">
                                <li><Link href="/communaute" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Forum & Entraide</Link></li>
                                <li><Link href="/opportunites" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">Bourses & Stages</Link></li>
                                <li><Link href="/faq" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A]">FAQ & Aide</Link></li>
                                <li>
                                    <a href="https://unchk.sn" target="_blank" rel="noopener noreferrer" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A] flex items-center gap-1">
                                        <span>Portail UN-CHK</span>
                                        <ExternalLink className="w-3 h-3 text-[#7D897F]" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://force-n.sn" target="_blank" rel="noopener noreferrer" className="hover:text-[#1E5B45] dark:hover:text-[#62A87A] flex items-center gap-1">
                                        <span>FORCE-N Sénégal</span>
                                        <ExternalLink className="w-3 h-3 text-[#7D897F]" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Discrète Section Soutien & Entretien Serveur */}
                    <div className="my-8 p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] dark:bg-white/[0.03] border border-[#28372B]/10 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 text-center md:text-left">
                            <div className="w-10 h-10 rounded-xl bg-[#1E5B45]/10 dark:bg-[#52B788]/15 text-[#1E5B45] dark:text-[#52B788] flex items-center justify-center shrink-0 mx-auto md:mx-0">
                                <Heart className="w-5 h-5 fill-current opacity-80" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-[#1D3027] dark:text-white">
                                    Projet libre, gratuit et maintenu pour les étudiants de l'UN-CHK
                                </p>
                                <p className="text-[11px] text-[#59685F] dark:text-[#C2CEC6] mt-0.5 leading-relaxed max-w-2xl">
                                    L'accès à l'ensemble des cours et documents reste à 100% ouvert. Cependant, l'hébergement, la bande passante et la maintenance des serveurs engendrent des coûts récurrents. Un geste solidaire, même symbolique, nous aide grandement à préserver la pérennité du service.
                                </p>
                            </div>
                        </div>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1E5B45] to-[#2F6D52] hover:opacity-95 text-white text-xs font-semibold shadow-xs transition-all shrink-0"
                        >
                            <Coffee className="w-3.5 h-3.5 text-[#D5A45F]" />
                            <span>Soutenir l'Entretien</span>
                        </a>
                    </div>

                    <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#7D897F] dark:text-[#849187] font-mono">
                        <div>
                            © {new Date().getFullYear()} SDBSNX — Projet éducatif indépendant • sdbsnx.site
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link href="/mentions-legales" className="hover:underline">Mentions légales</Link>
                            <span>•</span>
                            <Link href="/politique-de-confidentialite" className="hover:underline">Confidentialité (CDP)</Link>
                            <span>•</span>
                            <Link href="/cookies" className="hover:underline">Cookies</Link>
                            <span>•</span>
                            <Link href="/conditions-generales-utilisation" className="hover:underline">CGU</Link>
                            <span>•</span>
                            <Link href="/contact" className="hover:underline">Contact</Link>
                            <span>•</span>
                            <button
                                onClick={() => setAdminModalOpen(true)}
                                className="text-[#1E5B45] dark:text-[#62A87A] hover:underline flex items-center gap-1"
                            >
                                <Lock className="w-3 h-3" /> Espace Admin
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* SEARCH MODAL (Ctrl+K) */}
            {searchModalOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1A241D] rounded-2xl max-w-lg w-full p-5 border border-[#28372B]/12 dark:border-white/10 shadow-2xl relative">
                        <button
                            onClick={() => setSearchModalOpen(false)}
                            className="absolute top-4 right-4 p-1 text-[#7D897F] hover:text-[#1D3027] dark:hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 mb-4 text-xs font-mono font-bold text-[#1E5B45] dark:text-[#62A87A]">
                            <Search className="w-4 h-4" />
                            <span>Recherche Rapide de Ressources</span>
                        </div>

                        <form onSubmit={handleSearchSubmit} className="space-y-4">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#7D897F]" />
                                <input
                                    type="text"
                                    placeholder="Rechercher cours, TD, langage (ex: Algorithmique, C, Python, PHP...)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-[#1D3027] dark:text-white placeholder-[#7D897F] focus:outline-none focus:ring-2 focus:ring-[#1E5B45]"
                                />
                            </div>

                            <div className="flex items-center justify-between text-xs text-[#59685F] dark:text-[#849187]">
                                <span>Appuyez sur <kbd className="font-mono bg-white dark:bg-white/10 px-1.5 py-0.5 rounded text-[#1D3027] dark:text-white border border-[#28372B]/10 dark:border-white/10">Entrée</kbd> pour valider</span>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white font-bold transition shadow-xs"
                                >
                                    Rechercher
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ADMIN LOGIN MODAL */}
            {adminModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1A241D] rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#28372B]/12 dark:border-white/10 shadow-2xl relative">
                        <button
                            onClick={() => setAdminModalOpen(false)}
                            className="absolute top-5 right-5 p-1 text-[#7D897F] hover:text-[#1D3027] dark:hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] border border-[#1E5B45]/20 flex items-center justify-center mx-auto mb-3">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-extrabold text-[#1D3027] dark:text-white font-heading">
                                Accès Administration
                            </h3>
                            <p className="text-xs text-[#59685F] dark:text-[#849187] mt-1">
                                Réservé aux administrateurs pour la gestion pédagogique et des ressources.
                            </p>
                        </div>

                        <form onSubmit={handleAdminLogin} className="space-y-4 text-xs font-sans">
                            <div>
                                <label className="block font-mono uppercase text-[#59685F] dark:text-[#849187] mb-1">
                                    Identifiant Admin
                                </label>
                                <input
                                    type="email"
                                    placeholder="admin@sdbsnx.sn"
                                    value={adminData.email}
                                    onChange={(e) => setAdminData('email', e.target.value)}
                                    required
                                    className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white placeholder-[#7D897F] focus:ring-1 focus:ring-[#1E5B45]"
                                />
                                {adminErrors.email && <p className="text-red-500 mt-1">{adminErrors.email}</p>}
                            </div>

                            <div>
                                <label className="block font-mono uppercase text-[#59685F] dark:text-[#849187] mb-1">
                                    Mot de passe
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={adminData.password}
                                    onChange={(e) => setAdminData('password', e.target.value)}
                                    required
                                    className="w-full bg-[#F7F5EF] dark:bg-[#101713] border border-[#28372B]/15 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[#1D3027] dark:text-white placeholder-[#7D897F] focus:ring-1 focus:ring-[#1E5B45]"
                                />
                                {adminErrors.password && <p className="text-red-500 mt-1">{adminErrors.password}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={adminProcessing}
                                className="w-full py-3 rounded-xl bg-[#1E5B45] hover:bg-[#246D53] text-white font-bold text-xs uppercase tracking-wider transition shadow-md disabled:opacity-50 font-mono"
                            >
                                {adminProcessing ? 'Connexion en cours...' : 'Se connecter au panneau Admin'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

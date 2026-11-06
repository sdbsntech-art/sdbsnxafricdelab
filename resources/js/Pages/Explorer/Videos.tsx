import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    Video,
    Play,
    X,
    Search,
    ExternalLink,
    Code2,
    Palette,
    Zap,
    Server,
    Terminal,
    Layers,
    Boxes,
    Filter,
} from 'lucide-react';

interface VideoItem {
    id: string;
    title: string;
    category: 'html' | 'css' | 'js' | 'php' | 'python' | 'vuejs' | 'angular';
    categoryLabel: string;
    part: number;
}

const ALL_VIDEOS: VideoItem[] = [
    // HTML Videos
    { id: 'oEAuNzWXRjM', title: 'HTML5 - Introduction complète et structure de base', category: 'html', categoryLabel: 'HTML', part: 1 },
    { id: 'XRoFTzGcCsw', title: 'HTML5 - Les balises de texte, paragraphes et titres', category: 'html', categoryLabel: 'HTML', part: 2 },
    { id: 'Kd4jtZq2x0I', title: 'HTML5 - Liens hypertextes et ancres de navigation', category: 'html', categoryLabel: 'HTML', part: 3 },
    { id: 'yr0xmQ9vezo', title: 'HTML5 - Images, médias et intégration multimédia', category: 'html', categoryLabel: 'HTML', part: 4 },
    { id: 'AH-LTjLCXXI', title: 'HTML5 - Listes ordonnées et non ordonnées', category: 'html', categoryLabel: 'HTML', part: 5 },
    { id: 'Iu8YpBnhWm4', title: 'HTML5 - Tableaux structurés et données tabulaires', category: 'html', categoryLabel: 'HTML', part: 6 },
    { id: 'LkZ-KqxgVQ4', title: 'HTML5 - Formulaires interactifs et champs de saisie', category: 'html', categoryLabel: 'HTML', part: 7 },
    { id: 'gJ_G-gxQRRk', title: 'HTML5 - Validation de formulaires et attributs requis', category: 'html', categoryLabel: 'HTML', part: 8 },
    { id: '7T9H-P45REg', title: 'HTML5 - Balises sémantiques header, nav, main, footer', category: 'html', categoryLabel: 'HTML', part: 9 },
    { id: 'g_u3U2BtK88', title: 'HTML5 - TP complet : Créer sa première page web', category: 'html', categoryLabel: 'HTML', part: 10 },

    // CSS Videos
    { id: 'PE8FQ6zihhw', title: 'CSS3 - Les bases fondamentales et sélecteurs', category: 'css', categoryLabel: 'CSS', part: 1 },
    { id: 'EM8UlPeBfuk', title: 'CSS3 - Couleurs, typographie et polices web', category: 'css', categoryLabel: 'CSS', part: 2 },
    { id: 'k1ID41O4FNM', title: 'CSS3 - Modèle de boîte (Box Model), marges et paddings', category: 'css', categoryLabel: 'CSS', part: 3 },
    { id: '-uuk57Tu9ds', title: 'CSS3 - Positionnement relatif, absolu et fixe', category: 'css', categoryLabel: 'CSS', part: 4 },
    { id: 'e-GTdjI6vC4', title: 'CSS3 - Flexbox : Maîtriser l\'alignement moderne', category: 'css', categoryLabel: 'CSS', part: 5 },
    { id: 'UA1bPCEEo8M', title: 'CSS3 - CSS Grid : Mises en page complexes en 2D', category: 'css', categoryLabel: 'CSS', part: 6 },
    { id: 'YGm1T7bVmJQ', title: 'CSS3 - Responsive design et Media Queries', category: 'css', categoryLabel: 'CSS', part: 7 },
    { id: 'hfykeYvwZXs', title: 'CSS3 - Transitions douces et pseudo-classes :hover', category: 'css', categoryLabel: 'CSS', part: 8 },
    { id: 'LNqBKTeeiWo', title: 'CSS3 - Animations @keyframes et dynamisme UI', category: 'css', categoryLabel: 'CSS', part: 9 },
    { id: 'OV0bOifr8AE', title: 'CSS3 - TP : Styliser un site moderne responsive', category: 'css', categoryLabel: 'CSS', part: 10 },

    // JavaScript Videos
    { id: 'asToYAq0F-I', title: 'JavaScript - Introduction et premier script', category: 'js', categoryLabel: 'JavaScript', part: 1 },
    { id: 'gUYfRJ-v_1Y', title: 'JavaScript - Variables let, const et types de données', category: 'js', categoryLabel: 'JavaScript', part: 2 },
    { id: 'GU8kxJ3P67I', title: 'JavaScript - Conditions if/else et switch case', category: 'js', categoryLabel: 'JavaScript', part: 3 },
    { id: 'zwLmRotDdu8', title: 'JavaScript - Boucles for, while et itérations', category: 'js', categoryLabel: 'JavaScript', part: 4 },
    { id: 'qYuvcK8QU4c', title: 'JavaScript - Fonctions classiques et fonctions fléchées', category: 'js', categoryLabel: 'JavaScript', part: 5 },
    { id: 'kLdQAsrcyvk', title: 'JavaScript - Tableaux (Arrays) et méthodes map, filter', category: 'js', categoryLabel: 'JavaScript', part: 6 },
    { id: 'EvHAiskwHvE', title: 'JavaScript - Manipulation du DOM et sélection d\'éléments', category: 'js', categoryLabel: 'JavaScript', part: 7 },
    { id: 'wVuJTS8aQyA', title: 'JavaScript - Gestion des événements clics et inputs', category: 'js', categoryLabel: 'JavaScript', part: 8 },
    { id: '2HAPViIAYjc', title: 'JavaScript - Asynchrone : Promises et Fetch API', category: 'js', categoryLabel: 'JavaScript', part: 9 },
    { id: '6tC4tv9MlkI', title: 'JavaScript - TP interactif : Todo list & météo', category: 'js', categoryLabel: 'JavaScript', part: 10 },

    // PHP Videos
    { id: 'QYDHjY18CQg', title: 'PHP - Présentation complète et installation serveur', category: 'php', categoryLabel: 'PHP', part: 1 },
    { id: 'qZ2U-tHyieU', title: 'PHP - Les variables, chaînes et concaténation', category: 'php', categoryLabel: 'PHP', part: 2 },
    { id: 'kO765hqvlYA', title: 'PHP - Les conditions logiques et opérateurs', category: 'php', categoryLabel: 'PHP', part: 3 },
    { id: 'EI475KTOTsg', title: 'PHP - Tableaux associatifs et multidimensionnels', category: 'php', categoryLabel: 'PHP', part: 4 },
    { id: 'l9DP1roPHxw', title: 'PHP - Les boucles foreach et affichage dynamique', category: 'php', categoryLabel: 'PHP', part: 5 },
    { id: 'KN7COUTTUYs', title: 'PHP - Les fonctions personnalisées et réutilisables', category: 'php', categoryLabel: 'PHP', part: 6 },

    // Python Videos
    { id: 'oUJolR5bX6g', title: 'Python - Introduction au langage et variables', category: 'python', categoryLabel: 'Python', part: 1 },
    { id: 'ZcjAw3uEZYw', title: 'Python - Structures conditionnelles et comparaisons', category: 'python', categoryLabel: 'Python', part: 2 },
    { id: '1NUkHC-Fzx4', title: 'Python - Boucles for, while et listes', category: 'python', categoryLabel: 'Python', part: 3 },
    { id: '5vX6oiVLza4', title: 'Python - Fonctions et modularité de code', category: 'python', categoryLabel: 'Python', part: 4 },
    { id: 'Y-wXK0Wu5pc', title: 'Python - Dictionnaires et tuples', category: 'python', categoryLabel: 'Python', part: 5 },
    { id: 'ztEx9p1u9SY', title: 'Python - Programmation Orientée Objet (Classes)', category: 'python', categoryLabel: 'Python', part: 6 },

    // Vue.js Videos
    { id: 'DpVdkIz_fQo', title: 'Vue.js - Découverte du framework et instance', category: 'vuejs', categoryLabel: 'Vue.js', part: 1 },
    { id: 'IHMLPQcHma8', title: 'Vue.js - Liaisons de données réactives (v-bind, v-model)', category: 'vuejs', categoryLabel: 'Vue.js', part: 2 },
    { id: 'uwmh8hc0qDQ', title: 'Vue.js - Directives conditionnelles v-if et v-for', category: 'vuejs', categoryLabel: 'Vue.js', part: 3 },
    { id: 'JUSjju1Y1Ds', title: 'Vue.js - Événements v-on et méthodes réactives', category: 'vuejs', categoryLabel: 'Vue.js', part: 4 },
    { id: 'mDnahxy80KY', title: 'Vue.js - Propriétés calculées (Computed properties)', category: 'vuejs', categoryLabel: 'Vue.js', part: 5 },
    { id: 'IPkvHlI2L4A', title: 'Vue.js - Composants réutilisables et Props', category: 'vuejs', categoryLabel: 'Vue.js', part: 6 },
    { id: 'MnDe0DufM9k', title: 'Vue.js - Communication entre composants et Events', category: 'vuejs', categoryLabel: 'Vue.js', part: 7 },
    { id: 'uMisPCh3Yh0', title: 'Vue.js - Vue Router : Créer une SPA multi-pages', category: 'vuejs', categoryLabel: 'Vue.js', part: 8 },
    { id: 'xNFSu1hsZqI', title: 'Vue.js - Pinia / Gestion d\'état global', category: 'vuejs', categoryLabel: 'Vue.js', part: 9 },
    { id: 'pdO0RT8Li5w', title: 'Vue.js - TP Complet : Application Full Web', category: 'vuejs', categoryLabel: 'Vue.js', part: 10 },

    // Angular Videos
    { id: 'aBE0St5yI7U', title: 'Angular - Introduction et installation du CLI', category: 'angular', categoryLabel: 'Angular', part: 1 },
    { id: 'fOuKMuaGJ54', title: 'Angular - Architecture par composants TypeScript', category: 'angular', categoryLabel: 'Angular', part: 2 },
    { id: 'uJkuw0baJlw', title: 'Angular - Data Binding : Interpolation et Property Binding', category: 'angular', categoryLabel: 'Angular', part: 3 },
    { id: 'dM166xJUZ6Y', title: 'Angular - Directives structurelles *ngIf et *ngFor', category: 'angular', categoryLabel: 'Angular', part: 4 },
    { id: 'kFl1wrSZ4sQ', title: 'Angular - Directives d\'attributs et NgClass / NgStyle', category: 'angular', categoryLabel: 'Angular', part: 5 },
    { id: 'FRaVbFHRc7w', title: 'Angular - Services et injection de dépendances', category: 'angular', categoryLabel: 'Angular', part: 6 },
    { id: 'kMFnhKru2o0', title: 'Angular - HttpClient et consommation d\'API REST', category: 'angular', categoryLabel: 'Angular', part: 7 },
    { id: '-1lLCIGTfJc', title: 'Angular - Formulaires réactifs et validation poussée', category: 'angular', categoryLabel: 'Angular', part: 8 },
    { id: 'cEJ7NVXCYsU', title: 'Angular - Routing et navigation avancée', category: 'angular', categoryLabel: 'Angular', part: 9 },
    { id: 'G_lcwCu_9IE', title: 'Angular - Projet Final et déploiement de l\'application', category: 'angular', categoryLabel: 'Angular', part: 10 },
];

const CATEGORIES = [
    { key: 'all', label: 'Toutes les vidéos', icon: Video, color: 'text-unchk-blue-600 dark:text-sky-400' },
    { key: 'html', label: 'HTML', icon: Code2, color: 'text-orange-500' },
    { key: 'css', label: 'CSS', icon: Palette, color: 'text-blue-500' },
    { key: 'js', label: 'JavaScript', icon: Zap, color: 'text-amber-500' },
    { key: 'php', label: 'PHP', icon: Server, color: 'text-purple-500' },
    { key: 'python', label: 'Python', icon: Terminal, color: 'text-emerald-500' },
    { key: 'vuejs', label: 'Vue.js', icon: Layers, color: 'text-teal-500' },
    { key: 'angular', label: 'Angular', icon: Boxes, color: 'text-rose-500' },
];

export default function Videos() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

    const filteredVideos = ALL_VIDEOS.filter((v) => {
        const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
        const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <AppLayout>
            <Head title="Vidéos et tutoriels de cours | IDA-COURS (SDBSNX)" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                {/* Header Banner */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-unchk-blue-500/10 text-unchk-blue-600 dark:text-sky-300 border border-unchk-blue-500/20 text-xs font-mono font-bold">
                        <Video className="w-3.5 h-3.5" />
                        <span>VIDÉOTHÈQUE OFFICIELLE IDA-COURS</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                        Vidéos de Cours par Matière
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        Découvrez notre collection complète de {ALL_VIDEOS.length} tutoriels vidéo d'apprentissage web et programmation issus de la plateforme originale <strong>IDA-COURS</strong>.
                    </p>
                </div>

                {/* Featured Video (L'importance d'étudier à l'UN-CHK) */}
                <div className="bg-gradient-to-r from-unchk-blue-900 via-slate-900 to-[#0B132B] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 space-y-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-unchk-orange-500 text-white font-mono">
                                VIDÉO VEDETTE INSTITUTIONNELLE
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                                L'importance d'étudier à l'UN-CHK (ex UVS)
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                Découvrez la vision moderne de l'Université Numérique Cheikh Hamidou Kane, les opportunités du numérique au Sénégal et comment bâtir une carrière d'excellence en informatique et développement d'applications.
                            </p>
                            <button
                                onClick={() => setActiveVideo({
                                    id: 'S2saQVUIBe8',
                                    title: 'L\'importance d\'étudier à l\'UN-CHK (ex UVS)',
                                    category: 'html',
                                    categoryLabel: 'UN-CHK',
                                    part: 1,
                                })}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-unchk-orange-500 hover:bg-unchk-orange-600 text-white font-bold text-xs shadow-lg transition"
                            >
                                <Play className="w-4 h-4 fill-white" />
                                <span>Visionner le reportage vidéo</span>
                            </button>
                        </div>

                        <div className="lg:col-span-5 flex justify-center">
                            <div
                                onClick={() => setActiveVideo({
                                    id: 'S2saQVUIBe8',
                                    title: 'L\'importance d\'étudier à l\'UN-CHK (ex UVS)',
                                    category: 'html',
                                    categoryLabel: 'UN-CHK',
                                    part: 1,
                                })}
                                className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border border-white/20 aspect-video w-full max-w-md"
                            >
                                <img
                                    src="https://img.youtube.com/vi/S2saQVUIBe8/hqdefault.jpg"
                                    alt="L'importance d'étudier à l'UN-CHK"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                    <div className="w-14 h-14 rounded-full bg-unchk-orange-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 fill-white ml-0.5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters & Search Bar */}
                <div className="space-y-4">
                    {/* Search */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Filtrer parmi les vidéos (titre, langage, sujet)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white dark:bg-[#111C38] border border-slate-200 dark:border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-unchk-blue-500 shadow-xs"
                        />
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center justify-center flex-wrap gap-2">
                        {CATEGORIES.map((cat) => {
                            const IconComponent = cat.icon;
                            const isActive = selectedCategory === cat.key;
                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => setSelectedCategory(cat.key)}
                                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                        isActive
                                            ? 'bg-unchk-blue-600 text-white shadow-md'
                                            : 'bg-white dark:bg-[#111C38] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-unchk-blue-400'
                                    }`}
                                >
                                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : cat.color}`} />
                                    <span>{cat.label}</span>
                                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-500'
                                    }`}>
                                        {cat.key === 'all'
                                            ? ALL_VIDEOS.length
                                            : ALL_VIDEOS.filter((v) => v.category === cat.key).length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Video Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredVideos.map((vid, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveVideo(vid)}
                            className="bg-white dark:bg-[#111C38] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between hover:-translate-y-1"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden bg-slate-900">
                                <img
                                    src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                                    alt={vid.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <div className="w-11 h-11 rounded-full bg-unchk-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-unchk-orange-500 transition-all">
                                        <Play className="w-4 h-4 fill-white ml-0.5" />
                                    </div>
                                </div>
                                <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/80 text-white">
                                    Partie {vid.part}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-unchk-blue-500/10 text-unchk-blue-600 dark:text-sky-300 border border-unchk-blue-500/20 uppercase font-mono">
                                            {vid.categoryLabel}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-mono">
                                            YouTube
                                        </span>
                                    </div>

                                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-unchk-blue-600 dark:group-hover:text-sky-300 transition-colors leading-snug">
                                        {vid.title}
                                    </h3>
                                </div>

                                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                    <span className="flex items-center gap-1 group-hover:text-unchk-blue-600 transition-colors">
                                        <Play className="w-3 h-3" /> Regarder
                                    </span>
                                    <span className="text-slate-400 text-[10px]">Gratuit</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredVideos.length === 0 && (
                    <div className="text-center py-16 bg-white dark:bg-[#111C38] rounded-3xl border border-slate-200 dark:border-white/10 p-8">
                        <Video className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <h3 className="text-base font-bold text-slate-800 dark:text-white">Aucune vidéo trouvée</h3>
                        <p className="text-xs text-slate-500 mt-1">Essayez un autre mot-clé ou réinitialisez les filtres.</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('all');
                                setSearchQuery('');
                            }}
                            className="mt-4 px-4 py-2 rounded-xl bg-unchk-blue-600 text-white font-bold text-xs"
                        >
                            Réinitialiser
                        </button>
                    </div>
                )}
            </div>

            {/* VIDEO PLAYER MODAL */}
            {activeVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    onClick={() => setActiveVideo(null)}
                >
                    <div
                        className="bg-slate-900 rounded-3xl max-w-4xl w-full border border-white/10 shadow-2xl overflow-hidden relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header bar */}
                        <div className="p-4 px-6 flex items-center justify-between border-b border-white/10 bg-slate-950/80">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-unchk-blue-500/20 text-sky-400 font-mono">
                                    {activeVideo.categoryLabel}
                                </span>
                                <h3 className="text-sm font-bold text-white line-clamp-1">
                                    {activeVideo.title}
                                </h3>
                            </div>
                            <button
                                onClick={() => setActiveVideo(null)}
                                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
                                title="Fermer la vidéo"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Responsive iframe */}
                        <div className="relative aspect-video w-full bg-black">
                            <iframe
                                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                                title={activeVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full border-none"
                            />
                        </div>

                        {/* Footer details */}
                        <div className="p-4 px-6 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
                            <span>Plateforme d'apprentissage IDA-COURS & SDBSNX</span>
                            <a
                                href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                            >
                                Ouvrir sur YouTube <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

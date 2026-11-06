import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ResourceCard from '@/Components/ResourceCard';
import { Resource } from '@/types';
import {
    Download,
    Eye,
    Bookmark,
    CheckCircle,
    ChevronRight,
    FileText,
    ExternalLink,
    Share2,
    Calendar,
    User,
    Sparkles,
    ArrowLeft,
} from 'lucide-react';

interface ShowProps {
    resource: Resource;
    relatedResources: Resource[];
}

export default function Show({ resource, relatedResources }: ShowProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [copied, setCopied] = useState(false);

    const level = resource.academic_level;
    const semester = resource.semester;
    const module = resource.module;

    const isPdf = resource.file_type === 'pdf';
    const isHtml = resource.file_type === 'html';

    useEffect(() => {
        try {
            const savedBookmarks = JSON.parse(localStorage.getItem('sdbsnx_bookmarks') || '[]');
            setIsBookmarked(savedBookmarks.includes(resource.id));

            const savedCompleted = JSON.parse(localStorage.getItem('sdbsnx_completed') || '[]');
            setIsCompleted(savedCompleted.includes(resource.id));
        } catch (e) {
            // ignore
        }
    }, [resource.id]);

    const handleToggleBookmark = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('sdbsnx_bookmarks') || '[]');
            let next;
            if (saved.includes(resource.id)) {
                next = saved.filter((id: number) => id !== resource.id);
                setIsBookmarked(false);
            } else {
                next = [...saved, resource.id];
                setIsBookmarked(true);
            }
            localStorage.setItem('sdbsnx_bookmarks', JSON.stringify(next));
        } catch (e) {
            // ignore
        }
    };

    const handleToggleComplete = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('sdbsnx_completed') || '[]');
            let next;
            if (saved.includes(resource.id)) {
                next = saved.filter((id: number) => id !== resource.id);
                setIsCompleted(false);
            } else {
                next = [...saved, resource.id];
                setIsCompleted(true);
            }
            localStorage.setItem('sdbsnx_completed', JSON.stringify(next));
        } catch (e) {
            // ignore
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AppLayout>
            <Head title={`${resource.title} | SDBSNX UN-CHK`} />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* Top Return Button */}
                <div>
                    <button
                        type="button"
                        onClick={() => {
                            if (window.history.length > 1) {
                                window.history.back();
                            } else if (module) {
                                window.location.href = `/cours/module/${module.slug}`;
                            } else {
                                window.location.href = '/cours';
                            }
                        }}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white dark:bg-[#1A241D] hover:bg-[#1E5B45] text-[#1E5B45] dark:text-[#62A87A] hover:text-white dark:hover:text-white text-xs font-bold font-mono transition-all border border-[#1E5B45]/25 shadow-xs cursor-pointer group max-w-full"
                    >
                        <ArrowLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
                        <span className="truncate">← Retour {module ? `au module ${module.name}` : 'à la liste des cours'}</span>
                    </button>
                </div>

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 flex-wrap">
                    <Link href="/" className="hover:text-unchk-blue">Accueil</Link>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <Link href="/cours" className="hover:text-unchk-blue">Cours</Link>
                    {level && (
                        <>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            <Link href={`/cours/${level.slug}`} className="hover:text-unchk-blue">
                                {level.short_name}
                            </Link>
                        </>
                    )}
                    {semester && (
                        <>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            <Link href={`/cours/semestre/${semester.slug}`} className="hover:text-unchk-blue">
                                {semester.name}
                            </Link>
                        </>
                    )}
                    {module && (
                        <>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            <Link href={`/cours/module/${module.slug}`} className="hover:text-unchk-blue">
                                {module.name}
                            </Link>
                        </>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-unchk-blue font-semibold truncate max-w-xs">{resource.title}</span>
                </div>

                {/* Resource Header Card */}
                <div className="sdbsnx-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-mono uppercase font-bold px-2.5 py-0.5 rounded bg-unchk-blue/10 text-unchk-blue border border-unchk-blue/30">
                                    {resource.type}
                                </span>
                                {resource.file_type && (
                                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-unchk-green font-semibold">
                                        .{resource.file_type}
                                    </span>
                                )}
                                {resource.file_size_formatted && (
                                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                        {resource.file_size_formatted}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                                {resource.title}
                            </h1>

                            {resource.description && (
                                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                                    {resource.description}
                                </p>
                            )}

                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono pt-2">
                                <span className="flex items-center gap-1">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>{resource.views_count} consultations</span>
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Download className="w-3.5 h-3.5" />
                                    <span>{resource.downloads_count} téléchargements</span>
                                </span>
                            </div>
                        </div>

                        {/* Direct action buttons */}
                        <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
                            <a
                                href={`/cours/telecharger/${resource.id}`}
                                className="px-5 py-3 rounded-xl bg-unchk-blue hover:bg-unchk-blue/90 text-white text-xs font-bold font-mono flex items-center justify-center gap-2 shadow-lg shadow-unchk-blue/20 transition active:scale-95"
                            >
                                <Download className="w-4 h-4" />
                                <span>Télécharger le Fichier</span>
                            </a>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleToggleBookmark}
                                    className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                                        isBookmarked
                                            ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                                    <span>{isBookmarked ? 'Favori' : 'Enregistrer'}</span>
                                </button>

                                <button
                                    onClick={handleToggleComplete}
                                    className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                                        isCompleted
                                            ? 'bg-unchk-green/20 text-unchk-green border-unchk-green/40'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'fill-unchk-green text-white' : ''}`} />
                                    <span>{isCompleted ? 'Validé' : 'Terminer'}</span>
                                </button>
                            </div>

                            <button
                                onClick={handleShare}
                                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                            >
                                <Share2 className="w-3.5 h-3.5" />
                                <span>{copied ? 'Lien copié !' : 'Partager'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Inline Document Previewer */}
                <div className="sdbsnx-card rounded-3xl p-4 border border-slate-200 dark:border-white/10">
                    <div className="flex items-center justify-between pb-3 px-2 border-b border-[#28372B]/10 dark:border-white/10 text-xs text-[#59685F] dark:text-[#849187] font-mono flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    if (window.history.length > 1) {
                                        window.history.back();
                                    } else if (module) {
                                        window.location.href = `/cours/module/${module.slug}`;
                                    } else {
                                        window.location.href = '/cours';
                                    }
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E5B45]/10 hover:bg-[#1E5B45] text-[#1E5B45] dark:text-[#62A87A] hover:text-white transition font-bold cursor-pointer"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>Retour</span>
                            </button>
                            <span className="flex items-center gap-1.5">
                                <FileText className="w-4 h-4 text-[#1E5B45] dark:text-[#62A87A]" />
                                <span>Visualiseur en ligne (Lecture sans téléchargement)</span>
                            </span>
                        </div>
                        <a
                            href={`/cours/apercu/${resource.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1E5B45] dark:text-[#62A87A] hover:underline flex items-center gap-1 font-semibold"
                        >
                            <span>Ouvrir en plein écran</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>

                    <div className="mt-3 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 min-h-[620px] border border-slate-200 dark:border-slate-800">
                        {isPdf || isHtml ? (
                            <iframe
                                src={`/cours/apercu/${resource.id}`}
                                className="w-full h-[650px] border-none"
                                title={resource.title}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[500px] text-center p-8 space-y-4">
                                <FileText className="w-16 h-16 text-slate-400" />
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Document source ({resource.file_type})</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                                        Consultez directement ce support dans votre éditeur ou logiciel adapté.
                                    </p>
                                </div>
                                <a
                                    href={`/cours/telecharger/${resource.id}`}
                                    className="px-5 py-2.5 rounded-xl bg-unchk-blue text-white text-xs font-bold inline-flex items-center gap-2 shadow"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Télécharger maintenant</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Resources */}
                {relatedResources.length > 0 && (
                    <div className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-5">
                        <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                            Autres documents de ce module
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {relatedResources.map((res) => (
                                <ResourceCard key={res.id} resource={res} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

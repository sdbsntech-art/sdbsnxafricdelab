import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Resource } from '@/types';
import {
    Download,
    Eye,
    Bookmark,
} from 'lucide-react';

interface ResourceCardProps {
    resource: Resource;
    isBookmarked?: boolean;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('sdbsnx_bookmarks') || '[]');
            setBookmarked(saved.includes(resource.id));
        } catch (e) {
            // ignore
        }
    }, [resource.id]);

    const handleToggleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const saved = JSON.parse(localStorage.getItem('sdbsnx_bookmarks') || '[]');
            let next;
            if (saved.includes(resource.id)) {
                next = saved.filter((id: number) => id !== resource.id);
                setBookmarked(false);
            } else {
                next = [...saved, resource.id];
                setBookmarked(true);
            }
            localStorage.setItem('sdbsnx_bookmarks', JSON.stringify(next));
        } catch (e) {
            // ignore
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'course':
                return {
                    label: 'Cours (PDF)',
                    cls: 'bg-[#1E5B45]/10 text-[#1E5B45] border-[#1E5B45]/30 dark:bg-[#62A87A]/15 dark:text-[#62A87A] dark:border-[#62A87A]/30',
                };
            case 'td':
                return {
                    label: 'TD / Travaux Dirigés',
                    cls: 'bg-[#A8743F]/10 text-[#A8743F] border-[#A8743F]/30 dark:bg-[#D5A45F]/15 dark:text-[#D5A45F] dark:border-[#D5A45F]/30',
                };
            case 'exercise':
                return {
                    label: 'Exercice / TP',
                    cls: 'bg-[#377657]/10 text-[#377657] border-[#377657]/30 dark:bg-[#62A87A]/15 dark:text-[#62A87A] dark:border-[#62A87A]/30',
                };
            case 'project':
                return {
                    label: 'Projet',
                    cls: 'bg-[#A8743F]/10 text-[#A8743F] border-[#A8743F]/30 dark:bg-[#D5A45F]/15 dark:text-[#D5A45F] dark:border-[#D5A45F]/30',
                };
            case 'exam':
                return {
                    label: 'Examen / Évaluation',
                    cls: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800/50',
                };
            default:
                return {
                    label: 'Document',
                    cls: 'bg-[#28372B]/05 text-[#1D3027] border-[#28372B]/15 dark:bg-white/10 dark:text-white dark:border-white/10',
                };
        }
    };

    const badge = getTypeBadge(resource.type);

    return (
        <div className="sdbsnx-card rounded-2xl p-5 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-[#1A241D]">
            {/* Top decorative stripe with SDBSNX brand gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E5B45] via-[#377657] to-[#A8743F] opacity-80 group-hover:opacity-100 transition-opacity" />

            <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {resource.academic_level && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F7F5EF] dark:bg-white/10 text-[#1D3027] dark:text-white border border-[#28372B]/10 dark:border-white/10">
                                {resource.academic_level.short_name}
                            </span>
                        )}
                        {resource.semester && (
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-[#F7F5EF] dark:bg-white/5 text-[#59685F] dark:text-[#849187]">
                                S{resource.semester.semester_number}
                            </span>
                        )}
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border font-mono ${badge.cls}`}>
                            {badge.label}
                        </span>
                    </div>

                    <button
                        onClick={handleToggleBookmark}
                        title={bookmarked ? "Retirer des favoris" : "Ajouter aux favoris (sans compte)"}
                        className={`p-1.5 rounded-lg border transition ${
                            bookmarked
                                ? 'bg-[#A8743F]/20 text-[#A8743F] border-[#A8743F]/50'
                                : 'bg-[#F7F5EF] dark:bg-white/05 text-[#7D897F] dark:text-[#849187] border-[#28372B]/10 dark:border-white/10 hover:text-[#1D3027] dark:hover:text-white'
                        }`}
                    >
                        <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#A8743F]' : ''}`} />
                    </button>
                </div>

                {/* Module title if available */}
                {resource.module && (
                    <div className="text-[11px] font-mono font-semibold text-[#1E5B45] dark:text-[#62A87A] mb-1.5 line-clamp-1">
                        {resource.module.name}
                    </div>
                )}

                {/* Resource Title */}
                <Link href={`/cours/ressource/${resource.slug}`} className="block">
                    <h3 className="text-sm font-bold font-heading text-[#1D3027] dark:text-white group-hover:text-[#1E5B45] dark:group-hover:text-[#62A87A] transition-colors line-clamp-2 leading-snug">
                        {resource.title}
                    </h3>
                </Link>

                {/* Description snippet */}
                {resource.description && (
                    <p className="text-xs text-[#59685F] dark:text-[#849187] line-clamp-2 mt-2 leading-relaxed">
                        {resource.description}
                    </p>
                )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3.5 border-t border-[#28372B]/10 dark:border-white/5 flex items-center justify-between gap-2 text-xs text-[#59685F] dark:text-[#849187] font-mono">
                <div className="flex items-center gap-2.5 text-[11px]">
                    <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-[#7D897F]" />
                        <span>{resource.views_count}</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <Download className="w-3 h-3 text-[#7D897F]" />
                        <span>{resource.downloads_count}</span>
                    </span>
                    {resource.file_size_formatted && (
                        <span className="text-[#7D897F] text-[10px]">
                            {resource.file_size_formatted}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1">
                    <a
                        href={`/cours/telecharger/${resource.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E5B45]/10 hover:bg-[#1E5B45] text-[#1E5B45] hover:text-white dark:bg-[#62A87A]/20 dark:hover:bg-[#1E5B45] dark:text-[#62A87A] dark:hover:text-white border border-[#1E5B45]/20 dark:border-[#62A87A]/30 text-[11px] font-semibold transition shadow-2xs"
                        title="Télécharger gratuitement"
                    >
                        <Download className="w-3 h-3" />
                        <span>Télécharger</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

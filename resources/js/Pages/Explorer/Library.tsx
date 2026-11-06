import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ResourceCard from '@/Components/ResourceCard';
import { PaginationMeta, Resource } from '@/types';
import {
    FolderKanban,
    Search,
    BookOpen,
    Download,
    FileText,
} from 'lucide-react';

interface LibraryProps {
    resources: PaginationMeta<Resource>;
    search?: string;
}

export default function Library({ resources, search = '' }: LibraryProps) {
    const [searchQuery, setSearchQuery] = useState(search);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/bibliotheque', { search: searchQuery || undefined });
    };

    return (
        <AppLayout>
            <Head title="Bibliothèque numérique : cours PDF d’informatique | SDBSNX UN-CHK" />

            <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-unchk-blue/10 text-unchk-blue border border-unchk-blue/20 text-xs font-mono font-bold mb-3">
                        <FolderKanban className="w-3.5 h-3.5" />
                        <span>RESSOURCES & SUPPORTS NUMÉRIQUES UN-CHK</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
                        Bibliothèque Numérique PDF
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
                        Consultez et téléchargez des supports PDF, polycopiés de cours officiels et fiches de révision en accès libre, gratuit et immédiat.
                    </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-xl relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Filtrer les documents de la bibliothèque..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-[#111C38] border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-unchk-blue transition"
                    />
                </form>

                {/* Resources Grid */}
                {resources.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {resources.data.map((res) => (
                            <ResourceCard key={res.id} resource={res} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#1E5B45]/10 dark:bg-[#1E5B45]/15 flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-[#1E5B45] dark:text-[#62A87A]" />
                        </div>
                        <h3 className="text-lg font-bold font-heading text-[#1D3027] dark:text-white mb-2">
                            Bibliothèque numérique en cours d'alimentation
                        </h3>
                        <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#849187] max-w-lg mx-auto leading-relaxed">
                            Les manuels de référence, e-books libres, synthèses méthodologiques et ouvrages spécialisés (indépendants des cours réguliers des licences L1, L2, L3) seront ajoutés prochainement via le panneau d'administration.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {resources.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1 text-xs font-mono pt-6">
                        {resources.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1.5 rounded-lg transition ${
                                    link.active
                                        ? 'bg-unchk-blue text-white font-bold'
                                        : link.url
                                        ? 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20'
                                        : 'bg-transparent text-slate-400 cursor-not-allowed'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

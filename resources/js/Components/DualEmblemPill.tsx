import React from 'react';

export default function DualEmblemPill() {
    return (
        <div className="dual-emblem-pill inline-flex items-center gap-1.5 sm:gap-3 p-1 sm:p-1.5 px-2.5 sm:px-4 rounded-full bg-white/95 dark:bg-[#1A241D]/90 border border-[#28372B]/12 dark:border-white/10 shadow-md backdrop-blur-md transition-all hover:border-[#1E5B45]/40 dark:hover:border-[#62A87A]/40 max-w-full overflow-hidden">
            {/* SDBSNX Emblem */}
            <div className="flex items-center gap-1 shrink-0">
                <img
                    src="/sdbsnx-logo.png"
                    alt="SDBSNX - CODE • TECH • IMPACT"
                    className="h-7 sm:h-9 w-auto object-contain rounded-lg bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-xs border border-slate-100"
                />
            </div>

            {/* Separator */}
            <span className="w-px h-4 sm:h-5 bg-[#28372B]/15 dark:bg-white/15 shrink-0" />

            {/* FORCE-N Emblem (includes UNCHK branding) */}
            <div className="flex items-center gap-1 shrink-0">
                <img
                    src="/force-n-logo.png"
                    alt="FORCE-N • Université Numérique Cheikh Hamidou Kane"
                    className="h-7 sm:h-9 w-auto object-contain rounded-lg bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-xs border border-slate-100"
                />
            </div>
        </div>
    );
}

import React from 'react';
import { Link } from '@inertiajs/react';

interface SdbsnxBrandProps {
    className?: string;
    showSubtitle?: boolean;
}

export default function SdbsnxBrand({ className = '', showSubtitle = true }: SdbsnxBrandProps) {
    return (
        <Link
            href="/"
            className={`site-brand inline-flex items-center gap-2 sm:gap-2.5 text-left select-none group min-w-0 shrink ${className}`}
            aria-label="SDBSNX IDA — Accueil"
        >
            <img
                src="/sdbsnx-logo.png"
                alt="SDBSNX"
                className="w-[34px] h-[34px] sm:w-[40px] sm:h-[40px] object-contain rounded-[8px] sm:rounded-[10px] bg-white p-[2px_4px] sm:p-[3px_6px] shadow-xs border border-emerald-950/10 dark:border-white/10 group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="site-brand-copy flex flex-col gap-0.5 min-w-0">
                <span className="site-brand-name font-heading font-extrabold text-[13px] sm:text-[15px] tracking-tight leading-none text-[#1D3027] dark:text-white truncate">
                    SDBSNX <span className="text-[#1E5B45] dark:text-[#62A87A]">•</span> IDA
                </span>
                {showSubtitle && (
                    <span className="site-brand-subtitle font-sans text-[8px] sm:text-[9px] font-bold tracking-[0.5px] sm:tracking-[0.8px] text-[#7D897F] dark:text-[#849187] uppercase truncate hidden sm:block">
                        FORCE-N • UNCHK
                    </span>
                )}
            </div>
        </Link>
    );
}

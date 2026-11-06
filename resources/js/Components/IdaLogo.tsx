import React from 'react';

interface LogoProps {
    className?: string;
    showText?: boolean;
    subtitle?: string;
}

export default function IdaLogo({ className = 'w-10 h-10', showText = true, subtitle = 'SDBSNX • FORCE-N • UNCHK' }: LogoProps) {
    return (
        <div className="flex items-center gap-3 select-none">
            <img
                src="/sdbsnx-logo.png"
                alt="SDBSNX"
                className={`object-contain rounded-xl bg-white p-1.5 shadow-sm border border-emerald-950/10 ${className}`}
            />

            {showText && (
                <div className="flex flex-col">
                    <span className="text-lg font-extrabold tracking-tight text-[#1D3027] dark:text-white flex items-center gap-1.5 font-heading">
                        SDBSNX <span className="text-[#1E5B45] dark:text-[#62A87A] font-black">•</span> IDA
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#7D897F] dark:text-[#849187] font-semibold uppercase -mt-0.5">
                        {subtitle}
                    </span>
                </div>
            )}
        </div>
    );
}

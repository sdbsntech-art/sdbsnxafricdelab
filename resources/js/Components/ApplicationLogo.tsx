import React, { ImgHTMLAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/sdbsnx-logo.png"
            alt="SDBSNX"
            {...props}
            className={`object-contain rounded-xl bg-white p-1.5 shadow-sm border border-emerald-900/10 ${props.className || 'w-10 h-10'}`}
        />
    );
}

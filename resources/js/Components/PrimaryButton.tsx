import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl border border-transparent bg-[#1E5B45] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition duration-150 ease-in-out hover:bg-[#246D53] focus:bg-[#246D53] focus:outline-none focus:ring-2 focus:ring-[#1E5B45] focus:ring-offset-2 active:bg-[#184837] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

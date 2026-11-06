import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F7F5EF] pt-8 sm:justify-center sm:pt-0 dark:bg-[#101713]">
            <div className="text-center">
                <Link href="/" className="inline-flex flex-col items-center gap-2">
                    <ApplicationLogo className="h-16 w-16" />
                    <span className="font-heading font-extrabold text-xl text-[#1D3027] dark:text-white">
                        SDBSNX <span className="text-[#1E5B45] dark:text-[#62A87A]">•</span> IDA
                    </span>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-6 shadow-xl border border-[#28372B]/12 sm:max-w-md sm:rounded-2xl dark:bg-[#1A241D] dark:border-white/10">
                {children}
            </div>
        </div>
    );
}

import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    BookOpen,
    FolderTree,
    ShieldCheck,
    Rocket,
    Library,
    Briefcase,
    MessageSquare,
    Users,
    Bell,
} from 'lucide-react';

export default function AdminNav() {
    const { url } = usePage();

    const tabs = [
        { href: '/admin', label: 'Vue d\'ensemble', icon: LayoutDashboard, exact: true },
        { href: '/admin/alertes', label: 'Alertes & Annonces', icon: Bell },
        { href: '/admin/ressources', label: 'Ressources L1-L3', icon: BookOpen },
        { href: '/admin/modules', label: 'Modules & Matières', icon: FolderTree },
        { href: '/admin/cybersecurite', label: 'Cybersécurité', icon: ShieldCheck },
        { href: '/admin/entrepreneuriat', label: 'Entrepreneuriat', icon: Rocket },
        { href: '/admin/bibliotheque', label: 'Bibliothèque', icon: Library },
        { href: '/admin/opportunites', label: 'Opportunités & Stages', icon: Briefcase },
        { href: '/admin/messages', label: 'Messages & Contact', icon: MessageSquare },
        { href: '/admin/utilisateurs', label: 'Utilisateurs & Profil', icon: Users },
    ];

    const isActive = (tab: { href: string; exact?: boolean }) => {
        if (tab.exact) {
            return url === tab.href;
        }
        return url.startsWith(tab.href);
    };

    return (
        <div className="bg-white dark:bg-[#1A241D] rounded-2xl p-1.5 border border-[#28372B]/12 dark:border-white/10 shadow-xs mb-8 overflow-x-auto">
            <nav className="flex items-center gap-1 min-w-max">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = isActive(tab);
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                                active
                                    ? 'bg-[#1E5B45] text-white shadow-xs'
                                    : 'text-[#59685F] dark:text-[#C2CEC6] hover:bg-[#F7F5EF] dark:hover:bg-white/5 hover:text-[#1D3027] dark:hover:text-white'
                            }`}
                        >
                            <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-[#7D897F] dark:text-[#849187]'}`} />
                            <span>{tab.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}


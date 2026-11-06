import React, { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import { PaginationMeta, User } from '@/types';
import {
    Shield,
    Crown,
    UserCheck,
    GraduationCap,
    Key,
    Camera,
    Trash2,
    Lock,
    Save,
    CheckCircle2,
    UploadCloud,
    User as UserIcon,
} from 'lucide-react';

interface AdminUsersProps {
    users: PaginationMeta<User>;
}

export default function AdminUsers({ users }: AdminUsersProps) {
    const authUser = usePage().props.auth.user as User;

    // État pour changer le mot de passe d'un utilisateur sélectionné
    const [selectedUserForPassword, setSelectedUserForPassword] = useState<User | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Formulaire de profil de l'administrateur
    const {
        data: profileData,
        setData: setProfileData,
        post: postProfile,
        processing: profileProcessing,
        errors: profileErrors,
    } = useForm<{
        name: string;
        email: string;
        bio: string;
        password: string;
        avatar: File | null;
    }>({
        name: authUser?.name || '',
        email: authUser?.email || '',
        bio: authUser?.bio || '',
        password: '',
        avatar: null,
    });

    const [avatarPreview, setAvatarPreview] = useState<string | null>(authUser?.avatar || null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileData('avatar', file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postProfile('/admin/utilisateurs/mon-profil', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setProfileData('password', '');
            },
        });
    };

    const roleBadge = (role?: string) => {
        switch (role) {
            case 'admin':
                return { label: 'Admin', icon: Crown, cls: 'bg-rose-950/70 text-rose-400 border-rose-800/40' };
            case 'moderator':
                return { label: 'Modérateur', icon: UserCheck, cls: 'bg-amber-950/70 text-amber-400 border-amber-800/40' };
            default:
                return { label: 'Étudiant', icon: GraduationCap, cls: 'bg-emerald-950/70 text-emerald-400 border-emerald-800/40' };
        }
    };

    const updateRole = (userId: number, newRole: string) => {
        router.post(`/admin/utilisateurs/${userId}/role`, { role: newRole }, { preserveScroll: true });
    };

    const handlePasswordChangeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUserForPassword) return;

        if (newPassword.length < 6) {
            alert('Le mot de passe doit comporter au moins 6 caractères.');
            return;
        }

        setPasswordLoading(true);
        router.post(
            `/admin/utilisateurs/${selectedUserForPassword.id}/password`,
            { password: newPassword },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSelectedUserForPassword(null);
                    setNewPassword('');
                    setPasswordLoading(false);
                },
                onError: () => {
                    setPasswordLoading(false);
                },
            }
        );
    };

    const handleDelete = (userId: number, name: string) => {
        if (confirm(`Confirmez-vous la suppression du compte de "${name}" ?`)) {
            router.delete(`/admin/utilisateurs/${userId}`, { preserveScroll: true });
        }
    };

    return (
        <AppLayout>
            <Head title="Gestion des Utilisateurs & Profil — Admin SDBSNX" />

            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
                        <Shield className="w-4 h-4" />
                        <span>Panneau d'Administration</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        Utilisateurs & Profil Administrateur
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Gérez les comptes, réinitialisez les mots de passe et personnalisez votre profil avec votre photo.
                    </p>
                </div>

                {/* Unified Admin Navigation */}
                <AdminNav />

                {/* SECTION 1: MON PROFIL ADMINISTRATEUR (Photo + Mot de passe personnel) */}
                <div className="bg-white dark:bg-[#1A241D] rounded-2xl border border-[#28372B]/12 dark:border-white/10 p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center gap-3 pb-5 border-b border-[#28372B]/10 dark:border-white/10 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[#1E5B45]/15 text-[#1E5B45] dark:text-[#52B788] flex items-center justify-center">
                            <Crown className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-[#1D3027] dark:text-white">
                                Mon Compte Administrateur & Photo de Profil
                            </h2>
                            <p className="text-xs text-[#59685F] dark:text-[#C2CEC6]">
                                Changez votre photo de profil, vos identifiants ou votre mot de passe d'accès.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                        {/* Avatar Picker */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#28372B]/10 dark:border-white/10">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#1E5B45] dark:border-[#52B788] shadow-md bg-[#F7F5EF] dark:bg-black/30 flex items-center justify-center">
                                    {avatarPreview ? (
                                        <img
                                            src={avatarPreview}
                                            alt={authUser?.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#1E5B45] dark:text-[#52B788] uppercase">
                                            {authUser?.name?.charAt(0) || 'A'}
                                        </div>
                                    )}
                                </div>
                                <label
                                    htmlFor="admin-avatar-upload"
                                    className="absolute bottom-0 right-0 p-2 rounded-full bg-[#1E5B45] hover:bg-[#2F6D52] text-white shadow-lg cursor-pointer transition-transform group-hover:scale-110"
                                    title="Changer la photo de profil"
                                >
                                    <Camera className="w-4 h-4" />
                                </label>
                                <input
                                    type="file"
                                    id="admin-avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </div>

                            <div className="text-center sm:text-left flex-1">
                                <h3 className="text-sm font-bold text-[#1D3027] dark:text-white">
                                    Choisir votre photo de profil
                                </h3>
                                <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] mt-0.5">
                                    Format JPG, PNG, WEBP ou SVG (Max 5 Mo). L'image s'affichera sur votre espace et vos publications.
                                </p>
                                <label
                                    htmlFor="admin-avatar-upload"
                                    className="inline-flex items-center gap-2 mt-3 px-3.5 py-1.5 rounded-lg border border-[#28372B]/15 dark:border-white/10 text-xs font-semibold text-[#1D3027] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition"
                                >
                                    <UploadCloud className="w-3.5 h-3.5 text-[#1E5B45]" />
                                    <span>Parcourir mes photos</span>
                                </label>
                                {profileErrors.avatar && (
                                    <p className="text-xs text-red-500 mt-1">{profileErrors.avatar}</p>
                                )}
                            </div>
                        </div>

                        {/* Profile Info & Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono font-medium text-[#1D3027] dark:text-white mb-1">
                                    Nom Complet Administrateur *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={profileData.name}
                                    onChange={(e) => setProfileData('name', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#121A15] border border-[#28372B]/15 dark:border-white/10 text-[#1D3027] dark:text-white focus:outline-hidden focus:border-[#1E5B45]"
                                />
                                {profileErrors.name && (
                                    <p className="text-[11px] text-red-500 mt-1">{profileErrors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-medium text-[#1D3027] dark:text-white mb-1">
                                    Adresse Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={profileData.email}
                                    onChange={(e) => setProfileData('email', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#121A15] border border-[#28372B]/15 dark:border-white/10 text-[#1D3027] dark:text-white focus:outline-hidden focus:border-[#1E5B45]"
                                />
                                {profileErrors.email && (
                                    <p className="text-[11px] text-red-500 mt-1">{profileErrors.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono font-medium text-[#1D3027] dark:text-white mb-1">
                                    Changer mon Mot de Passe (Laissez vide pour conserver l'actuel)
                                </label>
                                <div className="relative">
                                    <Lock className="w-3.5 h-3.5 absolute left-3 top-3 text-[#7D897F]" />
                                    <input
                                        type="password"
                                        placeholder="Nouveau mot de passe secret (min 6 car.)"
                                        value={profileData.password}
                                        onChange={(e) => setProfileData('password', e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-[#121A15] border border-[#28372B]/15 dark:border-white/10 text-[#1D3027] dark:text-white focus:outline-hidden focus:border-[#1E5B45]"
                                    />
                                </div>
                                {profileErrors.password && (
                                    <p className="text-[11px] text-red-500 mt-1">{profileErrors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-medium text-[#1D3027] dark:text-white mb-1">
                                    Bio / Titre Professionnel
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Administrateur Principal SDBSNX • IDA"
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData('bio', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#121A15] border border-[#28372B]/15 dark:border-white/10 text-[#1D3027] dark:text-white focus:outline-hidden focus:border-[#1E5B45]"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={profileProcessing}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E5B45] hover:bg-[#2F6D52] text-white font-semibold text-xs shadow-xs transition-all disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                <span>{profileProcessing ? 'Enregistrement...' : 'Mettre à jour mon profil'}</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* SECTION 2: LISTE DES COMPTES & CHANGEMENT DE MOT DE PASSE UTILISATEURS */}
                <div className="bg-white dark:bg-[#1A241D] rounded-2xl border border-[#28372B]/12 dark:border-white/10 overflow-hidden shadow-xs">
                    <div className="p-4 sm:p-5 border-b border-[#28372B]/10 dark:border-white/10 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-[#1E5B45] dark:text-[#52B788]" />
                            <h2 className="text-sm font-bold font-mono text-[#1D3027] dark:text-white">
                                Tous les Comptes Inscrits ({users.total})
                            </h2>
                        </div>
                        <span className="text-xs text-[#7D897F] dark:text-[#849187] font-mono">
                            Modifiez les rôles ou changez les mots de passe des étudiants
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-[#28372B]/10 dark:border-white/10 text-[#7D897F] dark:text-[#849187] font-mono uppercase text-[10px] tracking-wider bg-[#F7F5EF]/50 dark:bg-black/20">
                                    <th className="text-left px-5 py-3">Utilisateur</th>
                                    <th className="text-left px-5 py-3">Email</th>
                                    <th className="text-left px-5 py-3">Rôle</th>
                                    <th className="text-left px-5 py-3">Promotion</th>
                                    <th className="text-center px-5 py-3">Mot de passe</th>
                                    <th className="text-right px-5 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#28372B]/10 dark:divide-white/10">
                                {users.data.map((user) => {
                                    const badge = roleBadge(user.role);
                                    const BadgeIcon = badge.icon;
                                    const isCurrentAdmin = user.id === authUser?.id;

                                    return (
                                        <tr key={user.id} className="hover:bg-[#F7F5EF]/60 dark:hover:bg-white/[0.02] transition">
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full overflow-hidden bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs shrink-0">
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            user.name?.charAt(0).toUpperCase() ?? '?'
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-[#1D3027] dark:text-white flex items-center gap-1.5">
                                                            {user.name}
                                                            {isCurrentAdmin && (
                                                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1E5B45]/20 text-[#1E5B45] dark:text-[#52B788] font-mono font-medium">
                                                                    (Vous)
                                                                </span>
                                                            )}
                                                        </span>
                                                        {user.bio && (
                                                            <p className="text-[11px] text-[#7D897F] dark:text-[#849187] line-clamp-1">{user.bio}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5 text-[#59685F] dark:text-[#C2CEC6] font-mono">{user.email}</td>
                                            <td className="px-5 py-3.5">
                                                <select
                                                    value={user.role ?? 'student'}
                                                    onChange={(e) => updateRole(user.id, e.target.value)}
                                                    className="bg-white dark:bg-[#121A15] border border-[#28372B]/15 dark:border-white/10 rounded-lg px-2.5 py-1 text-[11px] text-[#1D3027] dark:text-white font-mono focus:outline-hidden"
                                                >
                                                    <option value="student">Étudiant</option>
                                                    <option value="moderator">Modérateur</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>
                                            <td className="px-5 py-3.5 text-[#59685F] dark:text-[#C2CEC6]">{user.promotion ?? '—'}</td>
                                            <td className="px-5 py-3.5 text-center">
                                                <button
                                                    onClick={() => {
                                                        setSelectedUserForPassword(user);
                                                        setNewPassword('');
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-xs font-mono font-semibold transition"
                                                >
                                                    <Key className="w-3.5 h-3.5" />
                                                    <span>Changer</span>
                                                </button>
                                            </td>
                                            <td className="px-5 py-3.5 text-right">
                                                {!isCurrentAdmin && (
                                                    <button
                                                        onClick={() => handleDelete(user.id, user.name)}
                                                        className="p-1.5 rounded-lg border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition"
                                                        title="Supprimer ce compte"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {users.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {users.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                                    link.active
                                        ? 'bg-[#1E5B45] text-white'
                                        : link.url
                                        ? 'bg-white dark:bg-[#1A241D] text-[#59685F] dark:text-[#C2CEC6] hover:bg-[#F7F5EF] dark:hover:bg-white/5'
                                        : 'bg-transparent text-[#7D897F] opacity-50 cursor-not-allowed'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL DE CHANGEMENT DE MOT DE PASSE UTILISATEUR */}
            {selectedUserForPassword && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="bg-white dark:bg-[#1A241D] rounded-2xl max-w-md w-full p-6 border border-[#28372B]/15 dark:border-white/10 shadow-xl">
                        <div className="flex items-center justify-between pb-3 border-b border-[#28372B]/10 dark:border-white/10 mb-4">
                            <div className="flex items-center gap-2">
                                <Key className="w-5 h-5 text-amber-500" />
                                <h3 className="text-sm font-bold text-[#1D3027] dark:text-white">
                                    Réinitialiser le Mot de Passe
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedUserForPassword(null)}
                                className="text-[#7D897F] hover:text-[#1D3027] dark:hover:text-white text-lg font-bold"
                            >
                                ×
                            </button>
                        </div>

                        <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] mb-4">
                            Définissez un nouveau mot de passe pour le compte de <strong>{selectedUserForPassword.name}</strong> ({selectedUserForPassword.email}).
                        </p>

                        <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono font-medium text-[#1D3027] dark:text-white mb-1">
                                    Nouveau mot de passe *
                                </label>
                                <input
                                    type="text"
                                    required
                                    autoFocus
                                    placeholder="Ex: pass2026!#"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#121A15] border border-[#28372B]/15 dark:border-white/10 text-[#1D3027] dark:text-white focus:outline-hidden focus:border-[#1E5B45] font-mono"
                                />
                                <span className="text-[10px] text-[#7D897F] dark:text-[#849187] mt-1 block">
                                    Minimum 6 caractères. L'utilisateur pourra l'utiliser immédiatement pour se connecter.
                                </span>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#28372B]/10 dark:border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setSelectedUserForPassword(null)}
                                    className="px-4 py-2 rounded-xl text-xs font-mono text-[#59685F] dark:text-[#C2CEC6] hover:bg-black/5 dark:hover:bg-white/5"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={passwordLoading}
                                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-xs transition-colors disabled:opacity-50"
                                >
                                    {passwordLoading ? 'Mise à jour...' : 'Appliquer le mot de passe'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

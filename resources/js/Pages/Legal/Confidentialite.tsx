import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ShieldCheck,
    Lock,
    Eye,
    Database,
    Trash2,
    CheckCircle2,
    Mail,
    Server,
    ExternalLink,
    AlertCircle,
    Key,
    FileCheck,
} from 'lucide-react';

export default function Confidentialite() {
    return (
        <AppLayout>
            <Head title="Politique de Confidentialité (Conformité CDP Sénégal) — SDBSNX" />

            <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                {/* Header */}
                <div className="border-b border-[#28372B]/10 dark:border-white/10 pb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5B45]/10 text-[#1E5B45] dark:text-[#62A87A] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Protection des Données Personnelles</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#1D3027] dark:text-white">
                        Politique de Confidentialité
                    </h1>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#849187] mt-2 font-mono">
                        Conformité avec la Loi n° 2008-12 du Sénégal • Dernière mise à jour : Novembre 2026
                    </p>
                </div>

                {/* Engagement Cadre Légal Sénégalais */}
                <div className="p-6 rounded-2xl bg-[#1E5B45]/10 border border-[#1E5B45]/30 dark:bg-[#1E5B45]/15 dark:border-[#62A87A]/30">
                    <div className="flex items-start gap-3">
                        <FileCheck className="w-6 h-6 text-[#1E5B45] dark:text-[#62A87A] shrink-0 mt-0.5" />
                        <div className="space-y-2">
                            <h2 className="text-base font-bold font-heading text-[#1D3027] dark:text-white">
                                Engagement de conformité à la Loi n° 2008-12 (CDP Sénégal)
                            </h2>
                            <p className="text-xs sm:text-sm text-[#1D3027] dark:text-[#C2CEC6] leading-relaxed">
                                La plateforme <strong>SDBSNX</strong> accorde une importance primordiale au respect de la vie privée de ses apprenants et utilisateurs. Nous nous efforçons de respecter scrupuleusement les exigences de la <strong>Loi n° 2008-12 du 25 janvier 2008 portant sur la protection des données à caractère personnel au Sénégal</strong>, sous l’égide de la <strong>Commission de Protection des Données Personnelles (CDP)</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 1. Responsable de Traitement */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Lock className="w-5 h-5" />
                        <h2>1. Responsable du traitement des données</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        Le responsable du traitement des données collectées dans le cadre de l’utilisation du service est :
                    </p>
                    <div className="p-4 rounded-xl bg-[#F7F5EF] dark:bg-black/25 border border-[#28372B]/10 dark:border-white/5 text-xs sm:text-sm space-y-1 font-mono">
                        <div><strong>Entité :</strong> SDBSNX</div>
                        <div><strong>Responsable désigné :</strong> Équipe technique SDBSNX</div>
                        <div>
                            <strong>Email dédié aux droits et libertés :</strong>{' '}
                            <a href="mailto:sdbsntech@gmail.com" className="text-[#1E5B45] dark:text-[#62A87A] font-bold underline">
                                sdbsntech@gmail.com
                            </a>
                        </div>
                        <div><strong>Site officiel :</strong> sdbsnx.site</div>
                    </div>
                </div>

                {/* 2. Données collectées */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Database className="w-5 h-5" />
                        <h2>2. Données à caractère personnel collectées</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        Nous appliquons le principe de <strong>minimisation des données</strong> : seules les informations strictement nécessaires à la finalité pédagogique sont recueillies :
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl bg-[#F7F5EF] dark:bg-black/20 border border-[#28372B]/10 dark:border-white/5 space-y-2">
                            <h3 className="font-bold text-xs uppercase font-mono text-[#1E5B45] dark:text-[#62A87A]">
                                A. Données fournies volontairement
                            </h3>
                            <ul className="text-xs text-[#59685F] dark:text-[#849187] space-y-1.5 list-disc list-inside">
                                <li>Nom ou pseudonyme d’affichage</li>
                                <li>Adresse de courrier électronique (email)</li>
                                <li>Mot de passe (conservé sous forme d'empreinte hachée irréversible)</li>
                                <li>Publications, questions et réponses sur le forum d’entraide</li>
                                <li>Messages soumis via le formulaire de contact</li>
                            </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-[#F7F5EF] dark:bg-black/20 border border-[#28372B]/10 dark:border-white/5 space-y-2">
                            <h3 className="font-bold text-xs uppercase font-mono text-[#A8743F] dark:text-[#D5A45F]">
                                B. Données techniques & de navigation
                            </h3>
                            <ul className="text-xs text-[#59685F] dark:text-[#849187] space-y-1.5 list-disc list-inside">
                                <li>Adresse IP de connexion (à des fins exclusives de sécurité et journalisation)</li>
                                <li>Type et version de navigateur web utilisé</li>
                                <li>Horodatage des requêtes et pages de cours consultées</li>
                                <li>Progression pédagogique et favoris enregistrés</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-xs text-[#59685F] dark:text-[#849187] italic">
                        Note : La consultation libre des cours, exercices et téléchargements de documents PDF s'effectue <strong>sans obligation préalable de créer un compte</strong>.
                    </p>
                </div>

                {/* 3. Finalités de la collecte & Base légale */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <CheckCircle2 className="w-5 h-5" />
                        <h2>3. Finalités des traitements et base juridique</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        Chaque traitement de données repose sur une base légale définie conformément à la législation sénégalaise :
                    </p>
                    <div className="space-y-3 pt-1">
                        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F5EF] dark:bg-black/20 border border-[#28372B]/10 dark:border-white/5">
                            <span className="w-2 h-2 rounded-full bg-[#1E5B45] dark:bg-[#62A87A] mt-1.5 shrink-0" />
                            <div>
                                <strong className="text-xs text-[#1D3027] dark:text-white block font-sans">
                                    Création et gestion du compte utilisateur & profil étudiant
                                </strong>
                                <span className="text-xs text-[#59685F] dark:text-[#849187]">
                                    Base légale : Consentement libre et exécution des fonctionnalités demandées.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F5EF] dark:bg-black/20 border border-[#28372B]/10 dark:border-white/5">
                            <span className="w-2 h-2 rounded-full bg-[#1E5B45] dark:bg-[#62A87A] mt-1.5 shrink-0" />
                            <div>
                                <strong className="text-xs text-[#1D3027] dark:text-white block font-sans">
                                    Animation de l'espace forum et entraide entre étudiants
                                </strong>
                                <span className="text-xs text-[#59685F] dark:text-[#849187]">
                                    Base légale : Consentement et respect des règles communautaires.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F5EF] dark:bg-black/20 border border-[#28372B]/10 dark:border-white/5">
                            <span className="w-2 h-2 rounded-full bg-[#1E5B45] dark:bg-[#62A87A] mt-1.5 shrink-0" />
                            <div>
                                <strong className="text-xs text-[#1D3027] dark:text-white block font-sans">
                                    Sécurité, prévention des attaques informatiques et respect des obligations légales
                                </strong>
                                <span className="text-xs text-[#59685F] dark:text-[#849187]">
                                    Base légale : Intérêt légitime et respect des exigences de cybersécurité (Loi n° 2008-11).
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Durée de conservation */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Trash2 className="w-5 h-5" />
                        <h2>4. Durée de conservation des données</h2>
                    </div>
                    <ul className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] space-y-2 leading-relaxed list-disc list-inside">
                        <li>
                            <strong>Données de compte actif :</strong> Conservées tant que l'utilisateur maintient son inscription active.
                        </li>
                        <li>
                            <strong>Comptes inactifs :</strong> Suppression automatique ou anonymisation après <strong>24 mois d'inactivité continue</strong> constatée.
                        </li>
                        <li>
                            <strong>Journaux de connexion (logs de sécurité) :</strong> Conservés pour une durée maximale de <strong>6 mois à 1 an</strong>, conformément aux obligations de sécurité numérique.
                        </li>
                        <li>
                            <strong>Demandes de suppression :</strong> Traitement effectif dans un délai maximum de <strong>30 jours</strong> après validation de l'identité du demandeur.
                        </li>
                    </ul>
                </div>

                {/* 5. Sous-traitants & Destinataires techniques */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Server className="w-5 h-5" />
                        <h2>5. Destinataires et sous-traitants techniques</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        <strong>Aucune donnée personnelle n'est vendue, louée ou cédée à des fins commerciales ou publicitaires.</strong> Les données sont uniquement accessibles à l'équipe technique SDBSNX et à nos prestataires techniques agissant en sous-traitance stricte :
                    </p>
                    <ul className="text-xs sm:text-sm text-[#1D3027] dark:text-white space-y-2 pt-1 font-sans">
                        <li>
                            <strong>• Base de données MySQL :</strong> Système de gestion de base de données relationnelle sécurisé, hébergé sur infrastructure Hostinger, assurant le stockage localisé et protégé des comptes et progressions.
                        </li>
                        <li>
                            <strong>• Hostinger International Ltd :</strong> Fournisseur d'hébergement serveur, infrastructure et connectivité réseau.
                        </li>
                    </ul>
                </div>

                {/* 6. Droits des utilisateurs (CDP Sénégal) */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Eye className="w-5 h-5" />
                        <h2>6. Vos droits sur vos données</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        Conformément aux articles 58 et suivants de la <strong>Loi n° 2008-12</strong>, vous disposez des droits suivants à l'égard de vos données personnelles :
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                        <div className="p-3.5 rounded-xl bg-[#F7F5EF] dark:bg-black/20 border border-[#28372B]/10 dark:border-white/5">
                            <strong className="text-[#1D3027] dark:text-white block font-sans">Droit d'accès & d'information :</strong>
                            <span className="text-[#59685F] dark:text-[#849187]">Obtenir confirmation et copie des données vous concernant faisant l'objet d'un traitement.</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#F7F5EF] dark:bg-black/20 border border-[#28372B]/10 dark:border-white/5">
                            <strong className="text-[#1D3027] dark:text-white block font-sans">Droit de rectification :</strong>
                            <span className="text-[#59685F] dark:text-[#849187]">Faire corriger, mettre à jour ou compléter des données inexactes ou incomplètes.</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#F7F5EF] dark:bg-black/20 border border-[#28372B]/10 dark:border-white/5">
                            <strong className="text-[#1D3027] dark:text-white block font-sans">Droit à l'effacement (oubli) :</strong>
                            <span className="text-[#59685F] dark:text-[#849187]">Demander la suppression complète et définitive de votre compte et de vos données.</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#F7F5EF] dark:bg-black/20 border border-[#28372B]/10 dark:border-white/5">
                            <strong className="text-[#1D3027] dark:text-white block font-sans">Droit d'opposition :</strong>
                            <span className="text-[#59685F] dark:text-[#849187]">Vous opposer pour motifs légitimes au traitement de données vous concernant.</span>
                        </div>
                    </div>

                    {/* Procédure d'exercice */}
                    <div className="mt-4 p-5 rounded-2xl bg-[#1E5B45]/10 border border-[#1E5B45]/20 space-y-2">
                        <div className="flex items-center gap-2 font-bold text-xs text-[#1D3027] dark:text-white uppercase font-mono">
                            <Mail className="w-4 h-4 text-[#1E5B45] dark:text-[#62A87A]" />
                            <span>Comment exercer vos droits ?</span>
                        </div>
                        <p className="text-xs text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                            Pour exercer l’un de ces droits, il vous suffit de nous adresser une demande par courrier électronique en justifiant de votre identité à :
                        </p>
                        <div className="font-mono text-sm font-bold text-[#1E5B45] dark:text-[#62A87A]">
                            sdbsntech@gmail.com
                        </div>
                        <p className="text-[11px] text-[#7D897F] dark:text-[#849187]">
                            Nous nous engageons à vous apporter une réponse documentée dans un délai maximum de <strong>30 jours ouvrés</strong>.
                        </p>
                    </div>

                    {/* Recours CDP Sénégal */}
                    <div className="mt-2 text-xs text-[#59685F] dark:text-[#849187] leading-relaxed">
                        En cas de réponse insatisfaisante ou de désaccord persistant, vous avez le droit de saisir l’autorité de régulation sénégalaise :{' '}
                        <a href="https://www.cdp.sn" target="_blank" rel="noopener noreferrer" className="text-[#1E5B45] dark:text-[#62A87A] font-semibold underline inline-flex items-center gap-0.5">
                            <span>Commission de Protection des Données Personnelles du Sénégal (CDP - www.cdp.sn)</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>.
                    </div>
                </div>

                {/* 7. Mesures de sécurité */}
                <div className="sdbsnx-card rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden space-y-4 bg-white dark:bg-[#1A241D] border border-[#28372B]/12 dark:border-white/10">
                    <div className="flex items-center gap-2 text-[#1E5B45] dark:text-[#62A87A] font-bold text-lg font-heading">
                        <Key className="w-5 h-5" />
                        <h2>7. Mesures de sécurité techniques & organisationnelles</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] leading-relaxed">
                        Conformément à l’obligation de sécurité pesant sur le responsable de traitement (Art. 71 de la Loi n° 2008-12), SDBSNX met en œuvre des mesures adaptées contre l’altération, la perte accidentelle ou l’accès non autorisé :
                    </p>
                    <ul className="text-xs sm:text-sm text-[#59685F] dark:text-[#C2CEC6] space-y-2 list-disc list-inside">
                        <li><strong>Chiffrement des transferts :</strong> Utilisation obligatoire du protocole de sécurisation SSL/TLS (HTTPS).</li>
                        <li><strong>Sécurité des mots de passe :</strong> Hachage cryptographique robuste (Bcrypt/Argon2) avec sel unique.</li>
                        <li><strong>Contrôle d'accès strict :</strong> Isolation stricte des sessions utilisateur et requêtes préparées MySQL empêchant tout accès transversal non autorisé.</li>
                        <li><strong>Protection applicative :</strong> Protection contre les attaques par injection SQL, cross-site scripting (XSS) et falsification de requêtes (CSRF).</li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}


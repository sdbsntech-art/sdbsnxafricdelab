<?php

namespace Database\Seeders;

use App\Models\AcademicLevel;
use App\Models\CommunityComment;
use App\Models\CommunityPost;
use App\Models\CourseModule;
use App\Models\Faq;
use App\Models\Opportunity;
use App\Models\Resource;
use App\Models\Semester;
use App\Models\UsefulLink;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class IdaCoursSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Users
        $admin = User::firstOrCreate(
            ['email' => 'sdbsntech@gmail.com'],
            [
                'name' => 'Directeur SDBSNX (Admin)',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'bio' => 'Direction générale et fondateur de la plateforme SDBSNX.',
                'promotion' => 'Administrateur Général',
                'points' => 2500,
            ]
        );

        User::firstOrCreate(
            ['email' => 'admin@ida-cours.sn'],
            [
                'name' => 'Support Technique SDBSNX',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'bio' => 'Compte administrateur technique et maintenance.',
                'promotion' => 'Administrateur Général',
                'points' => 1500,
            ]
        );

        $student = User::firstOrCreate(
            ['email' => 'etudiant@unchk.sn'],
            [
                'name' => 'Moussa Diop',
                'password' => Hash::make('password'),
                'role' => 'student',
                'bio' => 'Étudiant en Licence Informatique IDA à l\'UN-CHK.',
                'promotion' => 'Licence 2 - UN-CHK',
                'points' => 320,
            ]
        );

        // 2. Academic Levels
        $levelsData = [
            [
                'name' => 'Licence 1',
                'slug' => 'licence-1',
                'short_name' => 'L1',
                'description' => 'Fondations de l\'informatique : Algorithmique, Langage C, Web fondamental, Systèmes & Réseaux de base.',
                'badge_color' => 'indigo',
                'icon' => 'BookOpen',
                'order' => 1,
            ],
            [
                'name' => 'Licence 2',
                'slug' => 'licence-2',
                'short_name' => 'L2',
                'description' => 'Approfondissement : Programmation Objet Java, PHP & Frameworks, Bases de données relationnelles SQL & Merise.',
                'badge_color' => 'cyan',
                'icon' => 'Layers',
                'order' => 2,
            ],
            [
                'name' => 'Licence 3',
                'slug' => 'licence-3',
                'short_name' => 'L3',
                'description' => 'Spécialisation et Professionnalisation : Architectures logicielles, Sécurité, Cloud & Projets de fin d\'études.',
                'badge_color' => 'purple',
                'icon' => 'Award',
                'order' => 3,
            ],
        ];

        $levels = [];
        foreach ($levelsData as $ld) {
            $levels[$ld['slug']] = AcademicLevel::updateOrCreate(['slug' => $ld['slug']], $ld);
        }

        // 3. Semesters
        $semestersData = [
            ['academic_level_id' => $levels['licence-1']->id, 'name' => 'Semestre 1', 'semester_number' => 1, 'slug' => 'semestre-1', 'order' => 1],
            ['academic_level_id' => $levels['licence-1']->id, 'name' => 'Semestre 2', 'semester_number' => 2, 'slug' => 'semestre-2', 'order' => 2],
            ['academic_level_id' => $levels['licence-2']->id, 'name' => 'Semestre 3', 'semester_number' => 3, 'slug' => 'semestre-3', 'order' => 3],
            ['academic_level_id' => $levels['licence-2']->id, 'name' => 'Semestre 4', 'semester_number' => 4, 'slug' => 'semestre-4', 'order' => 4],
            ['academic_level_id' => $levels['licence-3']->id, 'name' => 'Semestre 5', 'semester_number' => 5, 'slug' => 'semestre-5', 'order' => 5],
            ['academic_level_id' => $levels['licence-3']->id, 'name' => 'Semestre 6', 'semester_number' => 6, 'slug' => 'semestre-6', 'order' => 6],
        ];

        $semesters = [];
        foreach ($semestersData as $sd) {
            $semesters[$sd['slug']] = Semester::updateOrCreate(['slug' => $sd['slug']], $sd);
        }

        // Clear existing resources and modules for clean mapping
        Schema::disableForeignKeyConstraints();
        Resource::truncate();
        CourseModule::truncate();
        Schema::enableForeignKeyConstraints();

        // 4. Modules catalog matching real disk structure
        $modulesCatalog = [
            // ============================================
            // LICENCE 1 - SEMESTRE 1
            // ============================================
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Initiation à l\'Algorithmique',
                'code' => 'ALG101',
                'slug' => 'initiation-a-l-algorithmique',
                'description' => 'Notions de base : variables, types, structures conditionnelles, boucles et sous-programmes.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'Binary',
                'color' => 'blue',
            ],
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Initiation à la Programmation',
                'code' => 'PRG101',
                'slug' => 'initiation-a-la-programmation',
                'description' => 'Traduction des algorithmes en code exécutable, compilateurs et premiers travaux pratiques.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Terminal',
                'color' => 'emerald',
            ],
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Introduction aux Langages HTML-CSS',
                'code' => 'HTM101',
                'slug' => 'introduction-aux-langages-html-css',
                'description' => 'Structuration sémantique avec HTML5 et mise en forme responsive avec les feuilles de style CSS3.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Layout',
                'color' => 'amber',
            ],
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Introduction au Langage JavaScript',
                'code' => 'JS101',
                'slug' => 'introduction-au-langage-javascript',
                'description' => 'Dynamisme côté client, variables, événements et manipulation interactive de la page.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Code2',
                'color' => 'yellow',
            ],
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Introduction au Web & Internet',
                'code' => 'WEB101',
                'slug' => 'introduction-au-web',
                'description' => 'Histoire du Web, protocole HTTP, navigateurs, architecture client-serveur et hébergement.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'Globe',
                'color' => 'sky',
            ],
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Introduction aux Réseaux Informatiques',
                'code' => 'RES101',
                'slug' => 'introduction-aux-reseaux',
                'description' => 'Modèle OSI à 7 couches, architecture TCP/IP, adressage IPv4 et matériels d\'interconnexion.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Network',
                'color' => 'indigo',
            ],
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Informatique Bureautique & Outils Numériques',
                'code' => 'BUR101',
                'slug' => 'informatique-bureautique',
                'description' => 'Maîtrise des traitements de texte, tableurs avancés (Excel/Calc) et logiciels de présentation.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'FileSpreadsheet',
                'color' => 'slate',
            ],
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Environnement Mobile & Écosystèmes',
                'code' => 'MOB101',
                'slug' => 'environnement-mobile',
                'description' => 'Panorama des OS mobiles (Android, iOS), caractéristiques matérielles et réseaux mobiles.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'Smartphone',
                'color' => 'teal',
            ],
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Initiation au Développement Mobile',
                'code' => 'DEVM101',
                'slug' => 'initiation-au-developpement-mobile',
                'description' => 'Premiers concepts de développement d\'applications mobiles, architectures et outils dédiés.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'Cpu',
                'color' => 'cyan',
            ],
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Anglais Général & Technique 1',
                'code' => 'ANG101',
                'slug' => 'anglais-technique-1',
                'description' => 'Vocabulaire informatique international, lecture de documentation technique et communication.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'Languages',
                'color' => 'rose',
            ],
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Techniques d\'Expression & Communication en Français',
                'code' => 'TCF101',
                'slug' => 'technique-de-communication',
                'description' => 'Rédaction professionnelle, expression orale, synthèse de documents et argumentation.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'MessageSquare',
                'color' => 'violet',
            ],
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Développement Personnel & Méthode de Travail',
                'code' => 'DEV101',
                'slug' => 'developpement-personnel',
                'description' => 'Organisation du travail universitaire en ligne, gestion du temps et autonomie d\'apprentissage.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'UserCheck',
                'color' => 'emerald',
            ],
            [
                'semester_id' => $semesters['semestre-1']->id,
                'name' => 'Leadership & Soft Skills',
                'code' => 'LEA101',
                'slug' => 'leadership-soft-skills',
                'description' => 'Dynamique de groupe, prise de parole en public, intelligence émotionnelle et posture de leader.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'Award',
                'color' => 'amber',
            ],

            // ============================================
            // LICENCE 1 - SEMESTRE 2
            // ============================================
            [
                'semester_id' => $semesters['semestre-2']->id,
                'name' => 'Algorithmique & Structures Fondamentales',
                'code' => 'ALG201',
                'slug' => 'algorithmique-structures-donnees',
                'description' => 'Structures de données linéaires, tri, recherche, récursivité et calcul de complexité.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'GitMerge',
                'color' => 'blue',
            ],
            [
                'semester_id' => $semesters['semestre-2']->id,
                'name' => 'Programmation en Langage C',
                'code' => 'C201',
                'slug' => 'programmation-en-langage-c',
                'description' => 'Pointeurs, allocation dynamique, manipulation de chaînes, structures et fichiers en C.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'Terminal',
                'color' => 'red',
            ],
            [
                'semester_id' => $semesters['semestre-2']->id,
                'name' => 'HTML5 & Multimédia Avancé',
                'code' => 'HTM201',
                'slug' => 'html5-multimedia',
                'description' => 'Balises sémantiques HTML5, intégration vidéo/audio, canvas et stockage local web.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Palette',
                'color' => 'amber',
            ],
            [
                'semester_id' => $semesters['semestre-2']->id,
                'name' => 'Feuilles de Style CSS3 Avancées',
                'code' => 'CSS201',
                'slug' => 'css3-feuilles-de-style',
                'description' => 'Flexbox, CSS Grid, animations fluides, transitions et mise en page responsive moderne.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Layers',
                'color' => 'sky',
            ],
            [
                'semester_id' => $semesters['semestre-2']->id,
                'name' => 'JavaScript Avancé & Manipulation du DOM',
                'code' => 'JS201',
                'slug' => 'javascript-avance-dom',
                'description' => 'Programmation asynchrone, promesses, requêtes AJAX / Fetch API et manipulation avancée du DOM.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Zap',
                'color' => 'yellow',
            ],
            [
                'semester_id' => $semesters['semestre-2']->id,
                'name' => 'Langage XML & Données Structurées',
                'code' => 'XML201',
                'slug' => 'langage-xml-donnees',
                'description' => 'Syntaxe XML, DTD, schémas XSD, requêtes XPath et transformation XSLT.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'FileCode',
                'color' => 'orange',
            ],
            [
                'semester_id' => $semesters['semestre-2']->id,
                'name' => 'Traitement d\'Images & Graphisme Numérique',
                'code' => 'IMG201',
                'slug' => 'traitement-d-image',
                'description' => 'Principes des formats matriciels et vectoriels, retouche, filtres et optimisation web.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'Image',
                'color' => 'purple',
            ],
            [
                'semester_id' => $semesters['semestre-2']->id,
                'name' => 'Introduction aux Jeux Vidéos & Moteurs 2D',
                'code' => 'JV201',
                'slug' => 'introduction-aux-jeux-videos',
                'description' => 'Game loop, détection de collisions, conception de niveaux et bases de la logique de jeu.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'Gamepad2',
                'color' => 'teal',
            ],
            [
                'semester_id' => $semesters['semestre-2']->id,
                'name' => 'Aspects Éthiques & Légaux du Numérique',
                'code' => 'ETH201',
                'slug' => 'aspects-ethiques-et-legaux',
                'description' => 'Droit du numérique au Sénégal, cybercriminalité, protection des données personnelles (CDP / RGPD).',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'ShieldCheck',
                'color' => 'emerald',
            ],
            [
                'semester_id' => $semesters['semestre-2']->id,
                'name' => 'Langue Nationale & Technologies (TIC)',
                'code' => 'LNTIC201',
                'slug' => 'langue-nationale-et-tic',
                'description' => 'Valorisation et traitement informatique des langues nationales du Sénégal (Wolof, Pulaar, Seereer).',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'BookMarked',
                'color' => 'cyan',
            ],

            // ============================================
            // LICENCE 2 - SEMESTRE 3
            // ============================================
            [
                'semester_id' => $semesters['semestre-3']->id,
                'name' => 'Algorithmes & Structures de Données Avancées',
                'code' => 'ALG301',
                'slug' => 'algorithme-et-structure-des-donnees-l2',
                'description' => 'Listes chaînées, piles, files, arbres binaires, tables de hachage et graphes.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'GitMerge',
                'color' => 'blue',
            ],
            [
                'semester_id' => $semesters['semestre-3']->id,
                'name' => 'Programmation Avancée en Langage C',
                'code' => 'C301',
                'slug' => 'programmation-en-langage-c-l2',
                'description' => 'Gestion fine de la mémoire, arithmétique de pointeurs, structures complexes et modularité.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'Terminal',
                'color' => 'red',
            ],
            [
                'semester_id' => $semesters['semestre-3']->id,
                'name' => 'Langage PHP & Développement Web Backend',
                'code' => 'PHP301',
                'slug' => 'langage-php',
                'description' => 'Syntaxe PHP, sessions, gestion sécurisée des formulaires, interaction MySQL et architecture MVC.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'Code',
                'color' => 'violet',
            ],
            [
                'semester_id' => $semesters['semestre-3']->id,
                'name' => 'Langage SQL & Requêtage Avancé',
                'code' => 'SQL301',
                'slug' => 'langage-sql',
                'description' => 'DDL, DML, DCL, requêtes imbriquées, jointures complexes, index et transactions ACID.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'Server',
                'color' => 'indigo',
            ],
            [
                'semester_id' => $semesters['semestre-3']->id,
                'name' => 'Modélisation Bases de Données Relationnelles',
                'code' => 'MOD301',
                'slug' => 'modéllisation-de-bases-de-données-relationelles',
                'description' => 'Méthode Merise (MCD, MLD, MPD), règles de gestion et normalisation des schémas relationnels.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'Database',
                'color' => 'cyan',
            ],
            [
                'semester_id' => $semesters['semestre-3']->id,
                'name' => 'Frameworks Frontend (Bootstrap, jQuery)',
                'code' => 'FWK301',
                'slug' => 'framework-html-css-javascript',
                'description' => 'Conception d\'interfaces riches avec composants Bootstrap, jQuery et animations réactives.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Component',
                'color' => 'emerald',
            ],
            [
                'semester_id' => $semesters['semestre-3']->id,
                'name' => 'JavaScript Côté Serveur (Node.js)',
                'code' => 'SRV301',
                'slug' => 'framework-javascript-cote-serveur',
                'description' => 'Architecture événementielle non-bloquante Node.js, modules NPM, Express et API RESTful.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Zap',
                'color' => 'yellow',
            ],
            [
                'semester_id' => $semesters['semestre-3']->id,
                'name' => 'Manipulation des Données XML & Parsers',
                'code' => 'XML301',
                'slug' => 'manipulation-de-donnees-xml',
                'description' => 'Parsing DOM et SAX en PHP/Java, validation par schémas et échanges de flux de données.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'FileCode',
                'color' => 'orange',
            ],
            [
                'semester_id' => $semesters['semestre-3']->id,
                'name' => 'Comptabilité de Gestion & Analyse Financière',
                'code' => 'CPT301',
                'slug' => 'comptabilite-de-gestion',
                'description' => 'Coûts de revient, seuil de rentabilité, budgets prévisionnels et tableaux de bord de gestion.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'Calculator',
                'color' => 'teal',
            ],
            [
                'semester_id' => $semesters['semestre-3']->id,
                'name' => 'Anglais Professionnel & Informatique 2',
                'code' => 'ANG301',
                'slug' => 'anglais-altassia',
                'description' => 'Communication d\'entreprise anglophone, entretiens techniques et rédaction de rapports.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'Languages',
                'color' => 'rose',
            ],
            [
                'semester_id' => $semesters['semestre-3']->id,
                'name' => 'Recherche Documentaire & Méthodologie',
                'code' => 'DOC301',
                'slug' => 'recherche-documentaire',
                'description' => 'Sources académiques, veille technologique, citation de références et démarche scientifique.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'Search',
                'color' => 'slate',
            ],

            // ============================================
            // LICENCE 2 - SEMESTRE 4
            // ============================================
            [
                'semester_id' => $semesters['semestre-4']->id,
                'name' => 'Frameworks PHP (Laravel / Symfony)',
                'code' => 'FWK401',
                'slug' => 'framework-php',
                'description' => 'Architecture MVC robuste, Eloquent ORM, routage, middlewares et authentification avec Laravel.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'Code2',
                'color' => 'red',
            ],
            [
                'semester_id' => $semesters['semestre-4']->id,
                'name' => 'PHP Avancé & Architecture Orientée Objet',
                'code' => 'PHP401',
                'slug' => 'php-avance',
                'description' => 'Programmation orientée objet en PHP, Design Patterns, namespaces, Composer et tests unitaires.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'Boxes',
                'color' => 'violet',
            ],
            [
                'semester_id' => $semesters['semestre-4']->id,
                'name' => 'Programmation Orientée Objet JAVA',
                'code' => 'JAV401',
                'slug' => 'langage-java',
                'description' => 'Classes, héritage, polymorphisme, interfaces, exceptions, collections et généricité en Java.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'Coffee',
                'color' => 'amber',
            ],
            [
                'semester_id' => $semesters['semestre-4']->id,
                'name' => 'Modélisation Objet & Langage UML',
                'code' => 'UML401',
                'slug' => 'langage-uml',
                'description' => 'Diagrammes de cas d\'utilisation, de classes, de séquence, d\'activités et d\'états-transitions.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Layers',
                'color' => 'indigo',
            ],
            [
                'semester_id' => $semesters['semestre-4']->id,
                'name' => 'Java Web (JSP & Servlets)',
                'code' => 'JSP401',
                'slug' => 'jsp-servlet',
                'description' => 'Applications web Java EE, cycle de vie des Servlets, sessions HTTP et pages dynamiques JSP.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Server',
                'color' => 'cyan',
            ],
            [
                'semester_id' => $semesters['semestre-4']->id,
                'name' => 'Interface Homme-Machine (IHM) & Ergonomie',
                'code' => 'IHM401',
                'slug' => 'ihm-interface-homme-machine',
                'description' => 'Principes d\'ergonomie cognitive, design d\'expérience utilisateur (UX) et prototypage d\'interfaces.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Layout',
                'color' => 'emerald',
            ],
            [
                'semester_id' => $semesters['semestre-4']->id,
                'name' => 'Programmation Mobile Android',
                'code' => 'AND401',
                'slug' => 'programmation-mobile-android',
                'description' => 'Activités, fragments, layouts XML, stockage SQLite, gestion des permissions et publishing Android.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Smartphone',
                'color' => 'teal',
            ],
            [
                'semester_id' => $semesters['semestre-4']->id,
                'name' => 'Programmation Mobile iOS (Swift)',
                'code' => 'IOS401',
                'slug' => 'programmation-mobile-avec-ios',
                'description' => 'Écosystème iOS, syntaxe Swift, UIKit / SwiftUI, navigation et persistance des données sous Apple iOS.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Apple',
                'color' => 'slate',
            ],
            [
                'semester_id' => $semesters['semestre-4']->id,
                'name' => 'Développement 3D & Unreal Engine 4',
                'code' => 'UE401',
                'slug' => 'programmation-sur-ue4',
                'description' => 'Concepts de rendu 3D temps réel, blueprints, physique, textures et moteur Unreal Engine 4.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'Gamepad2',
                'color' => 'purple',
            ],
            [
                'semester_id' => $semesters['semestre-4']->id,
                'name' => 'Gestion de Projet Informatique (Agile / Scrum)',
                'code' => 'PRJ401',
                'slug' => 'gestion-de-projet',
                'description' => 'Cahier des charges, planification, méthodes agiles (Scrum, Kanban), sprints et suivi de livrables.',
                'credits' => 2,
                'coefficient' => 1,
                'icon' => 'CheckSquare',
                'color' => 'sky',
            ],

            // ============================================
            // LICENCE 3 - SEMESTRE 5
            // ============================================
            [
                'semester_id' => $semesters['semestre-5']->id,
                'name' => 'Architectures Logicielles & Design Patterns',
                'code' => 'ARCH501',
                'slug' => 'architecture-logicielle',
                'description' => 'Patrons de conception (GoF), architectures en couches, hexagonale, microservices et robustesse logicielle.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'Layers',
                'color' => 'indigo',
            ],
            [
                'semester_id' => $semesters['semestre-5']->id,
                'name' => 'Framework JavaServer Faces (JSF)',
                'code' => 'JSF501',
                'slug' => 'framework-jsf',
                'description' => 'Développement d\'applications d\'entreprise avec JSF, Managed Beans, composants graphiques et navigation.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'Coffee',
                'color' => 'amber',
            ],
            [
                'semester_id' => $semesters['semestre-5']->id,
                'name' => 'Systèmes de Gestion de Contenu (CMS & LMS)',
                'code' => 'CMS501',
                'slug' => 'cms-lms',
                'description' => 'Déploiement et personnalisation de CMS (WordPress, Drupal) et plateformes d\'e-learning (Moodle).',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Layout',
                'color' => 'blue',
            ],
            [
                'semester_id' => $semesters['semestre-5']->id,
                'name' => 'Sécurisation & Optimisation Web et Mobile',
                'code' => 'SEC501',
                'slug' => 'securisation-et-optimisation',
                'description' => 'Audit des failles OWASP Top 10, sécurisation des flux API, durcissement applicatif et performance.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'ShieldAlert',
                'color' => 'red',
            ],
            [
                'semester_id' => $semesters['semestre-5']->id,
                'name' => 'Compression & Outils Cryptographiques',
                'code' => 'CRY501',
                'slug' => 'techniques-de-compression-et-cryptographie',
                'description' => 'Algorithmes de compression de données, cryptographie symétrique/asymétrique, signatures et hachage.',
                'credits' => 4,
                'coefficient' => 3,
                'icon' => 'Lock',
                'color' => 'purple',
            ],
            [
                'semester_id' => $semesters['semestre-5']->id,
                'name' => 'Technologies Connexes de Développement Web',
                'code' => 'TWEB501',
                'slug' => 'technologie-connexe-developpement-web',
                'description' => 'WebSockets, communication temps réel, GraphQL, API RESTful et conteneurs applicatifs.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Globe',
                'color' => 'teal',
            ],
            [
                'semester_id' => $semesters['semestre-5']->id,
                'name' => 'Technologies Connexes de Développement Mobile',
                'code' => 'TMOB501',
                'slug' => 'technologie-connexes-developpement-mobile',
                'description' => 'Notifications push, géolocalisation, synchronisation hors ligne et Progressive Web Apps mobiles.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Smartphone',
                'color' => 'emerald',
            ],
            [
                'semester_id' => $semesters['semestre-5']->id,
                'name' => 'Conception de Plateformes E-Commerce',
                'code' => 'ECM501',
                'slug' => 'e-commerce',
                'description' => 'Passerelles de paiement électronique (Wave, Orange Money, Stripe), logistique et sécurité des paniers.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'ShoppingBag',
                'color' => 'orange',
            ],

            // ============================================
            // LICENCE 3 - SEMESTRE 6
            // ============================================
            [
                'semester_id' => $semesters['semestre-6']->id,
                'name' => 'Projet de Fin d\'Études (PFE)',
                'code' => 'PFE601',
                'slug' => 'projet-de-fin-d-etudes-pfe',
                'description' => 'Cahier des charges, modélisation complète, développement fullstack, rapport de stage et soutenance.',
                'credits' => 8,
                'coefficient' => 6,
                'icon' => 'Trophy',
                'color' => 'amber',
            ],
            [
                'semester_id' => $semesters['semestre-6']->id,
                'name' => 'Entrepreneuriat Numérique & Startups Tech',
                'code' => 'ENT601',
                'slug' => 'entrepreneuriat-numerique-startups',
                'description' => 'Business Model Canvas, pitch investisseurs, statut juridique, startup act Sénégal et levée de fonds.',
                'credits' => 3,
                'coefficient' => 2,
                'icon' => 'Briefcase',
                'color' => 'emerald',
            ],
        ];

        $modules = [];
        foreach ($modulesCatalog as $mc) {
            $modules[$mc['slug']] = CourseModule::create($mc);
        }

        // 5. Indexing real files from the workspace into resources
        $basePath = base_path();

        // Exact pattern mapping based on path fragments
        $pathRules = [
            // L1 S1
            'semestre 1/initiation à l\'algorithmique' => 'initiation-a-l-algorithmique',
            'semestre 1/initiation à la programmation' => 'initiation-a-la-programmation',
            'semestre 1/introduction aux langages html-css' => 'introduction-aux-langages-html-css',
            'semestre 1/introduction au langage javascript' => 'introduction-au-langage-javascript',
            'semestre 1/introduction au web' => 'introduction-au-web',
            'semestre 1/introduction aux reseaux' => 'introduction-aux-reseaux',
            'semestre 1/informatique-bureautique' => 'informatique-bureautique',
            'semestre 1/environnement mobile' => 'environnement-mobile',
            'semestre 1/initiation au développement mobile' => 'initiation-au-developpement-mobile',
            'semestre 1/anglais' => 'anglais-technique-1',
            'semestre 1/technique de communication en français' => 'technique-de-communication',
            'semestre 1/développement personnel' => 'developpement-personnel',
            'semestre 1/leadership' => 'leadership-soft-skills',

            // L1 S2
            'semestre 02/algorithme' => 'algorithmique-structures-donnees',
            'semestre 02/langage c' => 'programmation-en-langage-c',
            'semestre 02/html5' => 'html5-multimedia',
            'semestre 02/css3' => 'css3-feuilles-de-style',
            'semestre 02/javascript02' => 'javascript-avance-dom',
            'semestre 02/xml' => 'langage-xml-donnees',
            'semestre 02/traitement d\'image' => 'traitement-d-image',
            'semestre 02/introduction aux jeux videos' => 'introduction-aux-jeux-videos',
            'semestre 02/aspects  ethiques' => 'aspects-ethiques-et-legaux',
            'semestre 02/aspects ethiques' => 'aspects-ethiques-et-legaux',
            'semestre 02/langue nationale' => 'langue-nationale-et-tic',

            // L2 S3
            'semestres 1/algorithme et structure des données' => 'algorithme-et-structure-des-donnees-l2',
            'semestres 1/programmation en langage c' => 'programmation-en-langage-c-l2',
            'semestres 1/langage php' => 'langage-php',
            'semestres 1/langage sql' => 'langage-sql',
            'semestres 1/modéllisation de bases' => 'modéllisation-de-bases-de-données-relationelles',
            'semestres 1/framework html css javascript' => 'framework-html-css-javascript',
            'semestres 1/framework javascript coté serveur' => 'framework-javascript-cote-serveur',
            'semestres 1/manipulation de données xml' => 'manipulation-de-donnees-xml',
            'semestres 1/comptabilité de gestion' => 'comptabilite-de-gestion',
            'semestres 1/anglais altassia' => 'anglais-altassia',
            'semestres 1/recherche documentaire' => 'recherche-documentaire',

            // L2 S4
            'semestre 2/framework php' => 'framework-php',
            'semestre 2/php avancé' => 'php-avance',
            'semestre 2/langage java' => 'langage-java',
            'semestre 2/langage uml' => 'langage-uml',
            'semestre 2/jsp servlet' => 'jsp-servlet',
            'semestre 2/ihm' => 'ihm-interface-homme-machine',
            'semestre 2/programmation mobile android' => 'programmation-mobile-android',
            'semestre 2/programmation mobile avec ios' => 'programmation-mobile-avec-ios',
            'semestre 2/programmation sur ue4' => 'programmation-sur-ue4',
            'semestre 2/gestion de projet' => 'gestion-de-projet',

            // L3 S5
            'architecture logicielle' => 'architecture-logicielle',
            'framework jsf' => 'framework-jsf',
            'cms-lms' => 'cms-lms',
            'sécurisation et optimisation' => 'securisation-et-optimisation',
            'techniques de compression' => 'techniques-de-compression-et-cryptographie',
            'technologie connexe de développement web' => 'technologie-connexe-developpement-web',
            'technologie connexes de développement mobile' => 'technologie-connexes-developpement-mobile',
            'e-commerce' => 'e-commerce',

            // TD files in PARTIE TD DE L1 ET L2
            'td/licence 1/xml' => 'langage-xml-donnees',
            'td/licence 2/c' => 'programmation-en-langage-c-l2',
            'td/licence 2/algorithme' => 'algorithme-et-structure-des-donnees-l2',
            'td/licence 2/framwork html.css.js' => 'framework-html-css-javascript',
            'td/licence 2/manipulation xml' => 'manipulation-de-donnees-xml',
            'td/licence 2/modelisation du base de donne' => 'modéllisation-de-bases-de-données-relationelles',
            'td/licence 2/php' => 'langage-php',
            'td/licence 2/sql' => 'langage-sql',
        ];

        $foldersToScan = [
            'LICENCE 1',
            'LICENCE 2',
            'COURS LICENCE 3 SEMESTRE 5',
        ];

        $allowedExtensions = ['pdf', 'html', 'c', 'cpp', 'docx', 'doc', 'zip', 'txt'];
        $createdResourcesCount = 0;

        foreach ($foldersToScan as $topFolder) {
            $scanDir = $basePath.DIRECTORY_SEPARATOR.$topFolder;
            if (! File::exists($scanDir)) {
                continue;
            }

            $allFiles = File::allFiles($scanDir);
            foreach ($allFiles as $file) {
                $ext = strtolower($file->getExtension());
                if (! in_array($ext, $allowedExtensions)) {
                    continue;
                }

                $fileName = $file->getFilename();
                $fullPath = $file->getPathname();
                $relativePath = str_replace($basePath.DIRECTORY_SEPARATOR, '', $fullPath);
                $normalizedPath = str_replace('\\', '/', strtolower($relativePath));

                // Filter out browser web dumps assets (e.g. _files subfolder, bootstrap assets, images)
                if (str_contains($normalizedPath, '_files') ||
                    str_contains($normalizedPath, 'sitejquery2019/images') ||
                    str_contains($normalizedPath, 'bootstrap/css') ||
                    str_contains($normalizedPath, 'bootstrap/fonts') ||
                    str_contains($normalizedPath, 'bootstrap/js')) {
                    continue;
                }

                // Find matching module
                $matchedSlug = null;
                foreach ($pathRules as $rulePattern => $targetSlug) {
                    if (str_contains($normalizedPath, $rulePattern)) {
                        $matchedSlug = $targetSlug;
                        break;
                    }
                }

                if (! $matchedSlug || ! isset($modules[$matchedSlug])) {
                    continue;
                }

                $module = $modules[$matchedSlug];
                $semesterId = $module->semester_id;
                $levelId = Semester::find($semesterId)->academic_level_id ?? $levels['licence-1']->id;

                $fileSize = $file->getSize();
                $sizeFormatted = $fileSize > 1048576
                    ? round($fileSize / 1048576, 2).' MB'
                    : round($fileSize / 1024, 1).' KB';

                // Resource type deduction
                $type = 'course';
                if (str_contains($normalizedPath, 'td') || str_contains($normalizedPath, 'travaux dirig')) {
                    $type = 'td';
                } elseif (str_contains($normalizedPath, 'exo') || str_contains($normalizedPath, 'exercice') || str_contains($normalizedPath, 'a rendre')) {
                    $type = 'exercise';
                } elseif (str_contains($normalizedPath, 'projet')) {
                    $type = 'project';
                } elseif (str_contains($normalizedPath, 'examen') || str_contains($normalizedPath, 'devoir')) {
                    $type = 'exam';
                }

                $cleanTitle = pathinfo($fileName, PATHINFO_FILENAME);
                $cleanTitle = str_replace(['_', '-'], ' ', $cleanTitle);
                $cleanTitle = preg_replace('/\s+/', ' ', $cleanTitle);
                $cleanTitle = trim($cleanTitle);

                $slug = Str::slug($cleanTitle.'-'.Str::random(5));

                Resource::create([
                    'module_id' => $module->id,
                    'academic_level_id' => $levelId,
                    'semester_id' => $semesterId,
                    'user_id' => $admin->id,
                    'title' => $cleanTitle,
                    'slug' => $slug,
                    'type' => $type,
                    'description' => "Support officiel du cours {$module->name} dispensé à l'Université Numérique Cheikh Hamidou Kane (UN-CHK).",
                    'file_path' => $relativePath,
                    'file_type' => $ext,
                    'file_size_formatted' => $sizeFormatted,
                    'is_published' => true,
                    'is_featured' => ($createdResourcesCount < 8),
                    'downloads_count' => 0,
                    'views_count' => 0,
                ]);

                $createdResourcesCount++;
            }
        }

        // 6. Semestre 6 Essential Resources (PFE & Entrepreneuriat)
        $s6Resources = [
            [
                'module_id' => $modules['projet-de-fin-d-etudes-pfe']->id,
                'academic_level_id' => $levels['licence-3']->id,
                'semester_id' => $semesters['semestre-6']->id,
                'user_id' => $admin->id,
                'title' => 'Guide Méthodologique de Rédaction du Mémoire de Fin d\'Études (PFE)',
                'slug' => 'guide-methodologique-pfe-unchk-'.Str::random(5),
                'type' => 'project',
                'description' => 'Document de cadrage officiel UN-CHK : structure du mémoire, formalisme académique, citations IEEE et consignes de soutenance.',
                'file_path' => 'COURS LICENCE 3 SEMESTRE 5/PFE_Guide_Methodologique_UNCHK.pdf',
                'file_type' => 'pdf',
                'file_size_formatted' => '1.4 MB',
                'is_published' => true,
                'is_featured' => true,
                'downloads_count' => 0,
                'views_count' => 0,
            ],
            [
                'module_id' => $modules['projet-de-fin-d-etudes-pfe']->id,
                'academic_level_id' => $levels['licence-3']->id,
                'semester_id' => $semesters['semestre-6']->id,
                'user_id' => $admin->id,
                'title' => 'Modèle de Cahier des Charges & Grille d\'Évaluation du Jury',
                'slug' => 'modele-cahier-des-charges-grille-jury-'.Str::random(5),
                'type' => 'project',
                'description' => 'Trame de spécifications fonctionnelles et techniques, critères de notation du jury et déroulement de l\'exposé oral.',
                'file_path' => 'COURS LICENCE 3 SEMESTRE 5/Grille_Evaluation_PFE.docx',
                'file_type' => 'docx',
                'file_size_formatted' => '420 KB',
                'is_published' => true,
                'is_featured' => false,
                'downloads_count' => 0,
                'views_count' => 0,
            ],
            [
                'module_id' => $modules['entrepreneuriat-numerique-startups']->id,
                'academic_level_id' => $levels['licence-3']->id,
                'semester_id' => $semesters['semestre-6']->id,
                'user_id' => $admin->id,
                'title' => 'Canevas Business Model Canvas (BMC) & Pitch Deck Startup',
                'slug' => 'canevas-business-model-canvas-pitch-'.Str::random(5),
                'type' => 'course',
                'description' => 'Guide complet pour formaliser sa proposition de valeur, segments clients, canaux de distribution et présentation investisseurs.',
                'file_path' => 'COURS LICENCE 3 SEMESTRE 5/Entrepreneuriat_BMC_Startup_Deck.pdf',
                'file_type' => 'pdf',
                'file_size_formatted' => '2.1 MB',
                'is_published' => true,
                'is_featured' => true,
                'downloads_count' => 0,
                'views_count' => 0,
            ],
            [
                'module_id' => $modules['entrepreneuriat-numerique-startups']->id,
                'academic_level_id' => $levels['licence-3']->id,
                'semester_id' => $semesters['semestre-6']->id,
                'user_id' => $admin->id,
                'title' => 'Cadre Juridique du Startup Act & Financement Tech au Sénégal',
                'slug' => 'cadre-juridique-startup-act-senegal-'.Str::random(5),
                'type' => 'course',
                'description' => 'Législation nationale, statut des jeunes entreprises innovantes, exonérations fiscales et dispositifs d\'amorçage.',
                'file_path' => 'COURS LICENCE 3 SEMESTRE 5/Startup_Act_Senegal_Guide.pdf',
                'file_type' => 'pdf',
                'file_size_formatted' => '950 KB',
                'is_published' => true,
                'is_featured' => false,
                'downloads_count' => 0,
                'views_count' => 0,
            ],
        ];

        foreach ($s6Resources as $s6) {
            Resource::create($s6);
        }

        // 7. Useful links & Annexes
        $usefulLinks = [
            [
                'title' => 'Université Numérique Cheikh Hamidou Kane (UN-CHK)',
                'category' => 'un_chk',
                'url' => 'https://unchk.sn',
                'description' => 'Portail officiel de l\'UN-CHK : informations institutionnelles, scolarité et espaces numériques de travail (ENT).',
                'icon' => 'GraduationCap',
                'order' => 1,
            ],
            [
                'title' => 'Plateforme Pédagogique Moodle UN-CHK',
                'category' => 'un_chk',
                'url' => 'https://ead.unchk.sn',
                'description' => 'Accès aux espaces de cours en ligne, devoirs à rendre, forums d\'enseignants et visioconférences.',
                'icon' => 'BookOpen',
                'order' => 2,
            ],
            [
                'title' => 'FORCE-N (Formation Ouverte pour le Renforcement des Compétences)',
                'category' => 'un_chk',
                'url' => 'https://forcen.sn',
                'description' => 'Programme national porté par l\'UN-CHK pour l\'insertion professionnelle et les compétences technologiques du futur (« sa ëllëg ci xarala »).',
                'icon' => 'Sparkles',
                'order' => 3,
            ],
            [
                'title' => 'Grafikart — Formations d\'Excellence Web & PHP / Laravel',
                'category' => 'grafikart',
                'url' => 'https://grafikart.fr',
                'description' => 'Remerciements chaleureux à Grafikart pour ses formations d\'excellence gratuites en PHP, JavaScript, CSS et Laravel qui ont formé des générations de développeurs francophones.',
                'icon' => 'Video',
                'order' => 4,
            ],
            [
                'title' => 'Grafikart : Apprendre PHP de Zéro à Expert',
                'category' => 'grafikart',
                'url' => 'https://grafikart.fr/formations/php',
                'description' => 'Formation vidéo complète sur le langage PHP moderne, la programmation orientée objet et le routing.',
                'icon' => 'PlayCircle',
                'order' => 5,
            ],
            [
                'title' => 'Grafikart : Maîtriser le Framework Laravel',
                'category' => 'grafikart',
                'url' => 'https://grafikart.fr/formations/laravel',
                'description' => 'Cours complets sur l\'écosystème Laravel : Eloquent ORM, Blade, Inertia, Auth et déploiement.',
                'icon' => 'Sparkles',
                'order' => 6,
            ],
            [
                'title' => 'MDN Web Docs (Mozilla Developer Network)',
                'category' => 'docs_outils',
                'url' => 'https://developer.mozilla.org/fr/',
                'description' => 'La documentation technique de référence absolue pour HTML5, CSS3, JavaScript et les API Web.',
                'icon' => 'FileText',
                'order' => 7,
            ],
            [
                'title' => 'DevDocs API Documentation',
                'category' => 'docs_outils',
                'url' => 'https://devdocs.io',
                'description' => 'Toutes les documentations de langages réunies dans une interface ultra-rapide consultable même hors ligne.',
                'icon' => 'Search',
                'order' => 8,
            ],
            [
                'title' => 'GitHub Student Developer Pack',
                'category' => 'docs_outils',
                'url' => 'https://education.github.com/pack',
                'description' => 'Outils professionnels gratuits pour les étudiants : domaines gratuits, crédits Cloud, licences JetBrains et outils IA.',
                'icon' => 'Gift',
                'order' => 9,
            ],
        ];

        foreach ($usefulLinks as $ul) {
            UsefulLink::updateOrCreate(['url' => $ul['url']], $ul);
        }

        // 8. FAQs
        $faqs = [
            [
                'question' => 'Qu\'est-ce que la plateforme IDA-COURS & SDBSNX ?',
                'answer' => 'IDA-COURS est la plateforme d\'accompagnement éducatif et communautaire créée pour les étudiants en informatique (filière IDA de l\'UN-CHK et passionnés autodidactes). Elle regroupe tous les supports de cours officiels, travaux dirigés (TD), devoirs passés, vidéothèque complète et opportunités de carrière.',
                'category' => 'general',
                'order' => 1,
            ],
            [
                'question' => 'Comment télécharger les cours et exercices ?',
                'answer' => 'L\'accès est 100% ouvert et gratuit sans aucune inscription obligatoire pour les étudiants ! Vous pouvez parcourir les cours par Licence (L1, L2, L3) et Semestre (S1 à S6), ou utiliser la barre de recherche globale (Ctrl+K). Chaque ressource dispose d\'un aperçu et d\'un téléchargement direct.',
                'category' => 'cours',
                'order' => 2,
            ],
            [
                'question' => 'Comment la plateforme fonctionne-t-elle en mode déconnecté (PWA) ?',
                'answer' => 'IDA-COURS est conçue comme une Progressive Web App (PWA). Vous pouvez l\'installer sur votre smartphone Android, iPhone ou ordinateur en un clic. Vos cours et favoris sont stockés en cache local pour une révision sans connexion internet.',
                'category' => 'pwa',
                'order' => 3,
            ],
            [
                'question' => 'Quelles sont les couleurs et emblèmes officiels représentés ?',
                'answer' => 'La plateforme rend hommage à l\'Université Numérique Cheikh Hamidou Kane (UN-CHK) en intégrant son bleu royal (#0069B4), son vert émeraude (#00A859), son orange solaire (#F37021), ainsi que l\'emblème du programme d\'insertion FORCE-N (« sa ëllëg ci xarala »).',
                'category' => 'general',
                'order' => 4,
            ],
            [
                'question' => 'Quels remerciements particuliers sont adressés à Grafikart ?',
                'answer' => 'L\'équipe SDBSNX adresse sa plus profonde gratitude à Jonathan Boyer (Grafikart), dont le dévouement et l\'excellence pédagogique ont permis à des dizaines de milliers d\'étudiants et développeurs francophones de maîtriser PHP, Laravel, SQL et JavaScript.',
                'category' => 'general',
                'order' => 5,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(['question' => $faq['question']], $faq);
        }

        // 9. Opportunities
        $opportunities = [
            [
                'title' => 'Bourse d\'Excellence Numérique UN-CHK & Partenaires',
                'slug' => 'bourse-excellence-numerique-unchk',
                'type' => 'bourse',
                'organization' => 'Fondation Numérique Sénégal',
                'location' => 'Dakar / En ligne',
                'deadline' => now()->addMonths(2)->format('Y-m-d'),
                'apply_url' => 'https://unchk.sn',
                'description' => 'Programme de soutien financier et dotation en ordinateurs portables performants pour les étudiants méritants de la filière informatique.',
                'is_active' => false,
            ],
            [
                'title' => 'Hackathon National d\'Innovation Tech & IA Sénégal',
                'slug' => 'hackathon-national-innovation-tech-ia',
                'type' => 'hackathon',
                'organization' => 'Dakar Digital Hub & Ministère de la Communication',
                'location' => 'Dakar, Sénégal',
                'deadline' => now()->addMonths(1)->format('Y-m-d'),
                'apply_url' => 'https://dakar-tech.sn',
                'description' => '48 heures de hackathon intensif pour concevoir des applications résolvant des problématiques de santé, agriculture et éducation en Afrique.',
                'is_active' => false,
            ],
            [
                'title' => 'Programme de Certification Cloud AWS & Google Cloud Gratuit',
                'slug' => 'certification-cloud-aws-google',
                'type' => 'certification',
                'organization' => 'Africa Cloud Academy',
                'location' => 'En ligne',
                'deadline' => now()->addWeeks(6)->format('Y-m-d'),
                'apply_url' => 'https://aws.amazon.com/training/',
                'description' => 'Bourses complètes d\'accès aux formations certifiantes AWS Cloud Practitioner et Google Associate Cloud Engineer.',
                'is_active' => false,
            ],
            [
                'title' => 'Stages Développeur Fullstack Laravel & React',
                'slug' => 'stages-developpeur-fullstack-laravel-react',
                'type' => 'stage',
                'organization' => 'SDBSNX Technologies & Startups partenaires',
                'location' => 'Dakar / Télétravail',
                'deadline' => now()->addWeeks(4)->format('Y-m-d'),
                'apply_url' => 'mailto:sdbsntech@gmail.com',
                'description' => 'Recrutement de stagiaires talentueux et passionnés pour concevoir des solutions EdTech, Fintech et plateformes gouvernementales.',
                'is_active' => false,
            ],
        ];

        foreach ($opportunities as $opp) {
            Opportunity::updateOrCreate(['slug' => $opp['slug']], $opp);
        }

        // 10. Community Posts
        $post1 = CommunityPost::updateOrCreate(
            ['slug' => 'comment-eviter-erreurs-segmentation-pointeurs-langage-c'],
            [
                'user_id' => $student->id,
                'module_id' => $modules['programmation-en-langage-c']->id ?? null,
                'title' => 'Comment éviter les erreurs de segmentation (Segfault) avec les pointeurs en Langage C ?',
                'content' => "Bonjour à tous les camarades d'IDA !\n\nEn travaillant sur les exercices du Semestre 2 (Seq 1 Langage C), je rencontre souvent une erreur `Segmentation fault: 11` lors de la libération de ma liste chaînée avec `free()`. Quels sont les bons réflexes pour initialiser et tester `NULL` avant d'allouer ou désallouer ?",
                'category' => 'question_cours',
                'is_solved' => true,
                'views_count' => 0,
                'likes_count' => 0,
            ]
        );

        CommunityComment::firstOrCreate(
            [
                'community_post_id' => $post1->id,
                'user_id' => $admin->id,
            ],
            [
                'content' => "Salut Moussa !\n\nL'erreur classique provient du fait d'accéder au pointeur après l'avoir libéré (dangling pointer) ou de faire `free(p->next)` sans stocker temporairement le nœud suivant.\n\nVoici la structure type à adopter :\n```c\nNode* current = head;\nwhile (current != NULL) {\n    Node* next = current->next;\n    free(current);\n    current = next;\n}\nhead = NULL;\n```\nN'oublie pas non plus de toujours vérifier que `malloc()` n'a pas retourné `NULL`.",
                'is_solution' => true,
                'likes_count' => 0,
            ]
        );

        $post2 = CommunityPost::updateOrCreate(
            ['slug' => 'atelier-pratique-developper-projet-laravel-13-inertia-react'],
            [
                'user_id' => $admin->id,
                'module_id' => $modules['framework-php']->id ?? null,
                'title' => 'Atelier de Pratique : Développer son premier projet Laravel 13 avec Inertia & React',
                'content' => "Chers étudiants d'IDA,\n\nCe samedi à 15h GMT, le club organise un atelier de démonstration pratique en ligne. Nous allons créer une application complète en direct, explorer Eloquent ORM, les routes et les composants React avec TailwindCSS.\n\nTous les membres de Licence 1, 2 et 3 sont invités !",
                'category' => 'annonce',
                'is_solved' => false,
                'views_count' => 0,
                'likes_count' => 0,
            ]
        );
    }
}

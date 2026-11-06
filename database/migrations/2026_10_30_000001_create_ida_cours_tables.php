<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Enrich users table
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('student')->after('password'); // admin, moderator, student
            $table->string('avatar')->nullable()->after('role');
            $table->text('bio')->nullable()->after('avatar');
            $table->string('promotion')->nullable()->after('bio'); // e.g. "Promo 6 - UN-CHK"
            $table->integer('points')->default(0)->after('promotion');
            $table->string('github')->nullable()->after('points');
            $table->string('linkedin')->nullable()->after('github');
            $table->boolean('is_banned')->default(false)->after('linkedin');
        });

        // 2. Academic Levels (Licence 1, Licence 2, Licence 3)
        Schema::create('academic_levels', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Licence 1, Licence 2, Licence 3
            $table->string('slug')->unique(); // l1, l2, l3
            $table->string('short_name')->default('L1');
            $table->text('description')->nullable();
            $table->string('badge_color')->default('blue');
            $table->string('icon')->default('GraduationCap');
            $table->integer('order')->default(1);
            $table->timestamps();
        });

        // 3. Semesters (Semestre 1 à 6)
        Schema::create('semesters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('academic_level_id')->constrained('academic_levels')->cascadeOnDelete();
            $table->string('name'); // Semestre 1, Semestre 2...
            $table->integer('semester_number'); // 1, 2, 3, 4, 5, 6
            $table->string('slug')->unique(); // s1, s2, s3...
            $table->text('description')->nullable();
            $table->integer('order')->default(1);
            $table->timestamps();
        });

        // 4. Modules / Subjects (Algorithmique, Bases de Données, Réseaux, Web, etc.)
        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('semester_id')->constrained('semesters')->cascadeOnDelete();
            $table->string('name');
            $table->string('code')->nullable(); // e.g. "INFO1101"
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->integer('credits')->default(3);
            $table->integer('coefficient')->default(2);
            $table->integer('hours')->default(30);
            $table->string('icon')->default('BookOpen');
            $table->string('color')->default('blue');
            $table->timestamps();
        });

        // 5. Educational Resources (Courses, TD, Exercises, Projects, Exams, Videos)
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id')->constrained('modules')->cascadeOnDelete();
            $table->foreignId('academic_level_id')->constrained('academic_levels')->cascadeOnDelete();
            $table->foreignId('semester_id')->constrained('semesters')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title');
            $table->string('slug');
            $table->enum('type', ['course', 'td', 'exercise', 'project', 'exam', 'video', 'summary'])->default('course');
            $table->text('description')->nullable();
            $table->string('file_path')->nullable();
            $table->string('external_url')->nullable();
            $table->string('file_type')->nullable(); // pdf, zip, docx, mp4, etc.
            $table->string('file_size_formatted')->nullable();
            $table->boolean('is_published')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->unsignedBigInteger('downloads_count')->default(0);
            $table->unsignedBigInteger('views_count')->default(0);
            $table->timestamps();
        });

        // 6. Community Discussions / Forum
        Schema::create('community_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('module_id')->nullable()->constrained('modules')->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content');
            $table->string('category')->default('entraide'); // entraide, question_cours, projet, astuce, annonce
            $table->boolean('is_solved')->default(false);
            $table->unsignedBigInteger('views_count')->default(0);
            $table->unsignedBigInteger('likes_count')->default(0);
            $table->timestamps();
        });

        // 7. Community Comments / Answers
        Schema::create('community_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('community_post_id')->constrained('community_posts')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('community_comments')->nullOnDelete();
            $table->text('content');
            $table->boolean('is_solution')->default(false);
            $table->unsignedBigInteger('likes_count')->default(0);
            $table->timestamps();
        });

        // 8. Opportunities (Bourses, Stages, Formations, Certifications, Hackathons)
        Schema::create('opportunities', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('type')->default('formation'); // formation, bourse, stage, certification, hackathon, concours
            $table->string('organization')->nullable();
            $table->string('location')->nullable();
            $table->date('deadline')->nullable();
            $table->string('apply_url')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 9. Useful links & Annexes (UN-CHK, Grafikart acknowledgments, Dev Docs, Cheat sheets)
        Schema::create('useful_links', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category')->default('un_chk'); // un_chk, grafikart, docs_outils, bibliotheque
            $table->string('url');
            $table->text('description')->nullable();
            $table->string('icon')->default('ExternalLink');
            $table->integer('order')->default(1);
            $table->timestamps();
        });

        // 10. FAQ
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->text('answer');
            $table->string('category')->default('general'); // general, un_chk, cours, examens
            $table->integer('order')->default(1);
            $table->timestamps();
        });

        // 11. Student Bookmarks
        Schema::create('user_bookmarks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('resource_id')->constrained('resources')->cascadeOnDelete();
            $table->unique(['user_id', 'resource_id']);
            $table->timestamps();
        });

        // 12. Student Progress
        Schema::create('user_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('resource_id')->constrained('resources')->cascadeOnDelete();
            $table->boolean('is_completed')->default(false);
            $table->timestamp('last_accessed_at')->nullable();
            $table->unique(['user_id', 'resource_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_progress');
        Schema::dropIfExists('user_bookmarks');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('useful_links');
        Schema::dropIfExists('opportunities');
        Schema::dropIfExists('community_comments');
        Schema::dropIfExists('community_posts');
        Schema::dropIfExists('resources');
        Schema::dropIfExists('modules');
        Schema::dropIfExists('semesters');
        Schema::dropIfExists('academic_levels');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role',
                'avatar',
                'bio',
                'promotion',
                'points',
                'github',
                'linkedin',
                'is_banned',
            ]);
        });
    }
};

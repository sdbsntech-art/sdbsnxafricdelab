export interface User {
    id: number;
    name: string;
    email: string;
    role?: 'admin' | 'moderator' | 'student';
    avatar?: string | null;
    bio?: string | null;
    promotion?: string | null;
    points?: number;
    github?: string | null;
    linkedin?: string | null;
    email_verified_at?: string | null;
}

export interface AcademicLevel {
    id: number;
    name: string;
    slug: string;
    short_name: string;
    description: string | null;
    badge_color: string;
    icon: string;
    order: number;
    semesters?: Semester[];
    modules_count?: number;
    resources_count?: number;
}

export interface Semester {
    id: number;
    academic_level_id: number;
    name: string;
    semester_number: number;
    slug: string;
    description: string | null;
    order: number;
    academic_level?: AcademicLevel;
    modules?: CourseModule[];
}

export interface CourseModule {
    id: number;
    semester_id: number;
    name: string;
    code: string | null;
    slug: string;
    description: string | null;
    credits: number;
    coefficient: number;
    hours: number;
    icon: string;
    color: string;
    semester?: Semester;
    resources?: Resource[];
    resources_count?: number;
}

export interface Resource {
    id: number;
    module_id: number;
    academic_level_id: number;
    semester_id: number;
    user_id: number | null;
    title: string;
    slug: string;
    type: 'course' | 'td' | 'exercise' | 'project' | 'exam' | 'video' | 'summary';
    description: string | null;
    file_path: string | null;
    external_url: string | null;
    file_type: string | null;
    file_size_formatted: string | null;
    is_published: boolean;
    is_featured: boolean;
    downloads_count: number;
    views_count: number;
    created_at: string;
    module?: CourseModule;
    academic_level?: AcademicLevel;
    semester?: Semester;
    user?: User | null;
}

export interface CommunityPost {
    id: number;
    user_id: number;
    module_id: number | null;
    title: string;
    slug: string;
    content: string;
    category: 'entraide' | 'question_cours' | 'projet' | 'astuce' | 'annonce';
    is_solved: boolean;
    views_count: number;
    likes_count: number;
    created_at: string;
    user?: User;
    module?: CourseModule | null;
    comments_count?: number;
    comments?: CommunityComment[];
}

export interface CommunityComment {
    id: number;
    community_post_id: number;
    user_id: number;
    parent_id: number | null;
    content: string;
    is_solution: boolean;
    likes_count: number;
    created_at: string;
    user?: User;
    replies?: CommunityComment[];
}

export interface Opportunity {
    id: number;
    title: string;
    slug: string;
    type: 'formation' | 'bourse' | 'stage' | 'certification' | 'hackathon' | 'concours';
    organization: string | null;
    location: string | null;
    deadline: string | null;
    apply_url: string | null;
    description: string | null;
    is_active: boolean;
    created_at: string;
}

export interface UsefulLink {
    id: number;
    title: string;
    category: 'un_chk' | 'grafikart' | 'docs_outils' | 'bibliotheque';
    url: string;
    description: string | null;
    icon: string;
    order: number;
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
    category: string;
    order: number;
}

export interface PaginationMeta<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    links: { url: string | null; label: string; active: boolean }[];
}

export type PaginatedData<T> = PaginationMeta<T>;

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

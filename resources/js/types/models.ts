export type Category = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    parent_id: number | null;
    sort_order: number;
    is_active: boolean;
    parent?: Category | null;
    children?: Category[];
    products_count?: number;
};

export type Product = {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    short_description: string | null;
    description: string | null;
    image: string | null;
    price: string | null;
    specifications: Array<{ label: string; value: string }> | null;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
    category?: Category;
};

export type Slide = {
    id: number;
    title: string;
    subtitle: string | null;
    image: string;
    link: string | null;
    link_label: string | null;
    is_active: boolean;
    sort_order: number;
};

export type NewsArticle = {
    id: number;
    author_id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    cover_image: string | null;
    client_name: string | null;
    project_location: string | null;
    project_year: number | string | null;
    category: string;
    status: 'draft' | 'published';
    published_at: string | null;
    author?: User;
};

export type User = {
    id: number;
    name: string;
    email: string;
    role: 'superadmin' | 'admin';
    created_at?: string;
};

export type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: Array<{ url: string | null; label: string; active: boolean }>;
};

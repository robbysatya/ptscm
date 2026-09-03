export const NEWS_CATEGORY_LABELS: Record<string, string> = {
    proyek: 'Proyek Selesai',
    galeri: 'Galeri Pekerjaan',
    kerjasama: 'Kerja Sama',
    pameran: 'Pameran',
    produk: 'Produk Baru',
    edukasi: 'Edukasi',
    csr: 'CSR',
    umum: 'Umum',
};

export function newsCategoryLabel(category: string | null | undefined): string {
    return (category && NEWS_CATEGORY_LABELS[category]) || 'Umum';
}

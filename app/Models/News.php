<?php

namespace App\Models;

use App\Concerns\HasSlug;
use Database\Factories\NewsFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $author_id
 * @property string $title
 * @property string $slug
 * @property string|null $excerpt
 * @property string $content
 * @property string|null $cover_image
 * @property string $category
 * @property string $status
 * @property Carbon|null $published_at
 */
#[Fillable(['author_id', 'title', 'slug', 'excerpt', 'content', 'cover_image', 'category', 'status', 'published_at'])]
class News extends Model
{
    public const STATUS_DRAFT = 'draft';

    public const STATUS_PUBLISHED = 'published';

    /** @var array<string, string> */
    public const CATEGORIES = [
        'pameran' => 'Pameran',
        'produk' => 'Produk Baru',
        'edukasi' => 'Edukasi',
        'csr' => 'CSR',
        'umum' => 'Umum',
    ];

    /** @use HasFactory<NewsFactory> */
    use HasFactory, HasSlug;

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    public function getSlugSource(): string
    {
        return $this->title;
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        if (blank($this->cover_image)) {
            return null;
        }

        return rtrim((string) config('app.url'), '/').'/storage/'.ltrim($this->cover_image, '/');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('status', self::STATUS_PUBLISHED)
            ->whereNotNull('published_at');
    }

    public function isPublished(): bool
    {
        return $this->status === self::STATUS_PUBLISHED && $this->published_at !== null;
    }
}

<?php

namespace App\Models;

use App\Concerns\HasSlug;
use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $category_id
 * @property string $name
 * @property string $slug
 * @property string|null $short_description
 * @property string|null $description
 * @property string|null $image
 * @property string|null $price
 * @property array|null $specifications
 * @property bool $is_featured
 * @property bool $is_active
 * @property int $sort_order
 */
#[Fillable(['category_id', 'name', 'slug', 'short_description', 'description', 'image', 'price', 'specifications', 'is_featured', 'is_active', 'sort_order'])]
class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory, HasSlug;

    protected function casts(): array
    {
        return [
            'specifications' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'price' => 'decimal:2',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getImageUrlAttribute(): ?string
    {
        if (blank($this->image)) {
            return null;
        }

        return rtrim((string) config('app.url'), '/').'/storage/'.ltrim($this->image, '/');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }
}

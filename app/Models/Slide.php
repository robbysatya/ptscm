<?php

namespace App\Models;

use Database\Factories\SlideFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string|null $subtitle
 * @property string $image
 * @property string|null $link
 * @property string|null $link_label
 * @property bool $is_active
 * @property int $sort_order
 */
#[Fillable(['title', 'subtitle', 'image', 'link', 'link_label', 'is_active', 'sort_order'])]
class Slide extends Model
{
    /** @use HasFactory<SlideFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getImageUrlAttribute(): ?string
    {
        if (blank($this->image)) {
            return null;
        }

        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        return rtrim((string) config('app.url'), '/').'/storage/'.ltrim($this->image, '/');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}

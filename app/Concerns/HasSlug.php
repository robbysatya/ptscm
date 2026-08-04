<?php

namespace App\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @mixin Model
 */
trait HasSlug
{
    /**
     * Boot the trait and auto-fill the slug from the slug source before saving.
     */
    public static function bootHasSlug(): void
    {
        static::saving(function (Model $model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->getSlugSource());
            }
        });
    }

    /**
     * The attribute used to generate the slug when it is empty.
     */
    public function getSlugSource(): string
    {
        return $this->name;
    }
}

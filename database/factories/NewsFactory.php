<?php

namespace Database\Factories;

use App\Models\News;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'author_id' => User::factory(),
            'title' => fake()->unique()->sentence(5),
            'excerpt' => fake()->paragraph(),
            'content' => fake()->paragraphs(4, true),
            'cover_image' => null,
            'client_name' => fake()->company(),
            'project_location' => fake()->city(),
            'project_year' => fake()->numberBetween(2020, 2026),
            'category' => fake()->randomElement(array_keys(News::CATEGORIES)),
            'status' => News::STATUS_DRAFT,
            'published_at' => null,
        ];
    }

    /**
     * Mark the article as published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => News::STATUS_PUBLISHED,
            'published_at' => now()->subHour(),
        ]);
    }
}

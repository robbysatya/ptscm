<?php

namespace Database\Factories;

use App\Models\Slide;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Slide>
 */
class SlideFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'subtitle' => fake()->paragraph(),
            'image' => 'slides/example.jpg',
            'link' => null,
            'link_label' => null,
            'is_active' => true,
            'sort_order' => 0,
        ];
    }
}

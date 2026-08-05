<?php

namespace App\Policies;

use App\Models\Slide;
use App\Models\User;

class SlidePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->role->canManageSlides();
    }

    public function view(User $user, Slide $slide): bool
    {
        return $user->role->canManageSlides();
    }

    public function create(User $user): bool
    {
        return $user->role->canManageSlides();
    }

    public function update(User $user, Slide $slide): bool
    {
        return $user->role->canManageSlides();
    }

    public function delete(User $user, Slide $slide): bool
    {
        return $user->role->canManageSlides();
    }
}

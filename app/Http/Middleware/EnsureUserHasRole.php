<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Ensure the authenticated user has one of the given roles.
     *
     * @param  array<int, string>  $roles
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        $allowedRoles = array_map(
            fn (string $role): UserRole => UserRole::from($role),
            $roles,
        );

        abort_unless(
            $user !== null && $user->role !== null && in_array($user->role, $allowedRoles, true),
            Response::HTTP_FORBIDDEN,
        );

        return $next($request);
    }
}

<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('admin.users.index'))->assertRedirect(route('login'));
});

test('an admin cannot access the user management pages', function () {
    $this->actingAs(User::factory()->admin()->create());

    $this->get(route('admin.users.index'))->assertForbidden();
    $this->get(route('admin.users.create'))->assertForbidden();
});

test('a superadmin can access the user listing', function () {
    $this->actingAs(User::factory()->superadmin()->create());

    $this->get(route('admin.users.index'))->assertSuccessful();
});

test('a superadmin can create a user', function () {
    $this->actingAs(User::factory()->superadmin()->create());

    $this->post(route('admin.users.store'), [
        'name' => 'Budi Santoso',
        'email' => 'budi@ptscm.net',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'role' => 'admin',
    ])->assertRedirect();

    $this->assertDatabaseHas('users', [
        'name' => 'Budi Santoso',
        'email' => 'budi@ptscm.net',
        'role' => 'admin',
    ]);
});

test('user password must be confirmed', function () {
    $this->actingAs(User::factory()->superadmin()->create());

    $this->post(route('admin.users.store'), [
        'name' => 'Budi Santoso',
        'email' => 'budi@ptscm.net',
        'password' => 'password123',
        'password_confirmation' => 'password999',
        'role' => 'admin',
    ])->assertSessionHasErrors('password');
});

test('a superadmin can update a user without changing the password', function () {
    $this->actingAs(User::factory()->superadmin()->create());
    $user = User::factory()->admin()->create(['name' => 'Lama']);

    $this->put(route('admin.users.update', $user), [
        'name' => 'Baru',
        'email' => $user->email,
        'password' => '',
        'password_confirmation' => '',
        'role' => 'admin',
    ])->assertRedirect();

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'Baru',
    ]);
});

test('a superadmin can delete a user', function () {
    $this->actingAs(User::factory()->superadmin()->create());
    $user = User::factory()->admin()->create();

    $this->delete(route('admin.users.destroy', $user))->assertRedirect();

    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});

<?php

use App\Models\ContactSetting;
use App\Models\User;

test('admin can update multiple contact numbers and emails', function () {
    $user = User::factory()->admin()->create();

    $response = $this->actingAs($user)->put(route('admin.contact-settings.update'), [
        'address' => 'Alamat baru',
        'whatsapp_numbers' => ['+62 811-1111-1111', '+62 822-2222-2222'],
        'emails' => ['sales@ptscm.net', 'info@ptscm.net'],
    ]);

    $response->assertRedirect(route('admin.contact-settings.edit'));
    expect(ContactSetting::query()->first()->toContactArray())->toBe([
        'address' => 'Alamat baru',
        'whatsapp_numbers' => ['+62 811-1111-1111', '+62 822-2222-2222'],
        'emails' => ['sales@ptscm.net', 'info@ptscm.net'],
    ]);
});

test('public pages receive saved contact settings', function () {
    ContactSetting::create([
        'address' => 'Alamat publik',
        'whatsapp_numbers' => ['+62 833-3333-3333', '+62 844-4444-4444'],
        'emails' => ['hello@ptscm.net'],
    ]);

    $this->get(route('contact'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('public/contact')
            ->where('contactSettings.address', 'Alamat publik')
            ->where('contactSettings.whatsapp_numbers', ['+62 833-3333-3333', '+62 844-4444-4444'])
            ->where('contactSettings.emails', ['hello@ptscm.net']));
});

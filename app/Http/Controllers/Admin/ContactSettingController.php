<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateContactSettingRequest;
use App\Models\ContactSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactSettingController extends Controller
{
    public function edit(): Response
    {
        $settings = ContactSetting::query()->first();

        return Inertia::render('admin/contact-settings/edit', [
            'settings' => $settings?->toContactArray() ?? ContactSetting::defaults(),
        ]);
    }

    public function update(UpdateContactSettingRequest $request): RedirectResponse
    {
        ContactSetting::query()->updateOrCreate(
            ['id' => 1],
            $request->validated(),
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Informasi kontak berhasil diperbarui.')]);

        return to_route('admin.contact-settings.edit');
    }
}

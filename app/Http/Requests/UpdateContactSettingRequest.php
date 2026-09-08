<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateContactSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role->canAccessAdminPanel() ?? false;
    }

    /** @return array<string, ValidationRule|array<mixed>|string> */
    public function rules(): array
    {
        return [
            'address' => ['required', 'string', 'max:500'],
            'whatsapp_numbers' => ['required', 'array', 'min:1'],
            'whatsapp_numbers.*' => ['required', 'string', 'max:30'],
            'emails' => ['required', 'array', 'min:1'],
            'emails.*' => ['required', 'email', 'max:255'],
        ];
    }
}

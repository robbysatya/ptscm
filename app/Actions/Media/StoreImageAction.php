<?php

namespace App\Actions\Media;

use Illuminate\Http\UploadedFile;

class StoreImageAction
{
    /**
     * Store an uploaded image in the public disk and return its relative path.
     */
    public function handle(UploadedFile $file, string $directory): string
    {
        return $file->store($directory, 'public');
    }
}

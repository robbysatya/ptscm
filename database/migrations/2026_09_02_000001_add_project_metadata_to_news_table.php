<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->string('client_name')->nullable()->after('cover_image');
            $table->string('project_location')->nullable()->after('client_name');
            $table->unsignedSmallInteger('project_year')->nullable()->after('project_location');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->dropColumn(['client_name', 'project_location', 'project_year']);
        });
    }
};

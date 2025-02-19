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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('mobile')->unique();
            $table->string('email')->nullable();
            $table->string('password');
            $table->enum('role', ['admin', 'user'])->default('user');
            $table->string('sponsor_id', 50);
            $table->string('parent_sponsor_id', 50)->nullable();
            $table->decimal('wallet_balance', 10, 2)->default(0.00);
            $table->integer('country_id');
            $table->integer('state_id');
            $table->integer('pin_code');
            $table->string('address');
            $table->enum('title', ['Mr.', 'Miss.', 'Mrs.', 'M/S.'])->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->date('dob')->nullable();
            $table->string('image')->nullable();
            $table->string('fatherandmothername')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable(); // Soft delete (nullable)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

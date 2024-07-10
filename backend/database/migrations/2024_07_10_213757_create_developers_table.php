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
        Schema::create('developers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('levels_id');
            $table->foreign('levels_id')->references('id')->on(table:'levels')->onDelete('cascade');
            $table->string('nome',100);
            $table->char('sexo');
            $table->datetime('data_nascimento');
            $table->integer('idade');
            $table->string('hobby',100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('developers');
    }
};

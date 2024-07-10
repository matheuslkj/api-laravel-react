<?php

use App\Http\Controllers\api\v1\DevelopersController;
use App\Http\Controllers\api\v1\LevelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function(){
    Route::apiResource('developers', DevelopersController::class);
    Route::apiResource('levels', LevelController::class);
});
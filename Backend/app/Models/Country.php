<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    // Specify the table if it does not follow Laravel's naming conventions
    protected $table = 'countries';
    protected $fillable = ['name']; 
}
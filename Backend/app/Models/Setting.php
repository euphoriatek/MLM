<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;
    public $timestamps = false;
    // Specify the table if it does not follow Laravel's naming conventions
    protected $table = 'settings';
    protected $fillable = ['value'];
}
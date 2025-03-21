<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Otp extends Model
{
    use HasFactory;

    // Specify the table if it does not follow Laravel's naming conventions
    protected $table = 'otp';
    protected $fillable = ['otp', 'otp_expiry', 'is_verified']; 
}
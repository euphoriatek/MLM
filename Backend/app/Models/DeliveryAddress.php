<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 

class DeliveryAddress extends Model
{
    use HasFactory;
    protected $table = 'delievery_address';
    protected $fillable = ['name','email','user_id','phone_number', 'address', 'pin_code'];
}

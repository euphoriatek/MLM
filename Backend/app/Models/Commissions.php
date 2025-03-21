<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 
class Commissions extends Model
{
    use HasFactory;
    protected $table = 'commissions';
    protected $fillable = ['user_id','ammount', 'description'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    
}

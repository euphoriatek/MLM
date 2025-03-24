<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 
class Commissions extends Model
{
    use HasFactory;
    protected $table = 'commissions';
    protected $fillable = ['user_id','ammount','level','credit_by', 'description'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function creditby()
    {
        return $this->belongsTo(User::class, 'credit_by');
    }
}

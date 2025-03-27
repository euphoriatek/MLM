<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    use HasFactory;

    protected $table = 'payments';
    protected $fillable = [
        'r_payment_id',
        'method',
        'currency',
        'user_email',
        'amount',
        'json_response',
        'purchase_id',
        'user_id'
    ];
    public function user()
    {
        return $this->belongsTo(User::class,'user_id',ownerKey: 'id');
    }
}

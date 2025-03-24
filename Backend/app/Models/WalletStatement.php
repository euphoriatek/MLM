<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WalletStatement extends Model
{
    use HasFactory;
    protected $table = 'wallet_statement';
    protected $fillable = [
        'user_id', 
        'credit_by', 
        'remark',
        'type',
        'amount',
        'balance',
        'particulars'
    ];
}

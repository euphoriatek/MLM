<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Withdrawal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'price', 
        'status',
        'bank_name',
        'ifsc_code',
        'account_holder_name',
        'account_no',
        'branch_name',
        'net_payable_amount',
        'tds_amount',
        'tds_percentage'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 
class KycDetails extends Model
{
    use HasFactory;
    protected $table = 'kyc_details';
    protected $fillable = ['user_id','account_holder_name', 'ifsc_code', 'account_no', 'bank_name', 'branch_name','image'];
}

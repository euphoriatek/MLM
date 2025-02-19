<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 
class PanDetails extends Model
{
    use HasFactory;
    protected $table = 'pan_kyc_details';
     protected $fillable = ['user_id','tax_document', 'id_number', 'pan_image'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 
class Purchase extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'purchase';
    protected $fillable = ['name', 'user_id', 'product_id', 'price', 'size','email', 'phone_number', 'address', 'pin_code','status','order_id','razor_order_id'];
    public function invoice(){
        return $this->belongsTo(Invoice::class, 'id', 'purchase_id');
    }
}

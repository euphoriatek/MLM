<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 
class Invoice extends Model
{
    use HasFactory;
    protected $table = 'invoice';
    protected $fillable = ['invoice_number', 'customer_id', 'invoice_date', 'total_amount', 'client','waybill', 'purchase_id','gst_amount','subtotal','gst_rate'];
}

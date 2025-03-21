<?php
namespace App\Models;
use App\Models\AssigendServer;
use App\Models\Servers;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name',
        'mobile_no',
        'password',
        'email',
        'sponsor_id',
        'parent_sponsor_id',
        'wallet_balance',
        'country_id',
        'state_id',
        'pin_code',
        'address',
        'title',
        'gender',
        'dob',
        'image',
        'fatherandmothername',
        'is_active'
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'remember_token',
        'password'
    ];
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function hasRole($role)
    {
        return $this->role === $role;
    }
    public function sponsor()
    {
        return $this->belongsTo(User::class, 'parent_sponsor_id');
    }

    // For users who were sponsored by this user
    public function children()
    {
        return $this->hasMany(User::class, 'parent_sponsor_id');
    }
}
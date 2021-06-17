<?php

namespace App\Models;

use App\Tools;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InviteLink extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'code',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function used_by()
    {
        return $this->belongsTo(User::class, "used_by")->where("acitve", true);
    }

    public static function check($code)
    {
        return InviteLink::query()->where("code", $code)->where("valid", true)->exists();
    }

    public static function createLink($user_id)
    {

        return InviteLink::create([
            'user_id' => $user_id,
            'code' => Tools::randomCode(6, function ($input) {
                return !InviteLink::query()->where("code", $input)->exists();
            }),
        ]);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class UserOption extends Model
{

    protected $fillable = [
        "user_id",
        "key",
        "value",
    ];

    protected $casts = [
        'value' => "array",
    ];

    use HasFactory;

    public static function getOption($key, $default = null, $user = null)
    {
        if ($user == null) {
            $user = Auth::user()->id;
        }
        $value = UserOption::query()->where("user_id", $user)->where("key", $key)->first();
        return $value != null ? $value->value : $default;
    }

    public static function setOption($key, $value)
    {
        $option = UserOption::query()->firstOrNew([
            'key' => $key,
            'user_id' => Auth::user()->id,
        ]);
        $option->value = $value;
        $option->save();
        return $option->value;
    }

}

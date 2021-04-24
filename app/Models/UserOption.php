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

    use HasFactory;

    public static function getOption($key, $default = null)
    {
        $value = UserOption::query()->where("user_id", Auth::user()->id)->where("key", $key)->first();
        return $value != null ? $value->value : $default;
    }

    public static function setOption($key, $value)
    {
        $option = UserOption::query()->where("user_id", Auth::user()->id)->where("key", $key)->firstOrCreate([
            'key' => $key,
            'value' => $value,
            'user_id' => Auth::user()->id,
        ]);
        return $option->value;
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * App\Models\UserOption
 *
 * @property int $id
 * @property int $user_id
 * @property string $key
 * @property array $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|UserOption newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserOption newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserOption query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserOption whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserOption whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserOption whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserOption whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserOption whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserOption whereValue($value)
 * @mixin \Eloquent
 */
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

    public static $defaultPaymentOption = [
        'paypal' => [
            'email' => '',
            'enabled' => false,
        ],
        'zarinpal' => [
            'merchant_id' => '',
            'enabled' => false,
        ],
    ];

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

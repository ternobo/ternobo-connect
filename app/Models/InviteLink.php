<?php

namespace App\Models;

use App\Tools;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\InviteLink
 *
 * @property int $id
 * @property string $code
 * @property int|null $user_id
 * @property int $valid
 * @property \App\Models\User|null $used_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|InviteLink newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InviteLink newQuery()
 * @method static \Illuminate\Database\Query\Builder|InviteLink onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|InviteLink query()
 * @method static \Illuminate\Database\Eloquent\Builder|InviteLink whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InviteLink whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InviteLink whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InviteLink whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InviteLink whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InviteLink whereUsedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InviteLink whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InviteLink whereValid($value)
 * @method static \Illuminate\Database\Query\Builder|InviteLink withTrashed()
 * @method static \Illuminate\Database\Query\Builder|InviteLink withoutTrashed()
 * @mixin \Eloquent
 */
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
        return $this->belongsTo(User::class, "used_by");
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

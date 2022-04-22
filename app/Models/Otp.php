<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Otp
 *
 * @property int $id
 * @property string $identifier
 * @property string|null $token
 * @property string $verification_token
 * @property string $type
 * @property int|null $validity
 * @property int $valid
 * @property int $is_verified
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Otp newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Otp newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Otp query()
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereIdentifier($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereIsVerified($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereValid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereValidity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereVerificationToken($value)
 * @mixin \Eloquent
 */
class Otp extends Model
{
    protected $fillable = [
        'identifier', "token", "verification_token", "validity"
    ];
}

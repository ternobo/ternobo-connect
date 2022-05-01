<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\MonetizationRequest
 *
 * @property int $id
 * @property int $user_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|MonetizationRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MonetizationRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MonetizationRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|MonetizationRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MonetizationRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MonetizationRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MonetizationRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MonetizationRequest whereUserId($value)
 * @mixin \Eloquent
 */
class MonetizationRequest extends Model
{
    use HasFactory;

    public static string $status_accepted = "accepted";
    public static string $status_rejected = "rejected";
    public static string $status_waiting = "waiting";

    protected $fillable = [
        "user_id",
        "status",
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * App\Models\Connection
 *
 * @property int $id
 * @property int $user_id
 * @property int $connection_id
 * @property int $accepted
 * @property int $seen
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|Connection newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Connection newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Connection query()
 * @method static \Illuminate\Database\Eloquent\Builder|Connection whereAccepted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Connection whereConnectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Connection whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Connection whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Connection whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Connection whereSeen($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Connection whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Connection whereUserId($value)
 * @mixin \Eloquent
 */
class Connection extends Model
{

    public function connection()
    {
        return $this->belongsTo("App\Models\User", "connection_id")->where("id", "!=", Auth::user()->id);
    }

    public function user()
    {
        return $this->belongsTo("App\Models\User", "user_id")->where("id", "!=", Auth::user()->id);
    }

    public function toArray()
    {
        $data = parent::toArray();
        if (isset($data['user'])) {
            $data['user'] = $data['connection'] ? $data['connection'] : $data['user'];
        }
        return $data;
    }

}

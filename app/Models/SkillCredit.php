<?php

namespace App\Models;

use App\HasUser;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SkillCredit
 *
 * @property int $id
 * @property int $user_id
 * @property int $skill_id
 * @property int $level
 * @property string $reason
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Notification|null $notification
 * @property-read \App\Models\Skill|null $skill
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|SkillCredit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SkillCredit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SkillCredit query()
 * @method static \Illuminate\Database\Eloquent\Builder|SkillCredit whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SkillCredit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SkillCredit whereLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SkillCredit whereReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SkillCredit whereSkillId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SkillCredit whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SkillCredit whereUserId($value)
 * @mixin \Eloquent
 */
class SkillCredit extends Model
{
    use HasUser;

    public function user()
    {
        return $this->belongsTo("App\Models\User", "user_id");
    }

    public function skill()
    {
        return $this->belongsTo("App\Models\Skill", "skill_id");
    }

    public function notification()
    {
        return $this->hasOne(Notification::class, "connected_to")->where("action", "notification");
    }

    public function delete()
    {
        $this->notification()->delete();
        return parent::delete();
    }
}

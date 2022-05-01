<?php

namespace App\Models;

use App\HasUser;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * App\Models\Skill
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property int|null $sort_place
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SkillCredit[] $credits
 * @property-read int|null $credits_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Skill newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Skill newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Skill query()
 * @method static \Illuminate\Database\Eloquent\Builder|Skill whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Skill whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Skill whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Skill whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Skill whereSortPlace($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Skill whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Skill whereUserId($value)
 * @mixin \Eloquent
 */
class Skill extends Model
{
    use HasUser;

    public function user()
    {
        return $this->belongsTo("App\Models\User");
    }

    public function credits()
    {
        return $this->hasMany("App\Models\SkillCredit", "skill_id");
    }

    public function delete()
    {
        $this->credits()->delete();
        return parent::delete();
    }

    public function toArray()
    {
        $data = parent::toArray();
        $data['credit_text'] = $this->getCreditText();
        return $data;
    }

    public function getCreditText()
    {
        if (Auth::check()) {
            $self = false;
            $credits = $this->credits;
            $nums = count($credits);
            if ($nums > 2) {
                $first = $credits[0]->user;
                $second = $credits[1]->user;
                if (isset($first) && $first->id === Auth::user()->id) {
                    $first->name = __("tips.you");
                    $self = true;
                } elseif (isset($second) && $second->id === Auth::user()->id) {
                    $second->name = __("tips.you");
                    $self = true;
                }
                if ($self) {
                    $verb = trans_choice("user-profile.skill_credit_my_verb", $nums);
                } else {
                    $verb = trans_choice("user-profile.skill_credit", $nums);
                }

                return ['first' => $first, "second" => $second, 'verb' => $verb, "nums" => $nums];
            } elseif ($nums == 2) {
                $first = $credits[0]->user;
                $second = $credits[1]->user;
                if (isset($first) && $first->id === Auth::user()->id) {
                    $first->name = __("tips.you");
                    $self = true;
                } elseif (isset($second) && $second->id === Auth::user()->id) {
                    $second->name = __("tips.you");
                    $self = true;
                }
                if ($self) {
                    $verb = trans_choice("user-profile.skill_credit_my_verb", $nums);
                } else {
                    $verb = trans_choice("user-profile.skill_credit", $nums);
                }
                // dd($nums);
                return ['first' => $first, "second" => $second, 'verb' => $verb, "nums" => 2];
            } elseif ($nums > 0) {
                $first = $credits[0]->user;
                if (!isset($first)) {
                    return null;
                }
                if ($first->id === Auth::user()->id) {
                    $first->name = __("tips.you");
                    $self = true;
                }
                if ($self) {
                    $verb = trans_choice("user-profile.skill_credit_my_verb", $nums);
                } else {
                    $verb = trans_choice("user-profile.skill_credit", $nums);
                }
                return ['first' => $first, 'verb' => $verb, "nums" => $nums];
            }
        }

        return null;
    }
}

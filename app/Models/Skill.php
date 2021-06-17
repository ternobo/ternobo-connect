<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Skill extends Model
{

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
                if ($first->id === Auth::user()->id) {
                    $first->name = __("tips.you");
                    $self = true;
                } elseif ($second->id === Auth::user()->id) {
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
                if ($first->id === Auth::user()->id) {
                    $first->name = __("tips.you");
                    $self = true;
                } elseif ($second->id === Auth::user()->id) {
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Skill extends Model {

    public function user() {
        return $this->belongsTo("App\User");
    }

    public function credits() {
        return $this->hasMany("App\SkillCredit", "skill_id");
    }

    public function getCreditText() {
        $self = false;
        $credits = $this->credits;
        $nums = count($credits);
        if ($nums > 2) {
            $first = $credits[0]->user;
            $second = $credits[1]->user;
            if ($first->id === Auth::user()->id) {
                $first->name = "شما";
                $self = true;
            } elseif ($second->id === Auth::user()->id) {
                $second->name = "شما";
                $self = true;
            }
            $firstLink = "<a class='text-dark bold' href='" . url("/" . $first->username) . "'>$first->name</a>";
            $secondLink = "<a class='text-dark bold' href='" . url("/" . $second->username) . "'>$second->name</a>";
            if ($self) {
                $verb = "کرده اید";
            } else {
                $verb = "کرده اند";
            }
            return "$firstLink و $secondLink و $nums نفر دیگر این مهارت تایید $verb.";
        } elseif ($nums === 2) {
            $first = $credits[0]->user;
            $second = $credits[1]->user;
            if ($first->id === Auth::user()->id) {
                $first->name = "شما";
                $self = true;
            } elseif ($second->id === Auth::user()->id) {
                $second->name = "شما";
                $self = true;
            }
            if ($self) {
                $verb = "کرده اید";
            } else {
                $verb = "کرده اند";
            }
            $firstLink = "<a class='text-dark bold' href='" . url("/" . $first->username) . "'>$first->name</a>";
            $secondLink = "<a class='text-dark bold' href='" . url("/" . $second->username) . "'>$second->name</a>";
            return "$firstLink و $secondLink این مهارت را تایید $verb.";
        } elseif ($nums > 0) {
            $first = $credits[0]->user;

            if ($first->id === Auth::user()->id) {
                $first->name = "شما";
                $self = true;
            }
            $firstLink = "<a class='text-dark bold' href='" . url("/" . $first->username) . "'>$first->name</a>";
            if ($self) {
                $verb = "اید";
            } else {
                $verb = "است";
            }
            return "$firstLink این مهارت را تایید کرده $verb.";
        }
        return null;
    }

}

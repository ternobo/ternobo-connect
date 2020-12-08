<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Verification extends Model
{
    public function save(array $options = [])
    {
        Verification::query()->where("email", $this->email)->orWhere("phone", $this->phone)->delete();
        parent::save();
    }
}

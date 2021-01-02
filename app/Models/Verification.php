<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Verification extends Model
{
    use SoftDeletes;

    public function save(array $options = [])
    {
        Verification::query()->where("email", $this->email)->orWhere("phone", $this->phone)->delete();
        parent::save();
    }
}

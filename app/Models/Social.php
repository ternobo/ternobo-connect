<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Social extends Model {

    public static function setOption($key, $url, $page_id) {
        $social = new PageSocial();
        $social->option_id = $key;
        $social->page_id = $page_id;
        $social->url = $url;
        return $social->save();
    }

}

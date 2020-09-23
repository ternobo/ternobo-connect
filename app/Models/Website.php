<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Website extends Model {

    public static function setOption($key, $url, $page_id) {
        $social = Website::where("option_id", $key)->where("page_id", $page_id)->first();
        if ($url === null) {
            if ($social instanceof Website) {
                return $social->delete();
            } else {
                return true;
            }
        } else {
            if ($social instanceof Website) {
                $social->url = $url;
                return $social->save();
            } else {
                $social = new Website();
                $social->option_id = $key;
                $social->page_id = $page_id;
                $social->url = $url;
                return $social->save();
            }
        }
    }

}

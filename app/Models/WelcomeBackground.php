<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WelcomeBackground extends Model {

    public static function setBackground($url, $photographer = null, $date = null) {
        $bg = new WelcomeBackground();
        $bg->url = $url;
        $bg->photographer = $photographer;
        $bg->date = $date;
        
        $bg->save();
    }
    
    
    
}
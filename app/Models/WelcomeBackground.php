<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\WelcomeBackground
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|WelcomeBackground newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WelcomeBackground newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WelcomeBackground query()
 * @method static \Illuminate\Database\Eloquent\Builder|WelcomeBackground whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WelcomeBackground whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WelcomeBackground whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class WelcomeBackground extends Model {

    public static function setBackground($url, $photographer = null, $date = null) {
        $bg = new WelcomeBackground();
        $bg->url = $url;
        $bg->photographer = $photographer;
        $bg->date = $date;
        
        $bg->save();
    }
    
    
    
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Contact
 *
 * @property int $id
 * @property string $option_id
 * @property string $url
 * @property int $page_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ContactOption|null $option
 * @method static \Illuminate\Database\Eloquent\Builder|Contact newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact query()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereOptionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereUrl($value)
 * @mixin \Eloquent
 */
class Contact extends Model {

    /**
     * The related option id
     * @var integer
     */

    /**
     * contact value
     * @var string
     */

    /**
     * related page id
     * @var integer
     */

    /**
     * The related option
     * @var App\Option
     */

    public function option() {
        return $this->belongsTo("App\Models\ContactOption", "option_id");
    }

    /**
     * 
     * @param type $key contact key
     * @param type $url contact URL
     * @param type $page_id contact page_id
     * @return boolean
     */
    public static function setOption($key, $url, $page_id) {
        $contact = new Contact();
        $contact->option_id = $key;
        $contact->page_id = $page_id;
        $contact->url = $url;
        return $contact->save();
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

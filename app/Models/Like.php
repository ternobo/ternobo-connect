<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model {
    /**
     * Page that like the post
     * @var \App\Page
     */
    
    public function page() {
        return $this->belongsTo("App\Page");
    }

}

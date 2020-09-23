<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

/**
 * Description of Downloads
 *
 * @author soroosh
 */
class DownloadsController extends Controller {

    function profile($image) {
        $response = (Storage::download("profiles/$image"));
        ob_end_clean();
        return $response;
    }

    function media($image) {
        $response = (Storage::download("medias/$image"));
        ob_end_clean();
        return $response;
    }

    function nationalCards($image) {
        $response = (Storage::download("nationalcards/$image"));
        ob_end_clean();
        return $response;
    }

}

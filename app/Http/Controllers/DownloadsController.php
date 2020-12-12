<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

/**
 * Description of Downloads
 *
 * @author soroosh
 */
class DownloadsController extends Controller
{

    public function profile($image)
    {
        $response = (Storage::download("profiles/$image"));
        ob_end_clean();
        return $response;
    }

    public function media($image)
    {
        $response = (Storage::download("medias/$image"));
        ob_end_clean();
        return $response;
    }

    public function nationalCards($image)
    {
        $response = (Storage::download("nationalcards/$image"));
        ob_end_clean();
        return $response;
    }

    public function js($js)
    {
        dd(public_path("/js/$js"));
    }

}

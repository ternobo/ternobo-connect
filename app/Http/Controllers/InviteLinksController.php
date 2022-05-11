<?php

namespace App\Http\Controllers;

use App\Models\InviteLink;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

class InviteLinksController extends Controller
{
    public function index()
    {
        SEOTools::setTitle("Invitation Links");
        $invite_links = InviteLink::query()->with(["used_by"])->where("user_id", Auth::user()->id)->get();
        return TernoboWire::render("Invite", ['inviteLinks' => $invite_links]);
    }
}

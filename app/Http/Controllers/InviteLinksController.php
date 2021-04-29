<?php

namespace App\Http\Controllers;

use App\Models\InviteLink;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

class InviteLinksController extends Controller
{
    public function index()
    {
        $invite_links = InviteLink::query()->where("user_id", Auth::user()->id)->get();
        return TernoboWire::render("Invite", ['inviteLinks' => $invite_links]);
    }
}

<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommunityTagResource;
use App\Models\CommunityCategory;
use App\Models\CommunityTag;
use Illuminate\Http\Request;
use Ternobo\TernoboWire\TernoboWire;

class CommunityExploreController extends Controller
{
    public function index()
    {
        return TernoboWire::render("CommunityExplore", ['categories' => CommunityCategory::all()]);
    }

    public function get(Request $request)
    {
        $query =  CommunityTag::query();
        if ($request->filled("category")) {
            $query->whereRelation("communityCategory", "id", "=", $request->category);
        }
        return $this->generateResponse(true, CommunityTagResource::collection(
            $query->paginate(20)
        )->response()->getData());
    }
}

<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommunityTagResource;
use App\Models\CommunityCategory;
use Illuminate\Http\Request;
use Ternobo\TernoboWire\TernoboWire;

class CommunityExploreController extends Controller
{
    public function index()
    {
        return TernoboWire::render("CommunityExplore", ['categories' => CommunityCategory::all()]);
    }

    public function get($category)
    {
        $category = CommunityCategory::findOrFail($category);
        return $this->generateResponse(true, CommunityTagResource::collection($category->tags()->paginate(4))->response()->getData());
    }
}

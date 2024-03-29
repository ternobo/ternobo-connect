<?php

namespace App\Http\Controllers\HelpCenter;

use App\Http\Controllers\Controller;
use App\Models\HelpCategory;
use App\Models\HelpPost;

class HelpCenterController extends Controller
{
    public function index()
    {
        return view("helpcenter.index");
    }

    public function getCategories($parent = null)
    {
        $category = null;
        if ($parent !== null) {
            $category = HelpCategory::query()->with("children")->where("parent_id", $parent)->get();
        } else {
            $category = HelpCategory::query()->with("children")->whereNull("parent_id")->get();
        }
        return response()->json(["result" => true, "categories" => $category->toArray()]);
    }

    public function getPost($id)
    {
        $post = HelpPost::withRelations()->findOrFail($id);
        return response()->json(['result' => true, 'post' => $post]);
    }
}

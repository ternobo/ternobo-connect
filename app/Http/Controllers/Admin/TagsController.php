<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddTagRequest;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param $user
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags = Tag::query()->withCount("posts")->select(['name'])->paginate();
        return response()->json(["result" => true, "tags" => $tags]);
    }

    public function store(AddTagRequest $request)
    {
        $name = $request->name;
        $tag = Tag::create(['name' => $name]);
        return response()->json(['result' => $tag != null, "tag" => $tag]);
    }

    /**
     * Display a listing of the resource.
     *
     * @param $user
     * @return \Illuminate\Http\Response
     */
    public function destory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tags' => ['array'],
        ]);
        if ($validator->fails()) {
            return response()->json(['result' => false, 'errors' => $validator->errors()]);
        }
        $tags = $request->tags;
        foreach ($tags as $tag) {
            Tag::query()->where('name', $tag)->delete();
        }
        return response()->json([
            "result" => true,
        ]);
    }
}

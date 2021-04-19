<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        $tags = Tag::query()->select(['name'])->paginate();
        return response()->json(["result" => true, "tags" => $tags]);
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
            $posts = Post::query()->whereJsonContains("tags", $tag)
                ->get();
            foreach ($posts as $post) {
                $postTags = $post->tags;

                $index = array_search($tag, $postTags);
                if (!is_bool($index)) {
                    unset($postTags[$index]);
                }
                $post->tags = json_encode(array_values($postTags));
                $post->save();

            }
            Tag::query()->where('name', $tag)->delete();
        }
        return response()->json([
            "result" => true,
        ]);
    }

}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::query()
            ->with("user")
            ->with("share")
            ->with("page")
            ->with("category")
            ->get();
        return response()->json(['result' => true, "posts" => $posts]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        $post = $post
            ->with("user")
            ->with("share")
            ->with("page")
            ->with("category")
            ->get();
        return response()->json(['result' => true, "posts" => $post]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Post $post
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Post $post)
    {
        return response()->json(["result" => $post->delete()]);
    }
}

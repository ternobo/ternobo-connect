<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Post;

class SiteMapController extends Controller
{

    public function profiles()
    {
        $pages = Page::query()
            ->join("users", "users.id", "pages.user_id")
            ->where("users.active", true)
            ->get();
        $posts = Post::all();
        return response()->view('sitemaps.profiles', [
            'pages' => $pages,
            'posts' => $posts
        ])->header('Content-Type', 'application/xml');
    }

    public function all()
    {
        $pages = Page::query()
            ->join("users", "users.id", "pages.user_id")
            ->where("users.active", true)
            ->get();
        $posts = Post::all();
        return response()->view('sitemaps.profiles', [
            'pages' => $pages,
            'posts' => $posts
        ])->header('Content-Type', 'application/xml');
    }

    public function posts()
    {
        $posts = Post::where("type", "article")->get();
        return response()->view('sitemaps.posts', [
            'posts' => $posts,
        ])->header('Content-Type', 'application/xml');
    }

}

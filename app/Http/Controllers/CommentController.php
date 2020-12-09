<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Notification;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    public function index($post, Request $request)
    {
        $comments = Comment::query()
            ->with("mutualLikes")
            ->with("page")
            ->withCount("replies")
            ->whereNull("reply_to")
            ->where("post_id", $post)
            ->latest();
        if ($request->has("noload")) {
            $comments = $comments->where("id", "!=", $request->noload);
        }
        $comments = $comments->paginate(5);
        return response()->json(array("result" => true, "data" => $comments));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($post, Request $request)
    {
        $post = Post::findOrFail($post);
        $comment = new Comment();
        $comment->page_id = Auth::user()->getPage()->id;
        $recomment = null;
        $text = $request->text;
        if ($request->has("reply_to") && $request->reply_to !== null) {
            $recomment = Comment::query()->where("id", $request->reply_to)->firstOrFail();
            $comment->reply_to = $request->reply_to;
            if ($recomment->parent_id === null) {
                $comment->parent_id = $recomment->id;
            } else {
                $comment->parent_id = $recomment->parent_id;
            }
        }
        $comment->post_id = $post->id;
        $comment->text = $text;
        $comment->save();
        Auth::user()->getPage()->addAction("comment", $post->id, $comment->id);
        Notification::sendNotification("comment", $post->id, $post->page_id, $comment->id);

        if ($request->has("reply_to") && $request->reply_to !== null) {
            Notification::sendNotification("reply", $comment->reply_to, $recomment->page->id, $comment->id);
        }

        $comment->load("page");
        $comment->load("replyto.page");

        return response()->json(array("result" => true, "comment" => $comment));
    }

    public function replies($comment, Request $request)
    {
        $comments = Comment::query()
            ->with("mutualLikes")
            ->with("page")
            ->where("parent_id", $comment)
            ->with("replyto.page")
            ->latest()
            ->paginate(5);
        return response()->json(array("result" => true, "data" => $comments));
    }
    public function likeComment($comment_id)
    {
        $post = Comment::findOrFail($comment_id);
        $page = Auth::user()->getPage();
        $like = Like::query()->where("page_id", $page->id)->where("comment_id", $comment_id)->first();
        $result = false;
        $is_like = true;
        if ($like instanceof Like) {
            $result = $like->delete();
            $is_like = false;
        } else {
            $like = new Like();
            $like->page_id = $page->id;
            $like->comment_id = $comment_id;
            $result = $like->save();
            Notification::sendNotification("like_comment", $comment_id, $post->page_id, $like->id);
        }
        return response()->json(array("result" => $result, "like" => $is_like));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($post, $id)
    {
        $comment = Comment::where("page_id", Auth::user()->getPage()->id)->where("id", $id)->firstOrFail();
        $action = Action::query()->where("connected_to", $comment->id)->first();
        return response()->json(array("result" => $comment->delete() && $action->delete()));
    }

}

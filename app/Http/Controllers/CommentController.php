<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Notification;
use App\Models\Action;
use App\Models\Like;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller {

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $post = Post::findOrFail($request->post_id);
        $comment = new Comment();
        $comment->page_id = Auth::user()->getPage()->id;
        $recomment = null;
        if ($request->has("reply_to") && $request->reply_to !== null) {
            $recomment = Comment::query()->where("id", $request->reply_to)->firstOrFail();
            $comment->reply_to = $request->reply_to;
            if ($recomment->parent_id === null) {
                $comment->parent_id = $recomment->id;
            } else {
                $comment->parent_id = $recomment->parent_id;
            }
        }
        $comment->post_id = $request->post_id;
        $comment->text = $request->text;
        $comment->save();
        Auth::user()->getPage()->addAction("comment", $request->post_id, $comment->id);
        Notification::sendNotification("comment", $request->post_id, $post->page_id, $comment->id);

        if ($request->has("reply_to") && $request->reply_to !== null) {
            Notification::sendNotification("reply", $comment->reply_to, $recomment->page->id, $comment->id);
        }

        return response()->json(array("result" => true, "is_reply" => isset($comment->replyto->replyto), "html" => view("layouts.comment", array("comment" => $comment, "post_id" => $request->post_id, "user" => Auth::user()->getPage()))->render()));
    }

    public function loadMoreReplies($the_comment, Request $request) {
        $validator = Validator::make($request->all(), [
                    "page" => "required",
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $comments = Comment::query()->where("parent_id", $the_comment)->latest()->paginate(2);
            $comments_view = array();
            foreach ($comments as $comment) {
                $comments_view[] = view("layouts.comment", array("comment" => $comment, "user" => $comment->getUser(), "simple" => true, "post_id" => $request->post_id))->render();
            }
            return response()->json(array("result" => true, "nomore" => !$comments->hasMorePages(), "html" => implode("", $comments_view)));
        }
    }

    public function loadMore(Request $request) {
        $validator = Validator::make($request->all(), [
                    "page" => "required",
                    "post_id" => "required"
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => true, "errors"));
        } else {
            $comments = Comment::query()->whereNull("reply_to")->where("post_id", $request->post_id)->latest();
            if ($request->has("noload")) {
                $comments = $comments->where("id", "!=", $request->noload);
                //   dd($comments->toSql());
            }
            $comments = $comments->paginate(5);
            $comments_view = array();
            foreach ($comments as $comment) {
                if ($request->has("noload")) {
                    $comments_view[] = view("layouts.comment", array("noload" => $request->noload, "comment" => $comment, "user" => $comment->getUser(), "post_id" => $request->post_id))->render();
                    continue;
                }
                $comments_view[] = view("layouts.comment", array("comment" => $comment, "user" => $comment->getUser(), "post_id" => $request->post_id))->render();
            }
            return response()->json(array("result" => true, "total" => $comments->count(), "html" => implode("", $comments_view)));
        }
    }

    public function likeComment($comment_id) {
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
            Notification::sendNotification("like", $comment_id, $post->page_id, $like->id);
        }
        return response()->json(array("result" => $result, "like" => $is_like));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $comment = Comment::where("page_id", Auth::user()->getPage()->id)->where("id", $id)->firstOrFail();
        $action = Action::query()->where("connected_to", $comment->id)->first();
        return response()->json(array("result" => $comment->delete() && $action->delete()));
    }

}

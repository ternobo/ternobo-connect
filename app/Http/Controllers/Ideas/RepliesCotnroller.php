<?php

namespace App\Http\Controllers\Ideas;

use App\Http\Controllers\Controller;
use App\Models\Idea;
use App\Models\IdeaReply;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RepliesCotnroller extends Controller
{
    public function index($idea, Request $request)
    {
        $ideaReplies = IdeaReply::query()->with("user")->whereNull("reply_to")->where("idea_id", $idea)->latest();
        if ($request->has("noload")) {
            $ideaReplies = $ideaReplies->where("id", "!=", $request->noload);
        }
        $ideaReplies = $ideaReplies->paginate(5);
        return response()->json(array("result" => true, "data" => $ideaReplies));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($idea, Request $request)
    {
        $idea = Idea::findOrFail($idea);
        $ideaReply = new IdeaReply();
        $ideaReply->user_id = Auth::user()->id;
        $recomment = null;
        $text = $request->text;
        if ($request->has("reply_to") && $request->reply_to !== null) {
            $recomment = IdeaReply::query()->where("id", $request->reply_to)->firstOrFail();
            $ideaReply->reply_to = $request->reply_to;
            if ($recomment->parent_id === null) {
                $ideaReply->parent_id = $recomment->id;
            } else {
                $ideaReply->parent_id = $recomment->parent_id;
                $text = "<div><a class='text-action' href='" . $recomment->user->username . "'>@" . $recomment->user->username . "</a></div> " . $text;
            }
        }
        $ideaReply->idea_id = $idea->id;
        $ideaReply->text = $text;
        $ideaReply->save();

        $ideaReply->user = $ideaReply->user;

        return response()->json(array("result" => true, "reply" => $ideaReply));
    }

    public function replies($ideaReply, Request $request)
    {
        $ideaReplies = IdeaReply::query()->with("user")->where("parent_id", $ideaReply)->latest()->paginate(5);
        return response()->json(array("result" => true, "data" => $ideaReplies));
    }
    public function likeIdeaReply($ideaReply_id)
    {
        // dd($ideaReply_id);
        $idea = IdeaReply::findOrFail($ideaReply_id);
        $like = Like::query()->where("page_id", Auth::user()->personalPage->id)->where("idea_reply", $ideaReply_id)->first();
        $result = false;
        $is_like = true;
        if ($like instanceof Like) {
            $result = $like->delete();
            $is_like = false;
        } else {
            $like = new Like();
            $like->page_id = Auth::user()->personalPage->id;
            $like->idea_reply = $ideaReply_id;
            $result = $like->save();
        }
        return response()->json(array("result" => $result, "like" => $is_like));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($idea, $id)
    {
        $ideaReply = IdeaReply::where("user_id", Auth::user()->id)->where("id", $id)->firstOrFail();
        $action = Action::query()->where("connected_to", $ideaReply->id)->first();
        return response()->json(array("result" => $ideaReply->delete() && $action->delete()));
    }
}

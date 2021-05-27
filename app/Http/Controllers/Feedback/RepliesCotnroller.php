<?php

namespace App\Http\Controllers\Feedback;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Models\FeedbackReply;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RepliesCotnroller extends Controller
{
    public function index($feedback, Request $request)
    {
        $feedbackReplies = FeedbackReply::query()
            ->with(["user"])->withCount("replies")
            ->whereNull("reply_to")->where("feedback_id", $feedback)
            ->orderByRaw("pinned = 0, created_at DESC");
        if ($request->has("noload")) {
            $feedbackReplies = $feedbackReplies->where("id", "!=", $request->noload);
        }
        $feedbackReplies = $feedbackReplies->paginate(5);
        return response()->json(array("result" => true, "data" => $feedbackReplies));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($feedback, Request $request)
    {
        $feedback = Feedback::findOrFail($feedback);
        $feedbackReply = new FeedbackReply();
        $feedbackReply->user_id = Auth::user()->id;
        $recomment = null;
        $text = $request->text;
        if ($request->has("reply_to") && $request->reply_to !== null) {
            $recomment = FeedbackReply::query()->where("id", $request->reply_to)->firstOrFail();
            $feedbackReply->reply_to = $request->reply_to;
            if ($recomment->parent_id === null) {
                $feedbackReply->parent_id = $recomment->id;
            } else {
                $feedbackReply->parent_id = $recomment->parent_id;
                $text = "<div><a class='text-action' href='" . $recomment->user->username . "'>@" . $recomment->user->username . "</a></div> " . $text;
            }
        }
        $feedbackReply->feedback_id = $feedback->id;
        $feedbackReply->text = $text;
        $feedbackReply->save();

        $feedbackReply->load(['replyto', "replyto.user", "user"]);

        return response()->json(array("result" => true, "reply" => $feedbackReply));
    }

    public function replies($feedbackReply, Request $request)
    {
        $feedbackReplies = FeedbackReply::query()->with(["user", "replyto.user"])->where("parent_id", $feedbackReply)->latest()->paginate(5);
        return response()->json(array("result" => true, "data" => $feedbackReplies));
    }

    public function pinnReply($reply_id, Request $request)
    {
        $feedbackReply = FeedbackReply::query()->where("id", $reply_id)->first();
        FeedbackReply::query()->where("feedback_id", $feedbackReply->feedback_id)->whereNull("parent_id")->update(['pinned' => false]);
        return response()->json([
            "result" => $feedbackReply->update(['pinned' => $request->pin]),
        ]);
    }

    public function likeFeedbackReply($feedbackReply_id)
    {
        $feedback = FeedbackReply::findOrFail($feedbackReply_id);
        $like = Like::query()->where("page_id", Auth::user()->personalPage->id)->where("feedback_reply", $feedbackReply_id)->first();
        $result = false;
        $is_like = true;
        if ($like instanceof Like) {
            $result = $like->delete();
            $is_like = false;
        } else {
            $like = new Like();
            $like->page_id = Auth::user()->personalPage->id;
            $like->feedback_reply = $feedbackReply_id;
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
    public function destroy($feedback, $id)
    {
        $feedbackReply = FeedbackReply::where("user_id", Auth::user()->id)->where("id", $id)->firstOrFail();
        $action = Action::query()->where("connected_to", $feedbackReply->id)->first();
        return response()->json(array("result" => $feedbackReply->delete() && $action->delete()));
    }
}

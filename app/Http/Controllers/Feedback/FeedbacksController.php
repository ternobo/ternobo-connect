<?php

namespace App\Http\Controllers\Feedback;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangeFeedbackTypeRequest;
use App\Models\Feedback;
use App\Models\FeedbackBookmark;
use App\Models\FeedbackReply;
use App\Models\FeedbackVote;
use App\Models\Page;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;
use Ternobo\TernoboWire\TernoboWire;

class FeedbacksController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth");
    }

    /**
     * Display a listing of the resource.
     *
     * @return View
     */
    public function index(Request $request)
    {
        if ($request->has("onlyMy")) {
            return $this->myFeedbacks($request);
        }

        $mostFav = false;
        $status = "voting";
        if ($request->has("fav")) {
            $mostFav = true;
        }

        if ($request->has("status")) {
            $status = $request->status;
        }

        SEOTools::setTitle("بازخوردها");
        $feedbacks = null;
        if ($mostFav) {
            $feedbacks = Feedback::query()->with(["user"])
                ->selectRaw("*,(SELECT COUNT(*) as votes from feedback_votes where feedback_votes.feedback_id = feedbacks.id) as votes_num")
                ->where("status", $status)->orderByDesc("votes_num")
                ->paginate(5);
            $feedbacks->appends(array("fav" => "1"));
        } else {
            $feedbacks = Feedback::query()->with("votes")->with("user")->where("status", $status)->latest()->paginate(15);
        }
        return TernoboWire::render("Feedback/Index", ["feedbacks" => $feedbacks, "pages" => Page::getSuggestions()]);
    }

    public function myFeedbacks(Request $request)
    {
        $mostFav = false;
        $status = "voting";

        if ($request->has("fav")) {
            $mostFav = true;
        }

        SEOTools::setTitle("بازخوردها");
        $feedbacks = null;

        $feedbacks = Feedback::query()->with(["user", "votes"])
            ->selectRaw("*,(SELECT COUNT(*) as votes from feedback_votes where feedback_votes.feedback_id = feedbacks.id) as votes_num")
            ->where("user_id", Auth::user()->id);

        if ($mostFav) {
            $feedbacks = $feedbacks->orderByDesc("votes_num");
        } else {
            $feedbacks = $feedbacks->latest();
        }

        $contributed_feedbacks = Feedback::query()
            ->where(function ($query) {
                $query->whereHas("votes", function ($query) {
                    $query->where("user_id", Auth::user()->id);
                })->orWhereHas("replies", function ($query) {
                    $query->Where("user_id", Auth::user()->id);
                });
            })
            ->distinct("feedbacks.id")
            ->paginate(10);

        $bookmarks = FeedbackBookmark::query()->with("feedback")->where("user_id", Auth::user()->id)->get()->pluck("feedback");

        return TernoboWire::render("Feedback/Index", ["bookmarks" => $bookmarks, "contributed_feedbacks" => $contributed_feedbacks, "feedbacks" => $feedbacks->paginate(15), "myoffers" => true]);
    }

    public function voteFeedback(Request $request)
    {
        $feedback = Feedback::query()->findOrFail($request->feedback);
        if ($feedback->status !== "done" || $feedback->status !== "scheduled") {
            if (!FeedbackVote::query()->where("user_id", Auth::user()->id)->where("feedback_id", $feedback->id)->exists()) {
                $vote = new FeedbackVote();
                $vote->user_id = Auth::user()->id;
                $vote->feedback_id = $feedback->id;
                return response()->json(array("result" => $vote->save(), "vote" => true, "msg" => "رای شما با موفقیت ثبت شد"));
            } else {
                FeedbackVote::query()->where("user_id", Auth::user()->id)->where("feedback_id", $feedback->id)->first()->delete();
                return response()->json(array("result" => true, "vote" => false, "msg" => "رای شما با برداشته ثبت شد"));
            }
        }
        return abort(400);
    }

    public function bookmark(Request $request)
    {
        if (!$request->has("id")) {
            return abort(400);
        }
        $user = Auth::user();
        $feedback = Feedback::query()->findOrFail($request->id);
        if (!(FeedbackBookmark::query()->where("feedback_id", $feedback->id)->where("user_id", $user->id)->exists())) {
            $bookmark = new FeedbackBookmark();
            $bookmark->feedback_id = $feedback->id;
            $bookmark->user_id = Auth::user()->id;
            return response()->json(["result" => $bookmark->save(), "bookmark" => true]);
        } else {
            try {
                FeedbackBookmark::query()->where("feedback_id", $feedback->id)->where("user_id", $user->id)->firstOrFail()->delete();
            } catch (\Exception $e) {
                return abort(400);
            }
            return response()->json(["result" => true, "bookmark" => false]);
        }

    }

    public function changeType(ChangeFeedbackTypeRequest $request)
    {
        $type = $request->type;
        $feedback_id = $request->feedback_id;

        return response()->json([
            'result' => Feedback::query()->where('id', $feedback_id)->update(['status' => $type]),
        ]);
    }

    public function deleteComment($reply)
    {
        $reply = FeedbackReply::findOrFail($reply);
        if ($reply->user_id === Auth::user()->id) {
            $reply->delete();
            return response()->json(["result" => true]);
        }
        return abort(404);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $messages = [
            "title.required" => "عنوان اجباری است",
            "title.max" => "عنوان حداکثر می‌تواند ۱۰۰ کاراکتر باشد",
            "description.max" => "توضیحات حداکثر می‌تواند ۳۰۰۰ کاراکتر باشد",

        ];
        $validator = Validator::make($request->all(), [
            "title" => "required|max:100",
            "description" => "max:3000",
        ], $messages);
        if ($validator->fails()) {
            return response()->json(["result" => false, "errors" => $validator->errors()]);
        }
        $title = $request->title;
        $description = $request->description;
        $feedback = new Feedback();
        $feedback->title = $title;
        $feedback->status = "voting";
        $feedback->user_id = Auth::user()->id;
        $feedback->description = $description;
        $result = $feedback->save();
        return response()->json(array("result" => $result, "feedback" => $feedback));

    }

    public function addReply(Feedback $feedback, Request $request)
    {
        $messages = [
            "text.required" => "متن دیدگاه اجباری است",
            "text.max" => "متن دیدگاه حداکثر می‌تواند ۲۰۰۰ کاراکتر باشد",
        ];
        $validator = Validator::make($request->all(), [
            "text" => "required|max:3000",
        ], $messages);
        if ($validator->fails()) {
            return response()->json(["result" => false, "errors" => $validator->errors()]);
        }

        $reply = new FeedbackReply();
        $reply->feedback_id = $feedback->id;
        $reply->text = $request->text;
        $reply->user_id = Auth::user()->id;
        $reply->save();
        return response()->json(array("result" => true));
    }

    /**
     * Display the specified resource.
     *
     * @param Feedback $feedback
     * @return View
     */
    public function show(Feedback $feedback)
    {
        $replies = $feedback->replies()->paginate(10);
        return TernoboWire::render("Feedback/FeedbackPage", ["feedback" => $feedback, "replies" => $replies, "pages" => Page::getSuggestions()]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Feedback $feedback
     * @return Response
     */
    public function destroy(Feedback $feedback)
    {
        if (Auth::user()->id === $feedback->user_id) {
            $feedback->delete();
            return response()->json(array("result" => true));
        }
        return abort(404);
    }
}

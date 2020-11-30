<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use App\Models\IdeaBookmark;
use App\Models\IdeaReply;
use App\Models\IdeaVote;
use App\Models\Page;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;
use Inertia\Inertia;

class IdeasController extends Controller
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
        $mostFav = false;
        $status = "voting";
        if ($request->has("fav")) {
            $mostFav = true;
        }

        if ($request->has("status")) {
            $status = $request->status;
        }

        SEOTools::setTitle("ایده‌ها");
        $ideas = null;
        if ($mostFav) {
            $ideas = Idea::query()->with("user")
                ->selectRaw("*,(SELECT COUNT(*) as votes from idea_votes where idea_votes.idea_id = ideas.id) as votes_num")
                ->where("status", $status)->orderByDesc("votes_num")
                ->paginate(5);
            $ideas->appends(array("fav" => "1"));
        } else {
            $ideas = Idea::query()->with("votes")->with("user")->where("status", $status)->latest()->paginate(15);
        }
        return Inertia::render("Feedback/Index", ["ideas" => $ideas, "pages" => Page::getSuggestions()]);
    }

    public function myIdeas(Request $request)
    {
        $mostFav = false;
        $status = "voting";

        if ($request->has("fav")) {
            $mostFav = true;
        }

        SEOTools::setTitle("ایده‌ها");
        $ideas = null;
        if ($mostFav) {
            $ideas = Idea::query()->with("user")
                ->selectRaw("*,(SELECT COUNT(*) as votes from idea_votes where idea_votes.idea_id = ideas.id) as votes_num")
                ->orderByDesc("votes_num")
                ->where("user_id", Auth::user()->id)
                ->get();
            $ideas->appends(array("fav" => "1"));
        } else {
            $ideas = Idea::query()->with("votes")->with("user")
                ->where("user_id", Auth::user()->id)
                ->latest()
                ->get();
        }

        $contributed_ideas = Idea::query()
            ->where(function ($query) {
                $query->whereHas("votes", function ($query) {
                    $query->where("user_id", Auth::user()->id);
                })->orWhereHas("replies", function ($query) {
                    $query->Where("user_id", Auth::user()->id);
                });
            })
            ->where("status", "!=", "closed")
            ->distinct("ideas.id")
            ->paginate(10);

        $bookmarks = IdeaBookmark::query()->where("user_id", Auth::user()->id)->get();

        return view("ideas", ["bookmarks" => $bookmarks, "ideas" => $contributed_ideas, "my_ideas" => $ideas, "status" => $status, "myoffers" => true]);
    }

    public function voteIdea(Request $request)
    {
        $idea = Idea::query()->findOrFail($request->idea);
        if ($idea->status !== "done" || $idea->status !== "scheduled") {
            if (!IdeaVote::query()->where("user_id", Auth::user()->id)->where("idea_id", $idea->id)->exists()) {
                $vote = new IdeaVote();
                $vote->user_id = Auth::user()->id;
                $vote->idea_id = $idea->id;
                return response()->json(array("result" => $vote->save(), "vote" => true, "msg" => "رای شما با موفقیت ثبت شد"));
            } else {
                IdeaVote::query()->where("user_id", Auth::user()->id)->where("idea_id", $idea->id)->first()->delete();
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
        $idea = Idea::query()->findOrFail($request->id);
        if (!(IdeaBookmark::query()->where("idea_id", $idea->id)->where("user_id", $user->id)->exists())) {
            $bookmark = new IdeaBookmark();
            $bookmark->idea_id = $idea->id;
            $bookmark->user_id = Auth::user()->id;
            return response()->json(["result" => $bookmark->save(), "bookmark" => true]);
        } else {
            try {
                IdeaBookmark::query()->where("idea_id", $idea->id)->where("user_id", $user->id)->firstOrFail()->delete();
            } catch (\Exception $e) {
                return abort(400);
            }
            return response()->json(["result" => true, "bookmark" => false]);
        }

    }

    public function deleteComment($reply)
    {
        $reply = IdeaReply::findOrFail($reply);
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
        $idea = new Idea();
        $idea->title = $title;
        $idea->status = "voting";
        $idea->user_id = Auth::user()->id;
        $idea->description = $description;
        $result = $idea->save();
        return response()->json(array("result" => $result, "idea" => $idea));

    }

    public function addReply(Idea $idea, Request $request)
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

        $reply = new IdeaReply();
        $reply->idea_id = $idea->id;
        $reply->text = $request->text;
        $reply->user_id = Auth::user()->id;
        $reply->save();
        return response()->json(array("result" => true));
    }

    /**
     * Display the specified resource.
     *
     * @param Idea $idea
     * @return View
     */
    public function show(Idea $idea)
    {
        $replies = $idea->replies()->paginate(10);
        return Inertia::render("Feedback/IdeaPage", ["idea" => $idea, "replies" => $replies, "pages" => Page::getSuggestions()]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Idea $idea
     * @return Response
     */
    public function destroy(Idea $idea)
    {
        if (Auth::user()->id === $idea->user_id) {
            $idea->delete();
            return response()->json(array("result" => true));
        }
        return abort(404);
    }
}

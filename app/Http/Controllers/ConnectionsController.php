<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use App\Models\Following;
use App\Models\Notification;
use App\Models\Page;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConnectionsController extends Controller
{

    public function index(Request $request)
    {
        SEOTools::setTitle("شبکه من");
        $user = Auth::user();
        $accpeted_connections = Connection::query()
            ->whereRaw("(connection = '$user->id' or user_id = '$user->id')")
            ->where("accepted", true);

        //dd($accpeted_connections->toSql());
        $pending_connections = Connection::query()->where("user_id", Auth::user()->id)
            ->whereRaw("(user_id = '$user->id')")
            ->where("accepted", false)
            ->paginate(5);

        if ($request->has("q")) {
            $accpeted_connections = $accpeted_connections->whereHas("user", function ($query) use ($request) {
                $query->where("active", true)->where('name', 'like', "%{$request->q}%");
            });
        }

        Connection::query()->where("user_id", Auth::user()->id)
            ->where("seen", false)
            ->update(['seen' => true]);

        // counts
        $connections_count = count(Connection::query()->where("accepted", true)->whereRaw("(connection = '$user->id' or user_id = '$user->id')")->get());
        $followers_count = count(Following::query()->where("following", Auth::user()->id)->get());
        $following_count = count(Following::query()->where("user_id", Auth::user()->id)->get());

        return Inertia::render("MyConnections", [
            "connections" => $accpeted_connections->paginate(20), 
            "pending_connections" => $pending_connections,
            "connections_count" => $connections_count,
            "following_count" => $following_count,
             "followers_count" => $followers_count
            ]);
    }

    public function followings(Request $request)
    {
        $user = Auth::user();
        SEOTools::setTitle("کسانی که شما دنبال می‌کنید");
        $followings = Following::query()->where("user_id", Auth::user()->id);
        $pending_connections = Connection::query()->where("user_id", Auth::user()->id)
            ->where("accepted", false)
            ->paginate(5);

        if ($request->has("q")) {
            $followings = $followings->where("active", true)->whereRaw("users.name like '%$request->q%'");
        }

        // counts
        $connections_count = count(Connection::query()->where("accepted", true)->whereRaw("(connection = '$user->id' or user_id = '$user->id')")->get());
        $followers_count = count(Following::query()->where("following", Auth::user()->id)->get());
        $following_count = count(Following::query()->where("user_id", Auth::user()->id)->get());

        return Inertia::render("MyConnections",array("connections" => $followings->paginate(20), "pending_connections" => $pending_connections,
            "connections_count" => $connections_count,
            "following_count" => $following_count, "followers_count" => $followers_count));
    }

    public function followers(Request $request)
    {
        $user = Auth::user();
        SEOTools::setTitle("دنبال کنندگان");
        $followings = Following::query()->where("following", Auth::user()->id);

        if ($request->has("q")) {
            $followings = $followings->where("active", true)->whereRaw("users.name like '%$request->q%'");
        }

        $pending_connections = Connection::query()->where("user_id", Auth::user()->id)
            ->where("accepted", false)
            ->select(array("users.name", "users.profile", "users.cover", "users.short_bio", "connections.*"))
            ->paginate(5);

        // counts
        $connections_count = count(Connection::query()->where("accepted", true)->whereRaw("(connection = '$user->id' or user_id = '$user->id')")->get());
        $followers_count = count(Following::query()->where("following", Auth::user()->id)->get());
        $following_count = count(Following::query()->where("user_id", Auth::user()->id)->get());

        return Inertia::render("MyConnections", array("connections" => $followings->paginate(20), "pending_connections" => $pending_connections,
            "connections_count" => $connections_count,
            "following_count" => $following_count, "followers_count" => $followers_count));
    }

    public function follow($page_id)
    {
        $page = Page::findOrFail($page_id);
        $followRow = Following::query()->where("user_id", Auth::user()->id)->where("following", $page_id)->firstOrNew();
        $followRow->following = $page_id;
        $followRow->user_id = Auth::user()->id;
        $result = $followRow->save();
        return response()->json(array("result" => $result, "connection" => $followRow->id));
    }

    public function unfollow($page_id)
    {
        $page = Page::findOrFail($page_id);
        $followRow = Following::query()->where("user_id", Auth::user()->id)
            ->where(function ($query) use ($page_id) {
                $query->where("following", $page_id);
            })->firstOrFail();
        Notification::query()->where("connected_to", $followRow->id)->delete();
        $result = $followRow->delete();
        return response()->json(array("result" => $result, "user_id" => $followRow->following));
    }

    public function connectionRequest($user_id)
    {
        $connection = Connection::query()->where("user_id", Auth::user()->id)->where("connection", Auth::user()->id)->first();
        $connectionExist = ($connection instanceof Connection);
        if ($connectionExist) {
            return response()->json(array("result" => true, "connection" => $connection->id));
        }
        $followRow = Connection::query()->where("user_id", $user_id)->where("connection", Auth::user()->id)->firstOrNew();
        $followRow->user_id = $user_id;
        $followRow->connection = Auth::user()->id;
        $followRow->accepted = false;
        return response()->json(array("result" => $followRow->save(), "connection" => $followRow->id));
    }

    public function acceptRequest(Request $request)
    {
        $connection_id = $request->connection_id;
        $followRow = Connection::where("user_id", Auth::user()->id)->where("id", $connection_id)->firstOrFail();
        $followRow->accepted = true;
        return response()->json(array("result" => $followRow->save()));
    }

    public function removeConnectionRequest(Request $request)
    {
        $connection_id = $request->connection_id;
        $followRow = Connection::where("user_id", Auth::user()->id)->where("id", $connection_id)->firstOrFail();
        $result = $followRow->delete();
        return response()->json(array("result" => $result));
    }

    public function disconnect($user_id)
    {
        $followRow = Connection::query()
        ->where(function ($query) {
            $query->where("user_id", Auth::user()->id)->orWhere("connection", $user_id);
        })
        ->where(function ($query) {
            $query->where("user_id", $user_id)->orWhere("connection", Auth::user()->id);
        })
        ->firstOrFail();
        $result = $followRow->delete();
        return response()->json(array("result" => $result, "user_id" => $followRow->user_id));
    }

}

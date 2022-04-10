<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\CommunityTag;
use App\Models\Connection;
use App\Models\Following;
use App\Models\Notification;
use App\Models\Page;
use App\Ternobo;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

class ConnectionsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth')->only(['follow', 'unfollow']);
    }

    public function index(Request $request)
    {
        SEOTools::setTitle(__("seo.my-connections"));
        $user = Auth::user();
        $accpeted_connections = Connection::query()
            ->distinct()
            ->with("user")
            ->with("user.personalPage")
            ->with("user.personalPage.user")

            ->with("connection")
            ->with("connection.personalPage")
            ->with("connection.personalPage.user")

            ->whereHas("user", function ($query) {
                $query->where("active", true);
            })
            ->whereRaw("(connection_id = '$user->id' or user_id = '$user->id')")
            ->where("accepted", true)
            ->latest();

        $pending_connections = Connection::query()->where("user_id", Auth::user()->id)
            ->with("connection")
            ->whereRaw("(user_id = '$user->id')")
            ->where("accepted", false)
            ->paginate(4);

        if ($request->filled("q")) {
            $accpeted_connections = $accpeted_connections
                ->whereHas("user", function ($query) use ($request) {
                    $query->where('name', 'like', "%{$request->q}%");
                })
                ->orWhereHas("connection", function ($query) use ($request) {
                    $query->where('name', 'like', "%{$request->q}%");
                })
                ->paginate(20)
                ->appends("q", $request->q);
        } else {
            $accpeted_connections = $accpeted_connections->paginate(20);
        }

        Connection::query()->where("user_id", Auth::user()->id)
            ->where("seen", false)
            ->update(['seen' => true]);

        // counts
        $connections_count = count(Connection::query()->where("accepted", true)->whereRaw("(connection_id = '$user->id' or user_id = '$user->id')")->get());
        $followers_count = count(Following::query()->where("following", Ternobo::currentPage()->id)->get());
        $following_count = count(Following::query()->where("page_id", Ternobo::currentPage()->id)->get());

        return TernoboWire::render("MyConnections", [
            "connections" => $accpeted_connections,
            "pending_connections" => $pending_connections,
            "connections_count" => $connections_count,
            "following_count" => $following_count,
            "followers_count" => $followers_count,
        ]);
    }

    public function getConnections(Request $request)
    {
        $user = Auth::user();
        $connections = Connection::query()
            ->distinct()
            ->with("user")
            ->with("connection")
            ->whereRaw("(connection_id = '$user->id' or user_id = '$user->id')")
            ->where("accepted", true)
            ->latest();

        if ($request->filled("q")) {
            $connections = $connections
                ->where(function ($query) use ($request) {
                    $query->whereHas("user", function ($query) use ($request) {
                        $query->where('name', 'like', "%{$request->q}%");
                    })
                        ->orWhereHas("connection", function ($query) use ($request) {
                            $query->where('name', 'like', "%{$request->q}%");
                        });
                })
                ->paginate(20)
                ->appends("q", $request->q);
        } else {
            $connections = $connections->paginate(20);
        }

        return response()->json([
            "connections" => $connections,
        ]);
    }

    public function followings($page, Request $request)
    {
        $page = Page::query()->where("slug", $page)->firstOrFail();
        // dd($page);
        $followings = $page->followings()->whereHas("page");
        if ($request->filled("q")) {
            $followings = $followings->whereHas("page", function ($query) use ($request) {
                $query->where('name', 'like', "%$request->q%");
            })->paginate(20)->appends("q", $request->q)->toArray();
        } else {
            $followings = $followings->paginate()->toArray();
        }
        if (Auth::guest()) {
            unset($followings['total']);
        } elseif ($page->user_id != Auth::user()->id) {
            unset($followings['total']);
        }
        return response()->json(['result' => true, "connections" => $followings]);
    }

    public function followingTags($page, Request $request)
    {
        $page = Page::query()->where("slug", $page)->firstOrFail();
        $followings = Following::tags()->where("page_id", $page->id)->whereHas("tag")->where("type", "tag")->with("tag");

        if ($request->filled("q")) {
            $followings = $followings->whereHas("tag", function ($query) use ($request) {
                $query->where('name', 'like', "%$request->q%");
            })->paginate(5)->appends("q", $request->q)->toArray();
        } else {
            $followings = $followings->paginate(5)->toArray();
        }

        if (Auth::guest() || $page->user_id != Auth::user()->id) {
            unset($followings['total']);
        }


        $followings['data'] = collect($followings['data'])->map(function ($item) {
            $item['following']['tag'] = $item['following']['name'];
            $item['following']['is_community'] = false;
            $item['following']['is_followed'] = Ternobo::currentPage() ? Following::tags()->where("page_id", Ternobo::currentPage()->id)->where("following", $item['following_id'])->exists() : false;

            return $item;
        });

        return response()->json(['result' => true, "connections" => $followings]);
    }

    public function followers($page, Request $request)
    {
        $page = Page::query()->where("slug", $page)->firstOrFail();
        $followers = $page->followers();
        if ($request->filled("q")) {
            $followers = $followers->whereHas("follower", function ($query) use ($request) {
                $query->where('name', 'like', "%$request->q%");
            })->paginate(20)->appends("q", $request->q)->toArray();
        } else {
            $followers = $followers->whereHas("follower")->paginate()->toArray();
        }
        if (Auth::guest()) {
            unset($followers['total']);
        } elseif ($page->user_id != Auth::user()->id) {
            unset($followers['total']);
        }
        return response()->json(['result' => true, "connections" => $followers]);
    }

    public function follow($page_id, Request $request)
    {
        $page = Page::findOrFail($page_id);
        if ($page->isBlockedByMe()) {
            return abort(404);
        }
        $followRow = Following::query()->where("page_id", Ternobo::currentPage()->id)->where("following", $page_id)->firstOrNew();
        $followRow->following = $page_id;
        $followRow->page_id = Ternobo::currentPage()->id;
        $result = $followRow->save();

        Notification::sendNotification("follow", Auth::user()->id, $page->user_id, $followRow->id);

        return response()->json(array("result" => $result, "connection" => $followRow->id));
    }

    public function unfollow($page_id, Request $request)
    {
        $page = Page::findOrFail($page_id);
        $followRow = Following::query()->where("page_id", Ternobo::currentPage()->id)
            ->where(function ($query) use ($page_id) {
                $query->where("following", $page_id);
            })->firstOrFail();
        Notification::query()->where("connected_to", $followRow->id)->delete();
        $result = $followRow->delete();
        return response()->json(array("result" => $result, "user_id" => $followRow->following));
    }

    public function connectionRequest($user_id, Request $request)
    {
        $connection = Connection::query()->where("user_id", Auth::user()->id)->where("connection_id", Auth::user()->id)->first();
        $connectionExist = ($connection instanceof Connection);
        if ($connectionExist) {
            return response()->json(array("result" => true, "connection" => $connection->id));
        }
        $followRow = Connection::query()->where("user_id", $user_id)->where("connection_id", Auth::user()->id)->firstOrNew();
        $followRow->user_id = $user_id;
        $followRow->connection_id = Auth::user()->id;
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
            ->where(function ($query) use ($user_id) {
                $query->where("user_id", Auth::user()->id)->where("connection_id", $user_id);
            })
            ->orWhere(function ($query) use ($user_id) {
                $query->where("connection_id", Auth::user()->id)->where("user_id", $user_id);
            })
            ->firstOrFail();

        $result = $followRow->delete();
        return response()->json(array("result" => $result, "user_id" => $user_id));
    }
}

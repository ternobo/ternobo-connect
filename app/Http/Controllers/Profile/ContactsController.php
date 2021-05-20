<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\ConnectedAccount;
use App\Models\ContactData;
use App\Models\Page;
use App\Models\SocialDriver;
use App\Models\WebsiteOption;
use App\Rules\UsernameValidator;
use App\Rules\WebsiteURL;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ContactsController extends Controller
{
    public function getContactData($page)
    {
        $page = Page::findOrFail($page);
        $contacts = ContactData::query()
            ->where("page_id", $page->id)
            ->get();
        return response()->json(['result' => true, "contacts" => $contacts]);
    }

    public function getWebsiteOptions()
    {
        $options = WebsiteOption::all();
        return response()->json(['result' => true, "options" => $options]);
    }

    public function getSocialOptions($page_id)
    {
        $user_id = Page::findOrFail($page_id)->user_id;
        $options = SocialDriver::with(['account' => function ($query) use ($user_id) {
            $query->where("user_id", $user_id);
        }])
            ->leftJoin("connected_accounts", "social_drivers.driver", "connected_accounts.driver")
            ->select("social_drivers.*")
            ->where("active", true)
            ->orderBy("connected_accounts.created_at", "DESC")
            ->get();
        return response()->json(['result' => true, "options" => $options]);
    }

    public function saveData(Request $request)
    {
        if (!$request->filled("contacts")) {
            return abort(400);
        }
        $page = Auth::user()->personalPage;
        $socialOptions = SocialDriver::all()->pluck("driver");
        $validator = Validator::make($request->contacts, [
            "slug" => [new UsernameValidator($page->slug), "required"],
            "socials" => ['array'],
            "socials.driver" => [Rule::in($socialOptions)],
            "websites" => ['array'],
            "websites.url" => ['nullable', new WebsiteURL()],
        ]);
        if ($validator->fails()) {
            return response()->json(['result' => false, 'errors' => $validator->errors()]);
        }
        $websiteOptions = WebsiteOption::all()->pluck("name");

        $contact = ContactData::query()->where("page_id", $page->id)->firstOrNew();
        $contact->page_id = $page->id;
        $contact->data = json_encode($request->contacts);

        $socials = $request->contacts["socials"];
        // dd($socials);
        foreach ($socials as $social) {
            $social = (object) $social;
            if ($social->account == null) {
                ConnectedAccount::query()->where("user_id", Auth::user()->id)->where("driver", $social->driver)->delete();
            }
        }

        $redirectTo = null;

        if ($page->slug != $request->contacts['slug']) {
            $page->slug = $request->contacts['slug'];
            $page->user->username = $request->contacts['slug'];
            $slug = $request->contacts['slug'];
            $redirectTo = "/$slug";
        }

        $contact->save();
        $page->save();

        return response()->json(["result" => true, "redirectTo" => $redirectTo]);
    }
}

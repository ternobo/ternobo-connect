<?php

namespace App\Http\Controllers;

use App\Models\ConnectedAccount;
use App\Models\ContactData;
use App\Models\ContactOption;
use App\Models\Page;
use App\Models\WebsiteOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    public function getContactOptions()
    {
        $options = ContactOption::all();
        return response()->json(['result' => true, "options" => $options]);
    }

    public function getWebsiteOptions()
    {
        $options = WebsiteOption::all();
        return response()->json(['result' => true, "options" => $options]);
    }

    public function getSocialOptions()
    {
        $options = ConnectedAccount::query()->where("user_id", Auth::user()->id)->select("driver", "meta")->pluck("meta", "driver");
        return response()->json(['result' => true, "options" => $options]);
    }

    public function saveData(Request $request)
    {
        $page = Auth::user()->personalPage;
        $contact = ContactData::query()->where("page_id", $page->id)->firstOrNew();
        $contact->page_id = $page->id;
        $contact->data = json_encode($request->contacts);

        if (!isset($request->socials->google)) {
            ConnectedAccount::query()->where("user_id", Auth::user()->id)->where("driver", "google")->delete();
        }

        $page->slug = $request->contacts['slug'];

        $contact->save();
        $page->save();

        return response()->json(["result" => true]);
    }
}

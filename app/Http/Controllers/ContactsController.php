<?php

namespace App\Http\Controllers;

use App\Models\ContactData;
use App\Models\ContactOption;
use App\Models\Page;
use App\Models\Social;
use App\Models\WebsiteOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

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
        $options = Social::all();
        return response()->json(['result' => true, "options" => $options]);
    }

    public function saveData(Request $request)
    {
        $page = Auth::user()->personalPage;
        $contact = ContactData::query()->where("page_id", $page->id)->firstOrNew();
        $contact->page_id = $page->id;
        $contact->data = json_encode($request->contacts);

        $page->slug = $request->contacts['slug'];

        $contact->save();
        $page->save();

        return response()->json(["result" => true]);
    }
}

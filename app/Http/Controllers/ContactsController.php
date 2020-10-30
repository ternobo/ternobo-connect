<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\ContactOption;
use App\Models\Page;
use App\Models\Social;
use App\Models\WebsiteOption;

class ContactsController extends Controller
{
    public function getContactData($page)
    {
        $page = Page::findOrFail($page);
        $contacts = Contact::with("option")
            ->where("page_id", $page->id)
            ->get();
        return response()->json(['result' => true, "contacts" => $contacts]);
    }
    public function getContactOptions()
    {
        $options = ContactOption::all();
        return response()->json(['result' => true, "options" => $options]);
    }

    public function getWebsiteOptions(){
        $options = WebsiteOption::all();
        return response()->json(['result' => true, "options" => $options]);
    }

    public function getSocialOptions(){
        $options = Social::all();
        return response()->json(['result' => true, "options" => $options]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactOption;
use App\Models\Social;
use App\Models\WebsiteOption;

class ComponentController extends Controller {

    public function contact(Request $request) {
        $option = ContactOption::where("id", $request->type)->first();
        return view("layouts.components.contact-option", array("index" => $request->index, "option_id" => $option->id, "name" => $option->name, "pattern" => $option->pattern, "icon" => $option->icon));
    }

    public function social(Request $request) {
        $option = Social::where("id", $request->type)->first();
        return view("layouts.components.contact-option", array("index" => $request->index, "option_id" => $option->id, "name" => $option->name, "pattern" => $option->pattern, "icon" => $option->icon));
    }

    public function website(Request $request) {
        return view("layouts.components.website-option", array("index" => $request->index));
    }

}

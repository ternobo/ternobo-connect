<?php

namespace App\Http\Controllers\Skills;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SkillController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|max:100",
        ], [], ["name" => __("validation.attributes.skill-name")]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        }
        $user = Auth::user();
        $skill = new Skill();
        $skill->name = $request->name;
        $skill->user_id = $user->id;
        return response()->json(array("result" => $skill->save()));
    }

    public function sort(Request $request, $skill)
    {
        $validator = Validator::make($request->all(), [
            "order" => "required",
        ], ["orders.required" => "موقعیت اجباری است."]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $skill = Skill::query()->where("id", $skill)->where("user_id", Auth::user()->personalPage->id)->firstOrFail();
            $skill->sort_place = $request->order;
            return response()->json(array("result" => $skill->save()));
        }
    }

    public function search(Request $request)
    {
        if ($request->has("q") && $request->q !== "") {
            $search = $request->q;
            $result = array();
            $suggestions = Skill::query()->whereRaw("name like ?", ["%$search%"])->limit(10)->get("name")->pluck("name");
            return response()->json(["result" => true, "suggestions" => $suggestions]);
        }
    }

    public function skillEndorsements(Request $request)
    {
        $skill = Skill::find($request->skill);
        return view("layouts.components.skill-endorsement", array("skill" => $skill));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Skill  $skill
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Skill $skill)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|max:100",
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        }
        $user = Auth::user();
        if ($user->id === $skill->user->id) {
            $skill->name = $request->name;
            return response()->json(array("result" => $skill->save()));
        }
        return abort(403);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Skill  $skill
     * @return \Illuminate\Http\Response
     */
    public function destroy(Skill $skill)
    {
        $user = Auth::user();
        if ($user->id === $skill->user->id) {
            return response()->json(array("result" => $skill->delete()));
        }
        return abort(403);
    }
}

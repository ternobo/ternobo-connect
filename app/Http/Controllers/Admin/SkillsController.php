<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SkillsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param $user
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $skills = Skill::query()->selectRaw("name ,count(name) as user_count")->groupBy("name")->paginate();
        return response()->json(["result" => true, "skills" => $skills]);
    }

    /**
     * Display a listing of the resource.
     *
     * @param $user
     * @return \Illuminate\Http\Response
     */
    public function destory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'skills' => ['array'],
        ]);
        if ($validator->fails()) {
            return response()->json(['result' => false, 'errors' => $validator->errors()]);
        }
        $skills = $request->skills;
        return response()->json(["result" => Skill::query()->whereIn("name", $skills)->delete() != 0]);
    }

}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param $user
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $skills = Skill::query()->distinct("")->paginate();
        return response()->json(["result" => true, "skills" => $skills]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Skill $skill
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy($user, Skill $skill)
    {
        return response()->json(["result" => $skill->delete()]);
    }
}

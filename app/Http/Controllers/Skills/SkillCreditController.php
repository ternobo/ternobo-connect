<?php

namespace App\Http\Controllers\Skills;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\Skill;
use App\Models\SkillCredit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SkillCreditController extends Controller
{

    public function index($skill)
    {
        $credits = SkillCredit::query()->with('user')->where("skill_id", $skill)->paginate(20);
        return response()->json(['result' => true, "credits" => $credits]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "skill" => "required|exists:skills,id",
            "level" => "required|digits_between:1,3",
            "reason" => "required|string",
        ], [
            'level.required' => 'سطح مهارت اجباری است.',
            'reason.required' => 'یک دلیل برای تاییدیه خود انتخاب کنید.',
            'reason.string' => 'ورودی نامعتبر',

        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        }
        if (SkillCredit::where("user_id", Auth::user()->id)->where("skill_id", $request->skill) instanceof SkillCredit) {
            return response()->json(array("result" => false, "errors" => array("Bad Request")))->setStatusCode(400);
        }
        $credit = new SkillCredit();
        $credit->user_id = Auth::user()->id;
        $credit->skill_id = $request->skill;
        $credit->level = $request->level;
        $credit->reason = $request->reason;
        $result = $credit->save();
        Notification::sendNotification("skill_credit", $credit->skill->id, $credit->skill->user->personalPage->id, $credit->id);
        return response()->json(array("result" => $result));
    }

    public function checkCredit(Request $request)
    {
        $skill = Skill::findOrFail($request->skill);
        $credit_nums = $skill->loadCount("credits");
        return response()->json([
            "canCredit" => Auth::check() ? !Auth::user()->isCredit($request->skill) : false,
            'credits_count' => $credit_nums->credits_count,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SkillCredit  $skillCredit
     * @return \Illuminate\Http\Response
     */
    public function destroy($skill_id)
    {
        $user = Auth::user();
        $skillCredit = SkillCredit::where("skill_id", $skill_id)->where("user_id", $user->id)->first();
        if ($skillCredit instanceof SkillCredit) {
            Notification::query()->where("connected_to", $skillCredit->id)->delete();
            return response()->json(array("result" => $skillCredit->delete()));
        }
        return abort(403);
    }

}

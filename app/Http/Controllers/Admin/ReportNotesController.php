<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\ReportNote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReportNotesController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($report, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => ['required'],
        ]);
        if ($validator->fails()) {
            return response()->json(['result' => false, 'errors' => $validator->errors()]);
        }
        $note = new ReportNote();
        $note->user_id = Auth::user()->id;
        $note->report_id = $report;
        $note->content = $request->content;
        $result = $note->save();
        return response()->json(['result' => $result, "note" => $note]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ReportNote  $reportNote
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ReportNote $reportNote)
    {
        $validator = Validator::make($request->all(), [
            'content' => ['required'],
        ]);
        return response()->json(['result' => $reportNote->update($request->all())]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ReportNote  $reportNote
     * @return \Illuminate\Http\Response
     */
    public function destroy($report, $reportNote)
    {
        return response()->json(['result' => ReportNote::query()->where("id", $reportNote)->where("user_id", Auth::user()->id)->delete() != 1 ? false : true]);
    }
}

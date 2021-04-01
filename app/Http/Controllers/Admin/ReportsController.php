<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ReportsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reports = Report::query()
            ->whereHas("reportable")
            ->with(["reportable", "reportable.page", "adminNotes", "adminNotes.user"])
            ->with("reportedBy")
            ->latest()
            ->paginate();
        return response()->json(['result' => true, 'data' => $reports]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Report $report)
    {
        $validator = Validator::make($request->all(), [
            'status' => [Rule::in(['pending', 'closed'])],
        ]);
        if ($validator->fails()) {
            return response()->json(['result' => false, 'errors' => $validator->errors()]);
        }
        $result = $report->update($request->all());
        return response()->json([
            'result' => $result,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function destroy(Report $report)
    {
        return response()->json(['result' => $report->delete()]);
    }
}

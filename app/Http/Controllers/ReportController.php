<?php

namespace App\Http\Controllers;

use App\Models\ReportOption;

class ReportController extends Controller
{
    public function getReportOptions()
    {
        return response()->json(['result' => true, 'options' => ReportOption::query()->with(['subreasons'])->where("parent", '-1')->get()]);
    }
}

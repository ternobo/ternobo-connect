<?php

namespace App\Http\Controllers\Poll;

use App\Http\Controllers\Controller;
use App\Services\Poll\PollService;
use Illuminate\Http\Request;

class PollController extends Controller
{

    private PollService $service;

    public function __construct(PollService $service)
    {
        $this->service = $service;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(['data' => $this->service->findById($id), "result" => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $poll = $this->service->findById($id);
        if (Auth::user()->id == $poll->user_id) {
            return response()->json($this->service->deletePoll($id));
        }
        return abort(404);
    }
}

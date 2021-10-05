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
        $this->service->findById($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->service->deletePoll($id);
    }
}

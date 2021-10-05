<?php

namespace App\Services\Poll;

use App\Services\Poll\PollModel;
use App\Services\ServiceAccess;

class PollService extends ServiceAccess
{

    public function __construct()
    {
        parent::__construct();
        $this->isAuthrequired = false;
    }

    /**
     * Return Service name
     */
    public function getServiceName(): string
    {
        return "api/v1/polls";
    }

    /**
     * Return Poll Options 
     * 
     * @param int $id Poll Id 
     */
    public function getPollOptions($id)
    {
        $response = $this->createRequest()->get($id . "/options");
        abort_unless($response->ok(), 503);
        return $response->json();
    }

    /**
     * Find Poll
     * 
     * @param int $id Poll Id 
     * 
     * @return PollModel
     */
    public function findById($id)
    {
        $response = $this->createRequest()->get($id);
        abort_unless($response->ok(), 503);
        $object = $response->json();
        if (!$object['status']) {
            abort(404);
        }
        return PollModel::fromArray($object['result']);
    }

    /**
     * Create Poll
     * 
     * @param PollModel $model model to presist
     * 
     * @return PollModel
     */
    public function createPoll(PollModel $model): PollModel
    {
        $response = $this->createRequest()->withBody(json_encode($model->toArray()), "application/json")->post("/");
        abort_unless($response->ok(), 503);
        $object = $response->json();
        if (!$object['status']) {
            abort(404);
        }
        return PollModel::fromArray($object['result']);
    }

    /**
     * Vote Poll Option
     */
    public function vote($option_id, $poll_id)
    {
        $response = $this->createRequest()->post("$poll_id/$option_id/vote");
        abort_unless($response->ok(), 503);
        return $response->json();
    }
}

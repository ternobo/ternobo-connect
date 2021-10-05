<?php

namespace App\Services\Poll;

use App\Services\FromArrayTrait;
use JsonSerializable;

class PollModel implements JsonSerializable
{
    use FromArrayTrait;

    public $id;
    public $userId;
    public $question;
    public $options;

    public $createdAt;
    public $updatedAt;
    public $expiredAt;

    public function __construct($userId = null, $question = null, $options = null, $expiredAt = null)
    {
        $this->userId = $userId;
        $this->question = $question;
        $this->options = $options;
        $this->updatedAt = null;
        $this->expiredAt = $expiredAt;
    }

    public function jsonSerialize()
    {
        return $this->toArray();
    }

    public function toArray()
    {
        $data = get_object_vars($this);
        unset($data['id']);
        return $data;
    }
}

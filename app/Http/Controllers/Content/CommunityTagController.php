<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Services\Content\CommunityTagService;
use Illuminate\Http\Request;

class CommunityTagController extends Controller
{
    private CommunityTagService $service;

    public function __construct(CommunityTagService $service)
    {
        $this->service = $service;
    }

    public function getHashtagTopUsers($tag)
    {
        return $this->generateResponse(true, $this->service->getHashtagTopUsers($tag));
    }

    public function getRelatedTags($tag)
    {
        return $this->generateResponse(true, $this->service->getRelatedTags($tag)['data']);
    }
}

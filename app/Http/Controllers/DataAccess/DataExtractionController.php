<?php

namespace App\Http\Controllers\DataAccess;

use App\Http\Controllers\Controller;
use App\Http\Resources\DataExtractionResponse;
use App\Http\Resources\PostDataAccess;
use App\Services\DataExtraction\DataExtractionService;
use Illuminate\Http\Request;

class DataExtractionController extends Controller
{
    private DataExtractionService $service;

    public function __construct(DataExtractionService $service)
    {
        $this->service = $service;
    }

    public function getAllPosts()
    {
        return $this->generateResponse(true, PostDataAccess::collection($this->service->getAllPosts()));
    }

    public function getTags()
    {
        return $this->generateResponse(true, $this->service->getAllTags());
    }

    public function getPostsByTag($tag)
    {
        return $this->generateResponse(true, $this->service->getPostsByHashtag($tag));
    }
}

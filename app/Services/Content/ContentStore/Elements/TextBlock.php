<?php

namespace App\Services\Content\ContentStore\Elements;

trait TextBlock
{
    public function getContentMentions($content)
    {
        try {
            if ($content['type'] == "doc") {
                return collect($content['content'][0]['content'])->filter(fn ($block) => $block['type'] == "mention")
                    ->map(fn ($block) => $block['id'])->toArray();
            }
        } catch (\Throwable $th) {
            report($th);
        }
        return [];
    }
}

<?php

namespace App\Services\Content\ContentStore;

use App\Models\Post;
use App\Models\PostBlock;
use App\Services\Content\ContentStore\Elements\TextBlock;
use App\Services\Poll\PollModel;
use App\Services\RestfulService;
use App\Services\Poll\PollService;
use App\Services\UploaderService;
use App\SocialMediaTools;
use App\Utils\StringUtils;
use Illuminate\Http\UploadedFile;
use SebastianBergmann\CodeUnit\FunctionUnit;

class ContentStoreService extends RestfulService
{
    use TextBlock;

    private PollService $pollService;
    private UploaderService $uploaderService;
    public function __construct(PollService $pollService, UploaderService $uploaderService)
    {
        $this->pollService = $pollService;
        $this->uploaderService = $uploaderService;
    }

    public function generateSlug()
    {
        return StringUtils::randomCode(8, fn ($code) => !Post::query()->where("slug", $code)->exists());
    }

    public function setContent(Post $post, $blocks, $fileOnly = false)
    {
        $slug = $this->generateSlug();
        $post->slug = $slug;

        $post->save();
        $mentions = [];
        foreach ($blocks as $block) {
            $sort = (int)$block['sort'];
            $content = $block['content'];
            $type = $block['type'];
            $meta = $block['meta'] ?? [];

            switch ($type) {
                case "horizontalRule":
                    $post->blocks()->create([
                        'page_id' => $post->page_id,
                        'sort' => $sort,
                        'content' => "",
                        'type' => $type,
                        "meta" => $meta,
                    ]);
                    break;
                case "quote":
                case "text":
                    // Process
                    array_push($mentions, $this->getContentMentions($content));
                    $post->blocks()->create([
                        'page_id' => $post->page_id,
                        'sort' => $sort,
                        'content' => $content,
                        'type' => $type,
                        "meta" => $meta,
                    ]);
                    break;

                case "heading1":
                case "heading2":
                case "heading3":
                    $post->blocks()->create([
                        'page_id' => $post->page_id,
                        'sort' => $sort,
                        'content' => $content,
                        'type' => $type,
                        "meta" => $meta,
                    ]);
                    break;
                case "orderedList":
                case "bulletedList":
                    $post->blocks()->create([
                        'page_id' => $post->page_id,
                        'sort' => $sort,
                        'content' => json_encode($content),
                        'type' => $type,
                        "meta" => $meta,
                    ]);
                    break;
                case "image":
                    $media = $content instanceof UploadedFile | $fileOnly ? SocialMediaTools::uploadPostImage($content, 90, $meta) : $content;
                    $post->blocks()->create([
                        'page_id' => $post->page_id,
                        'sort' => $sort,
                        'content' =>  $content instanceof UploadedFile ? $media['content'] : $content,
                        'type' => 'image',
                        'meta' => $content instanceof UploadedFile ? $media['meta'] : null,
                    ]);
                    break;
                case "video":
                    $media = $content instanceof UploadedFile | $fileOnly ? $this->uploaderService->uploadFile($content) : $content;
                    $post->blocks()->create([
                        'page_id' => $post->page_id,
                        'sort' => $sort,
                        'content' => $media,
                        'type' => 'video',
                        "meta" => $meta,
                    ]);
                    break;

                case "code":
                    $post->blocks()->create([
                        'page_id' => $post->page_id,
                        'sort' => $sort,
                        'content' => json_encode(['language' => $content['language'], "code" => $content['code']]),
                        'type' => 'code',
                        "meta" => $meta,
                    ]);
                    break;
                case "embed":
                    $post->blocks()->create([
                        'page_id' => $post->page_id,
                        'sort' => $sort,
                        'content' => $content,
                        'type' => 'embed',
                        "meta" => $meta,
                    ]);
                    break;
                case "poll":
                    $poll = null;
                    if (isset($meta['poll_id'])) {
                        $poll = $this->pollService->findById($meta['poll_id']);
                    } else {
                        $poll = $this->pollService->createPoll(
                            PollModel::fromArray($content)
                        );
                    }

                    $post->blocks()->create([
                        'page_id' => $post->page_id,
                        'sort' => $sort,
                        'content' => json_encode($poll),
                        'type' => 'poll',
                        "meta" => $meta,
                    ]);
                    break;
            }
        }
        return $mentions;
    }
}

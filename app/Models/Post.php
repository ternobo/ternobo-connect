<?php

namespace App\Models;

use App\HasPage;
use App\ImageTools;
use App\Scopes\BlockedPageContentScope;
use App\Scopes\PostDraftScope;
use App\Scopes\ReportedPostScope;
use App\Services\Poll\PollModel;
use App\Services\Poll\PollService;
use App\SocialMediaTools;
use App\Ternobo;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use PHPHtmlParser\Dom;

/**
 * @property mixed|string slug
 */
class Post extends Model
{

    use SoftDeletes;

    use HasPage;

    use HasFactory;

    protected $dates = ['deleted_at'];

    protected $guarded = ['id', "page_id"];

    protected $casts = [
        "media" => 'array',
        "can_tip" => "boolean",
        "visible" => "boolean"
    ];

    protected $fillable = [
        'user_id',
        'page_id',
        'title',
        'type',
        'category_id',
        'media',
        "show",
        "can_tip",
    ];

    protected $with = ['tags'];

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function withRelations(): \Illuminate\Database\Eloquent\Builder
    {
        return self::with(["page", 'likes', 'mutualLikes', 'category', 'slides', "slides.content"]);
    }

    public function loadRelations()
    {
        return $this->load(["page", 'likes', 'mutualLikes', 'category', 'slides', "slides.content"]);
    }


    public static function scriptStripper($input)
    {
        return preg_replace('#<script(.*?)>(.*?)</script>#is', '', $input);
    }

    public static function withDrafts()
    {
        return static::withoutGlobalScope(PostDraftScope::class);
    }

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        if (!(Auth::user() instanceof Admin)) {
            static::addGlobalScope(new PostDraftScope);
            static::addGlobalScope(new BlockedPageContentScope);
            static::addGlobalScope(new ReportedPostScope);
        }
    }

    public function user()
    {
        return $this->belongsTo("App\Models\User");
    }

    public function comments()
    {
        return $this->hasMany("App\Models\Comment", "post_id");
    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, "notifiable");
    }

    public function slides()
    {
        return $this->hasMany(PostSlide::class, "post_id");
    }

    public function reports()
    {
        return $this->hasMany(Report::class, "reportable_id")->where("reportable_type", Post::class);
    }

    public function deleteBlocks($deleteFile = false)
    {
        $blocks = $this->blocks;
        $this->blocks()->delete();

        if ($deleteFile) {
            foreach ($blocks as $block) {
                if ($block->type == "video" || $block->type == "image") {
                    Storage::delete($block->content);
                }
            }
        }
    }

    public function blocks(): HasManyThrough
    {
        return $this->hasManyThrough(SlideBlock::class, PostSlide::class, "post_id", "slide_id");
    }

    public function share(): BelongsTo
    {
        $data = $this->belongsTo("App\Models\Post", "post_id")->with("page")
            ->withCount("likes")
            ->with("category");
        if (Auth::check()) {
            $data->with("mutualLikes");
        }
        return $data;
    }

    public function page(): BelongsTo
    {
        return $this->belongsTo("App\Models\Page", "page_id");
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo("App\Models\Category");
    }

    public function actions(): HasMany
    {
        return $this->hasMany(Action::class, "post_id");
    }

    public function bookmarks(): BelongsToMany
    {
        return $this->belongsToMany('App\Models\User', 'bookmarks', 'post_id', 'user_id');
    }

    public function mutualLikes()
    {
        return $this->hasMany(Like::class, "post_id")
            ->with("page")
            ->whereHas("page", function ($query) {
                $query->whereRaw("id in (select following from followings where page_id = ?)", Auth::check() ? Auth::user()->id : "-1");
            })
            ->latest();
    }

    public function likes(): HasMany
    {
        return $this->hasMany(Like::class, "post_id")
            ->with("page")
            ->latest();
    }

    public function setContent($slides, $user, $fileOnly = false, PollService $pollService, Dom $dom): array
    {
        $mentions = [];
        $tags = [];
        foreach ($slides as $slide) {

            if (count($slide) == 0) {
                continue;
            }

            $slide_id = PostSlide::query()->create([
                'page_id' => $user->personalPage->id,
                'post_id' => $this->id,
            ])->id;
            foreach ($slide['blocks'] as $rawContent) {
                $sort = (int)$rawContent['sort'];
                $content = $rawContent['content'];
                $type = $rawContent['type'];
                $meta = $rawContent['meta'] ?? [];

                if (!isset($content)) {
                    continue;
                }


                switch ($type) {
                    case "quote":
                    case "text":
                        // Process
                        $text = SocialMediaTools::safeHTML($content);
                        $text_mentions = SocialMediaTools::getMentions($text);
                        $slideTags = array_slice(SocialMediaTools::getHashtags($text), 0, 3);
                        $mentions = array_merge($text_mentions, $mentions);

                        SlideBlock::query()->create([
                            'slide_id' => $slide_id,
                            'page_id' => $user->personalPage->id,
                            'sort' => $sort,
                            'content' => SocialMediaTools::replaceMentions($text, $text_mentions),
                            'type' => $type,
                            "meta" => $meta,
                        ]);


                        break;

                    case "orderedList":
                    case "bulletedList":
                        $content = collect($content)->map(function ($item) use ($mentions, $tags) {
                            $text = SocialMediaTools::safeHTML($item);
                            $text_mentions = SocialMediaTools::getMentions($text);
                            return SocialMediaTools::replaceMentions($text, $text_mentions);
                        });

                        SlideBlock::query()->create([
                            'slide_id' => $slide_id,
                            'page_id' => $user->personalPage->id,
                            'sort' => $sort,
                            'content' => json_encode($content),
                            'type' => $type,
                            "meta" => $meta,
                        ]);
                        break;

                    case "title":
                    case "heading2":
                    case "heading3":
                        SlideBlock::query()->create([
                            'slide_id' => $slide_id,
                            'page_id' => $user->personalPage->id,
                            'sort' => $sort,
                            'content' => $content,
                            'type' => $type,
                            "meta" => $meta,
                        ]);
                        break;
                    case "image":
                        $media = $content instanceof UploadedFile | $fileOnly ? SocialMediaTools::uploadPostImage($content->store("media"), 90) : $content;
                        if (isset($meta['rotate'])) {
                            ImageTools::rotateImage(Storage::path($media), $meta['rotate']);
                        }

                        if (Storage::exists($media)) {
                            $meta['info'] = SocialMediaTools::getImageInfo(Storage::path($media));
                        }
                        SlideBlock::query()->create([
                            'slide_id' => $slide_id,
                            'page_id' => $user->personalPage->id,
                            'sort' => $sort,
                            'content' => $media,
                            'type' => 'image',
                            'meta' => $meta
                        ]);
                        break;
                    case "video":
                        $media = $content instanceof UploadedFile | $fileOnly ? $content->store("videos") : $content;

                        SlideBlock::query()->create([
                            'slide_id' => $slide_id,
                            'page_id' => $user->personalPage->id,
                            'sort' => $sort,
                            'content' => $media,
                            'type' => 'video',
                            "meta" => $meta,
                        ]);
                        break;

                    case "code":
                        SlideBlock::query()->create([
                            'slide_id' => $slide_id,
                            'page_id' => $user->personalPage->id,
                            'sort' => $sort,
                            'content' => json_encode(['language' => $content['language'], "code" => $content['code']]),
                            'type' => 'code',
                            "meta" => $meta,
                        ]);
                        break;
                    case "embed":
                        SlideBlock::query()->create([
                            'slide_id' => $slide_id,
                            'page_id' => $user->personalPage->id,
                            'sort' => $sort,
                            'content' => $content,
                            'type' => 'embed',
                            "meta" => $meta,
                        ]);
                        break;
                    case "poll":
                        $poll = null;
                        if (isset($meta['poll_id'])) {
                            $poll = $pollService->findById($meta['poll_id']);
                        } else {
                            $poll = $pollService->createPoll(
                                PollModel::fromArray($content)
                            );
                        }

                        SlideBlock::query()->create([
                            'slide_id' => $slide_id,
                            'page_id' => $user->personalPage->id,
                            'sort' => $sort,
                            'content' => json_encode($poll),
                            'type' => 'poll',
                            "meta" => $meta,
                        ]);
                        break;
                }
            }
        }
        return  $mentions;
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function publish()
    {
        return $this->update([
            "type" => "post",
        ]);
    }
}

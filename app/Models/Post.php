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
 * App\Models\Post
 *
 * @property mixed|string slug
 * @property int $id
 * @property int $user_id
 * @property int $page_id
 * @property string|null $title
 * @property string|null $text
 * @property array $media
 * @property int|null $category_id
 * @property string $show
 * @property string $type
 * @property bool $can_tip
 * @property string|null $slug
 * @property int|null $post_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Action[] $actions
 * @property-read int|null $actions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PostBlock[] $blocks
 * @property-read int|null $blocks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $bookmarks
 * @property-read int|null $bookmarks_count
 * @property-read \App\Models\Category|null $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Comment[] $comments
 * @property-read int|null $comments_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Like[] $likes
 * @property-read int|null $likes_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Like[] $mutualLikes
 * @property-read int|null $mutual_likes_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Notification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\Page $page
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Report[] $reports
 * @property-read int|null $reports_count
 * @property-read Post|null $share
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Tag[] $tags
 * @property-read int|null $tags_count
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\PostFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Post newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Post newQuery()
 * @method static \Illuminate\Database\Query\Builder|Post onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Post query()
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereCanTip($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereMedia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereShow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|Post withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Post withoutTrashed()
 * @mixin \Eloquent
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

    protected $with = ['tags', "blocks"];

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function withRelations(): \Illuminate\Database\Eloquent\Builder
    {
        return self::with(["page", 'likes', 'mutualLikes', 'category']);
    }

    public function loadRelations()
    {
        return $this->load(["page", 'likes', 'mutualLikes', 'category']);
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

    public function blocks(): HasMany
    {
        return $this->hasMany(PostBlock::class);
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

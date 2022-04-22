<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

/**
 * App\Models\BlockedPage
 *
 * @property int $id
 * @property int $page_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedPage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedPage newQuery()
 * @method static \Illuminate\Database\Query\Builder|BlockedPage onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedPage query()
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedPage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedPage whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedPage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedPage wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedPage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlockedPage whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|BlockedPage withTrashed()
 * @method static \Illuminate\Database\Query\Builder|BlockedPage withoutTrashed()
 * @mixin \Eloquent
 */
class BlockedPage extends Model
{

    protected $fillable = [
        'user_id',
        'page_id',
    ];

    use SoftDeletes;
    use HasFactory;

    public static function blockPage($id)
    {
        $page = Page::findOrFail($id);
        $page->unfollow();
        if ($page->isBlockedByMe()) {
            return null;
        }
        return BlockedPage::create([
            'user_id' => Auth::user()->id,
            'page_id' => $id,
        ]) != null;
    }

    public static function unblockPage($id)
    {
        $page = Page::findOrFail($id);
        return BlockedPage::query()->where("user_id", Auth::user()->id)->where("page_id", $id)->delete() == 1;
    }

}

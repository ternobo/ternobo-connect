<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

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

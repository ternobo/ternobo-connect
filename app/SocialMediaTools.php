<?php
namespace App;

use App\Models\Notification;
use App\Models\Page;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as ImageFacades;
use Intervention\Image\Image;

class SocialMediaTools
{

    public static $imageMaxWidth = 1440;
    public static $imageMaxHeight = 1920;
    public static $imageMinHeight = 112;
    public static $imageMinWidth = 558;

    public static $imageRatio = 4 / 3;

    public static function getHashtags($text)
    {
        $hashtags = array();
        $matches = array();
        preg_match_all('/#(\w+)/u', $text, $matches);
        return $matches[1];
    }

    public static function getMentions($text)
    {
        $hashtags = array();
        $matches = array();
        preg_match_all('/@(\w+)/', $text, $matches);
        return $matches[1];
    }

    public static function replaceUrls($text)
    {
        // The Regular Expression filter
        $reg_exUrl = "/(((https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)))/";

        return (preg_replace_callback($reg_exUrl, function ($matches) {
            foreach ($matches as $match) {
                return "<a target='_blank' href='" . $this->toURL($match) . "'>$match</a>";
            }
        }, $text));
    }

    public static function replaceMentions($text)
    {
        return preg_replace('/\B@(\w+)/u', "<a href=" . url("/$1") . ">$0</a>", $text);
    }

    public static function replacHashtags($text, $limit)
    {
        return preg_replace_callback('/\B#(\w+)/u', function ($matches) {
            return "<a href='" . url("/tags/" . $matches[1]) . "'>#" . str_replace('ـ', ' ', str_replace('_', ' ', $matches[1])) . "</a>";
        }, $text, $limit);
    }

    public static function uploadPostImage($media, $quality = 70)
    {
        $path = "storage/app/$media";
        if (!Str::endsWith(Str::lower($path), "gif")) {
            $path .= ".webp";
            $image = SocialMediaTools::fitPostImage(ImageFacades::make(base_path("storage/app/$media")));
            $image->save(base_path($path), $quality, "webp");
            Storage::delete("$media");
            return "$media.webp";
        }
        return "$media";
    }

    public static function fitPostImage(Image $image)
    {
        return ImageFacades::make($image)->resize(static::$imageMaxWidth, null, function ($constraint) {
            $constraint->upsize();
            $constraint->aspectRatio();
        });

    }

    public static function callMentions($mentions, $post_id)
    {
        foreach ($mentions as $mention) {
            $page = Page::query()->where("slug", $mention)->first();
            if ($page instanceof Page) {
                Notification::sendNotification("mention", $post_id, $page->id, $post_id);
            }
        }
    }

}

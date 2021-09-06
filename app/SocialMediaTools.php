<?php

namespace App;

use App\Models\Notification;
use App\Models\Page;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as ImageFacades;
use Intervention\Image\Image;
use PHPHtmlParser\Dom;
use PHPHtmlParser\Options;

class SocialMediaTools
{

    public static $imageMaxWidth = 1440;
    public static $imageMaxHeight = 1920;
    public static $imageMinHeight = 112;
    public static $imageMinWidth = 558;

    public static $imageRatio = 4 / 3;

    /**
     * return list of mention 
     * 
     * @param $text - text
     * 
     * @return array
     */
    public static function getHashtags($text)
    {
        $hashtags = array();
        $matches = array();
        preg_match_all('/#(\w+)/u', $text, $matches);
        return $matches[1];
    }

    /**
     * return list of mention 
     * 
     * @param $text text
     * 
     * @return array
     */
    public static function getMentions($text)
    {
        $hashtags = array();
        $matches = array();
        preg_match_all('/@(\w+)/', $text, $matches);
        return $matches[1];
    }

    /**
     * Repalce urls with <a> tag
     * 
     * @param string $text
     */
    public static function replaceUrls($text)
    {
        // The Regular Expression filter
        $reg_exUrl = "/(((https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)))/";

        return (preg_replace_callback($reg_exUrl, function ($matches) {
            foreach ($matches as $match) {
                return "<a target='_blank' href='" . URLTools::toURL($match) . "'>$match</a>";
            }
        }, $text));
    }

    /**
     * Remove script, style and whitespace text nodes from html content -- Prevent XSS
     * 
     * @param $content html
     * 
     * @return string
     */
    public static function safeHTML($content)
    {
        $dom = new Dom();
        $dom->setOptions((new Options())
            ->setRemoveSmartyScripts(true)
            ->setPreserveLineBreaks(true)
            ->setWhitespaceTextNode(true)
            ->setRemoveScripts(true)
            ->setRemoveStyles(true));
        $dom->loadStr($content);
        return $dom->outerHtml;
    }

    /**
     * replace mentions with with <a> tag
     * 
     * @param $text
     * 
     * @return string
     */
    public static function replaceMentions($text)
    {
        return preg_replace('/\B@(\w+)/u', "<a href=" . url("/$1") . ">$0</a>", $text);
    }

    /**
     * replace hashtags with with <a> tag
     * 
     * @param $text
     * @param $limit maximum number of hashtags to replace
     * 
     * @return string
     */
    public static function replacHashtags($text, $limit)
    {
        return preg_replace_callback('/\B#(\w+)/u', function ($matches) {
            return "<a href='" . url("/tags/" . $matches[1]) . "'>#" . str_replace('ـ', ' ', str_replace('_', ' ', $matches[1])) . "</a>";
        }, $text, $limit);
    }

    /**
     * Resize and optimize image for web
     * 
     * @param $media image path
     * @param $quality
     * 
     * @return string new image path
     */
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

    /**
     * Call Mentions inside text
     * 
     * @param array $mentions
     * @param int $mentionable_id
     * @param string $type - post or comment
     * @param int $post_id
     */
    public static function callMentions($mentions, $mentionable_id, $type = "post", $post_id = 0)
    {
        $sendCommentNotification = function () use ($mentionable_id, $post_id, $mentions) {
            foreach ($mentions as $mention) {
                $page = Page::query()->where("slug", $mention)->first();
                if ($page instanceof Page) {
                    Notification::sendNotification("mention_comment", $mentionable_id, $page->id, $post_id);
                }
            }
        };

        $sendPostNotification = function () use ($mentionable_id, $mentions) {
            foreach ($mentions as $mention) {
                $page = Page::query()->where("slug", $mention)->first();
                if ($page instanceof Page) {
                    Notification::sendNotification("mention", $mentionable_id, $page->id, $mentionable_id);
                }
            }
        };
        if ($type == "post") {
            $sendPostNotification();
        } else {
            $sendCommentNotification();
        }
    }
}

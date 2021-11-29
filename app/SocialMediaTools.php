<?php

namespace App;

use App\Models\CommunityTag;
use App\Models\Notification;
use App\Models\Page;
use HtmlSanitizer\Sanitizer;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as ImageFacades;
use Intervention\Image\Image;
use PHPHtmlParser\Dom;
use PHPHtmlParser\Options;
use Twitter\Text\Parser;

class SocialMediaTools
{

    public static $imageMaxWidth = 1764;
    public static $imageMinHeight = 112;
    public static $imageMaxHeight = 2232;
    public static $imageRatio = 4 / 3;


    private static $allowedHtmlTags = [
        "b",
        "i",
        "strike",
        "u",
        "a",
        "code",
        "br",
        "sup",
        "text",
        "span",
        "p"
    ];

    /**
     * return list of mention
     *
     * @param $text string - text
     *
     * @return array
     */
    public static function getHashtags(string $text): array
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
    public static function getMentions(string $text): array
    {
        $matches = [];
        preg_match_all('/@((?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,30})/', $text, $matches);
        return $matches[1];
    }

    /**
     * Remove script, style and whitespace text nodes from html content -- Prevent XSS
     *
     * @param $content string
     *
     * @return string
     */
    public static function safeHTML(string $content): string
    {
        $dom = new Dom();
        $dom->setOptions((new Options())
            ->setRemoveSmartyScripts(true)
            ->setPreserveLineBreaks(true)
            ->setWhitespaceTextNode(true)
            ->setRemoveScripts(true)
            ->setRemoveStyles(true)
            ->setRemoveDoubleSpace(true));
        $dom->loadStr("$content");

        $content = ($dom->find("*"));

        foreach ($content as $element) {
            if (!in_array($element->getTag()->name(), static::$allowedHtmlTags)) {
                $element->delete();
            }
        }
        return $dom->innerHTML;
    }

    public static function replaceHashtags($text, $hashtags)
    {
        foreach ($hashtags as $hashtag) {
            $tag = "#$hashtag";
            $community = CommunityTag::query()->whereRelation("tag", "name", $hashtag)->first();
            if ($community instanceof CommunityTag) {
                $icon = $community->icon;
                $tag = "#$hashtag <img src='/$icon' width='20'/>";
            }
            $text = str_replace("#$hashtag", " <wire-link href='/$hashtag' class='text-mention'>" . $tag . "</wire-link> ", $text);
        }
        return $text;
    }

    /**
     * replace mentions with with <a> tag
     *
     * @param $text
     *
     * @return string
     */
    public static function replaceMentions($text, $mentions): string
    {
        foreach ($mentions as $mention) {
            $page = Page::query()->where("slug", $mention)->first();
            if ($page instanceof Page) {
                $text = str_replace("@$mention", "<wire-link href='$mention' class='text-mention'>" . $page->name . "</wire-link>", $text);
            }
        }
        return $text;
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

    public static function getImageInfo($media)
    {
        $image = ImageFacades::make($media);
        return [
            'height' => $image->height(),
            'width' => $image->width()
        ];
    }

    public static function fitPostImage(Image $image)
    {

        $image = ImageFacades::make($image)->resize(static::$imageMaxWidth, null, function ($constraint) {
            $constraint->upsize();
            $constraint->aspectRatio();
        });

        if ($image->height() > static::$imageMaxHeight) {
            $image = $image->crop(static::$imageMaxWidth, static::$imageMaxHeight);
        }
        return $image;
    }

    /**
     * Call Mentions inside text
     *
     * @param array $mentions
     * @param int $mentionable_id
     * @param string $type - post or comment
     * @param int $post_id
     */
    public static function callMentions(array $mentions, int $mentionable_id, string $type = "post", int $post_id = 0)
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

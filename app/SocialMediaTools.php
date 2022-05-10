<?php

namespace App;

use App\Models\CommunityTag;
use App\Models\Notification;
use App\Models\Page;
use HtmlSanitizer\Sanitizer;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as ImageFacades;
use Intervention\Image\Image;
use League\HTMLToMarkdown\HtmlConverter;
use PHPHtmlParser\Dom;
use PHPHtmlParser\Options;
use Str as GlobalStr;
use Twitter\Text\Parser;

class SocialMediaTools
{

    public static $imageMaxWidth = 1764;
    public static $imageMinHeight = 112;
    public static $imageMaxHeight = 2232;
    public static $imageRatio = 4 / 3;


    private static $allowedHtmlTags = [
        "strike",
        "u",
        "a",
        "code",
        "br",
        "sup",
        "text",
        "span",
        "p",
        "spoiler",
        "strong",
        "em"
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
        $dom->loadStr($content);

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
                $text = str_replace("#$hashtag", "[hashtag=$hashtag [$icon] ]", $text);
            }
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
    public static function uploadPostImage(UploadedFile $media, $quality = 70, $meta = [])
    {
        $result = ['meta' => []];
        $path = Storage::disk("local")->path($media->store("media", ['disk' => "local"]));
        if (!GlobalStr::endsWith(Str::lower($path), "gif")) {
            $image = SocialMediaTools::fitPostImage(ImageFacades::make($path));
            if (isset($meta['rotate'])) {
                $image->rotate($meta['rotate']);
            }
            $image->save($path, $quality, "webp");
            $result['content'] = Storage::putFile("media", $path);
            $result['meta'] = ['info' => SocialMediaTools::getImageInfo($image)];
        }

        $result['content'] = Storage::putFile("media", $path);
        $result['meta'] = ['info' => SocialMediaTools::getImageInfo($image)];
        unlink($path);
        return $result;
    }

    public static function getImageInfo(Image $image)
    {
        return [
            'height' => $image->height(),
            'width' => $image->width()
        ];
    }

    public static function fitPostImage(Image $image)
    {

        $image = $image->resize(static::$imageMaxWidth, null, function ($constraint) {
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

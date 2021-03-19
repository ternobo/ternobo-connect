<?php
namespace App;

class SocialMediaTools
{
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
        return preg_replace('/\B#(\w+)/u', "<a href=" . url("/tags/$1") . ">$0</a>", $text, $limit);
    }

}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::insert("INSERT INTO `socials` (`id`, `name`, `icon`, `pattern`, `starts_with`, `created_at`, `updated_at`, `deleted_at`) VALUES"
        . "(1, 'Facebook', '<i class=\"ternobo-facebook\"></i>', '(?:https?:\\/\\/)?(?:www\\.)?(mbasic.facebook|m\\.facebook|facebook|fb)\\.(com|me)\\/(?:(?:\\w\\.)*#!\\/)?(?:pages\\/)?(?:[\\w\\-\\.]*\\/)*([\\w\\-\\.]*)', 'https://', NULL, NULL, NULL),"
        . "(2, 'Twitter', '<i class=\"ternobo-twitter\"></i>', '(https?:\\/\\/)?(www\\.)?twitter\\.com\\/[A-Za-z0-9_]{5,15}(\\?(\\w+=\\w+&?)*)?', 'https://', NULL, NULL, NULL),"
        . "(3, 'Instagram', '<i class=\"ternobo-instagram\"></i>', '(http:\\/\\/)|(https:\\/\\/)?(www\\.)?instagram\\.com\\/[A-Za-z0-9_.]{1,30}\\/?', 'https://', NULL, NULL, NULL),"
        . "(4, 'Telegram', '<i class=\"ternobo-telegram\"></i>', '(http:\\/\\/)|(https:\\/\\/)?(www\\.)?t\\.me\\/[A-Za-z0-9_.]{1,30}\\/?', 'https://', NULL, NULL, NULL),"
        . "(5, 'Youtube', '<i class=\"ternobo-youtube\"></i>\r\n', '((http|https):\\/\\/|)(www\\.|)youtube\\.com\\/(channel\\/|user\\/)[a-zA-Z0-9\\-]{1,}', 'https://', NULL, NULL, NULL),"
        . "(6, 'Dribble', '<i class=\"ternobo-dribbble\"></i>', '(http:\\/\\/)|(https:\\/\\/)?(www\\.)?dribbble.com\\.com\\/[A-Za-z0-9_.]{1,30}\\??', 'https://', NULL, NULL, NULL),"
        . "(7, 'Behance', '<i class=\"ternobo-behance\"></i>', '(http:\\/\\/)|(https:\\/\\/)?(www\\.)?behance.com\\.com\\/[A-Za-z0-9_.]{1,30}\\??', 'https://', NULL, NULL, NULL),"
        . "(8, 'Github', '<i class=\"ternobo-github\"></i>', '(http:\\/\\/)|(https:\\/\\/)?(www\\.)?github.com\\.com\\/[A-Za-z0-9_.]{1,30}\\??', 'https://', NULL, NULL, NULL),"
        . "(9, 'Gitlab', '<i class=\"ternobo-gitlab\"></i>', '(http:\\/\\/)|(https:\\/\\/)?(www\\.)?gitlab.com\\.com\\/[A-Za-z0-9_.]{1,30}\\??', 'https://', NULL, NULL, NULL),"
        . "(10, 'Sound Cloud', '<i class=\"ternobo-soundcloud\"></i>', '(http:\\/\\/)|(https:\\/\\/)?(www\\.)?soundcloud.com\\/[A-Za-z0-9_.]{1,30}\\??', 'https://', NULL, NULL, NULL),"
        . "(11, 'Pinterest', '<i class=\"ternobo-pinterest\"></i>', '(http:\\/\\/)|(https:\\/\\/)?(www\\.)?pinterest.com\\/[A-Za-z0-9_.]{1,30}\\??', 'https://', NULL, NULL, NULL),"
        . "(12, 'Flicker', '<i class=\"ternobo-flickr\"></i>', '(http:\\/\\/)|(https:\\/\\/)?(www\\.)?pinterest.com\\/[A-Za-z0-9_.]{1,30}\\??', 'https://', NULL, NULL, NULL);");

        DB::insert("INSERT INTO `contact_options` (`id`, `name`, `pattern`, `starts_with`, `icon`, `created_at`, `updated_at`) VALUES"
                . "(1, 'ایمیل', '^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$', 'mailto:', 'email', NULL, NULL),"
                . "(2, 'شماره موبایل', '^\\s*(?:\\+?(\\d{1,3}))?([-. (]*(\\d{3})[-. )]*)?((\\d{3})[-. ]*(\\d{2,4})(?:[-.x ]*(\\d+))?)\\s*$', 'tel:', 'phone', NULL, NULL),"
                . "(3, 'Telegram', '(http:\\/\\/)|(https:\\/\\/)?(www\\.)?t\\.me\\/[A-Za-z0-9_.]{1,30}\\/?', 'https://', '<i class=\"ternobo-telegram\"></i>', NULL, NULL);");

        DB::insert("INSERT INTO `website_options` (`id`, `name`, starts_with,`created_at`, `updated_at`) VALUES"
                . "(1, 'شخصی','http://', NULL, NULL),"
                . "(2, 'کسب و کار','http://', NULL, NULL),"
                . "(3, 'وبلاگ','http://', NULL, NULL),"
                . "(4, 'فید RSS','http://', NULL, NULL),"
                . "(5, 'نمونه کار','http://', NULL, NULL),"
                . "(6, 'دیگر','http://', NULL, NULL);");
    }
}

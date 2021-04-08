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
            . "(1, 'Facebook', '<i class=\"ternobo-facebook\"></i>', '^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$', 'https://facebook.com/', NULL, NULL, NULL),"
            . "(2, 'Twitter', '<i class=\"ternobo-twitter\"></i>', '^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$', 'https://twitter.com/', NULL, NULL, NULL),"
            . "(3, 'Instagram', '<i class=\"ternobo-instagram\"></i>', '(^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$', 'https://instagram.com/', NULL, NULL, NULL),"
            . "(5, 'Youtube', '<i class=\"ternobo-youtube\"></i>\r\n', '^((https):\\/\\/)(www\\.|m\\.)youtube\\.com\\/(channel\\/|user\\/)[a-zA-Z0-9\\-]{1,}', '', NULL, NULL, NULL),"
            . "(6, 'Dribble', '<i class=\"ternobo-dribbble\"></i>', '^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$', 'https://dribbble.com/', NULL, NULL, NULL),"
            . "(7, 'Behance', '<i class=\"ternobo-behance\"></i>', '^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$', 'https://behance.com/', NULL, NULL, NULL),"
            . "(8, 'Github', '<i class=\"ternobo-github\"></i>', '^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$', 'https://github.com/', NULL, NULL, NULL),"
            . "(9, 'Gitlab', '<i class=\"ternobo-gitlab\"></i>', '^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$', 'https://gitlab.com/', NULL, NULL, NULL),"
            . "(10, 'Sound Cloud', '<i class=\"ternobo-soundcloud\"></i>', '^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$', 'https://soundcloud.com/', NULL, NULL, NULL),"
            . "(11, 'Pinterest', '<i class=\"ternobo-pinterest\"></i>', '^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$', 'https://pinterest.com/', NULL, NULL, NULL),"
            . "(12, 'Flicker', '<i class=\"ternobo-flickr\"></i>', '^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$', 'https://pinterest.com/', NULL, NULL, NULL);");

        DB::insert("INSERT INTO `contact_options` (`id`, `name`, `pattern`, `starts_with`, `icon`, `created_at`, `updated_at`) VALUES"
            . "(1, 'ایمیل', '\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b', 'mailto:', 'email', NULL, NULL),"
            . "(2, 'شماره موبایل', '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$', 'tel:', 'phone', NULL, NULL),"
            . "(3, 'Telegram', '^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$', 'https://t.me/', '<i class=\"ternobo-telegram\"></i>', NULL, NULL);");

        DB::insert("INSERT INTO `website_options` (`id`, `name`, starts_with,`created_at`, `updated_at`) VALUES"
            . "(1, 'شخصی','http://', NULL, NULL),"
            . "(2, 'کسب و کار','http://', NULL, NULL),"
            . "(3, 'وبلاگ','http://', NULL, NULL),"
            . "(4, 'فید RSS','http://', NULL, NULL),"
            . "(5, 'نمونه کار','http://', NULL, NULL),"
            . "(6, 'دیگر','http://', NULL, NULL);");
    }
}

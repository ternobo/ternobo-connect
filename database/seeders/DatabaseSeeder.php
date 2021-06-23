<?php

namespace Database\Seeders;

use App\Models\WebsiteOption;
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
        WebsiteOption::query()->truncate();
        DB::insert("INSERT INTO `website_options` (`id`, `name`, `starts_with`, `created_at`, `updated_at`) VALUES
            (1, 'user-profile.website-personal', 'http://', NULL, NULL),
            (2, 'user-profile.website-company', 'http://', NULL, NULL),
            (3, 'user-profile.website-blog', 'http://', NULL, NULL),
            (4, 'user-profile.website-rss', 'http://', NULL, NULL),
            (5, 'user-profile.website-portfolio', 'http://', NULL, NULL),
            (6, 'user-profile.website-other', 'http://', NULL, NULL);");
    }
}

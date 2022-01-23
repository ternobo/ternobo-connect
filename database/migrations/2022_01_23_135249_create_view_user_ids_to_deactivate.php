<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateViewUserIdsToDeactivate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("CREATE VIEW `view_user_ids_to_deactivate` AS 
        SELECT
            `last_activities`.`last_activity` AS `last_activity`,
            `users`.`id`
        FROM
            `users`
        LEFT JOIN `user_options` ON `user_options`.`user_id` = `users`.`id` AND `key` = 'autodeactivation'
        LEFT JOIN `last_activities` ON `last_activities`.`user_id` = `users`.`id`
        WHERE
            CAST(`user_options`.value AS SIGNED) * 30 < DATEDIFF(
                DATE(NOW()),
                DATE(`last_activity`)) AND `users`.`deleted_at` IS NULL
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS `view_user_ids_to_deactivate`");
    }
}

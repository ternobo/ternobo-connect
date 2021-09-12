<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FixForeignKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("pages", function (Blueprint $table) {
            $table->unsignedBigInteger("user_id")->change();
            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("posts", function (Blueprint $table) {
            $table->unsignedBigInteger("page_id")->change();
            $table->foreign("page_id")->references("id")->on("pages")->onDelete("CASCADE")->onUpdate("CASCADE");
        });


        Schema::table("comments", function (Blueprint $table) {
            $table->unsignedBigInteger("page_id")->change();
            $table->unsignedBigInteger("post_id")->change();

            $table->foreign("page_id")->references("id")->on("pages")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("post_id")->references("id")->on("posts")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("connected_accounts", function (Blueprint $table) {
            $table->unsignedBigInteger("user_id")->change();
            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("actions", function (Blueprint $table) {
            $table->unsignedBigInteger("page_id")->change();
            $table->unsignedBigInteger("post_id")->change();

            $table->foreign("page_id")->references("id")->on("pages")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("post_id")->references("id")->on("posts")->onDelete("CASCADE")->onUpdate("CASCADE");
        });


        Schema::table("about_data", function (Blueprint $table) {
            $table->unsignedBigInteger("page_id")->change();
            $table->foreign("page_id")->references("id")->on("pages")->onDelete("CASCADE")->onUpdate("CASCADE");
        });
        Schema::table("contact_data", function (Blueprint $table) {
            $table->unsignedBigInteger("page_id")->change();
            $table->foreign("page_id")->references("id")->on("pages")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("active_sessions", function (Blueprint $table) {
            $table->unsignedBigInteger("user_id")->change();

            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("blocked_pages", function (Blueprint $table) {
            $table->unsignedBigInteger("page_id")->change();
            $table->unsignedBigInteger("user_id")->change();

            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("page_id")->references("id")->on("pages")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("bookmarks", function (Blueprint $table) {
            $table->unsignedBigInteger("user_id")->change();
            $table->unsignedBigInteger("post_id")->change();

            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("post_id")->references("id")->on("posts")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("categories", function (Blueprint $table) {
            $table->unsignedBigInteger("page_id")->change();

            $table->foreign("page_id")->references("id")->on("pages")->onDelete("CASCADE")->onUpdate("CASCADE");
        });


        Schema::table("content_seens", function (Blueprint $table) {
            $table->unsignedBigInteger("post_id")->change();
            $table->unsignedBigInteger("user_id")->change();

            $table->foreign("post_id")->references("id")->on("posts")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("feedbacks", function (Blueprint $table) {
            $table->unsignedBigInteger("user_id")->change();
            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });
        Schema::table("feedback_bookmarks", function (Blueprint $table) {
            $table->unsignedBigInteger("user_id")->change();
            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });
        Schema::table("feedback_replies", function (Blueprint $table) {
            $table->unsignedBigInteger("feedback_id")->change();
            $table->unsignedBigInteger("user_id")->change();

            $table->foreign("feedback_id")->references("id")->on("feedbacks")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });
        Schema::table("feedback_votes", function (Blueprint $table) {
            $table->unsignedBigInteger("feedback_id")->change();
            $table->unsignedBigInteger("user_id")->change();

            $table->foreign("feedback_id")->references("id")->on("feedbacks")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("followings", function (Blueprint $table) {
            $table->unsignedBigInteger("page_id")->change();
            $table->unsignedBigInteger("following")->change();

            $table->foreign("page_id")->references("id")->on("pages")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("following")->references("id")->on("pages")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("likes", function (Blueprint $table) {
            $table->unsignedBigInteger("post_id")->change();
            $table->unsignedBigInteger("comment_id")->change();
            $table->unsignedBigInteger("page_id")->change();

            $table->foreign("post_id")->references("id")->on("posts")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("comment_id")->references("id")->on("comments")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("page_id")->references("id")->on("pages")->onDelete("CASCADE")->onUpdate("CASCADE");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}

<?php

namespace App\Console\Commands;

use App\Events\NotificationEvent;
use App\Models\Comment;
use App\Models\Following;
use App\Models\Like;
use App\Models\Notification;
use App\Models\Post;
use App\Models\User;
use Faker\Factory;
use Illuminate\Console\Command;

class FakeNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fake:notitications {nums} {user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Fake Notifications';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $faker = Factory::create();

        $numbers = $this->argument("nums");
        for ($i = 0; $i < $numbers; $i++) {
            $user = User::query()->find($this->argument("user"));

            $post = Post::query()->where("page_id", $user->personalPage->id)->get()->random();

            $from = User::query()->where("id", "!=", $user->id)->with("personalPage")->get()->random()->personalPage;
            // print_r($from);
            $notification = new Notification();
            $notification->from = $from->id;
            $notification->to = $user->id;

            $action = $faker->randomElement(['like', 'comment', 'follow', 'reply', 'skill_credit', 'mention']);
            // print_r($action);
            $notification->action = $action;

            $notificationable_id = $post->id;
            $notificationable_type = "post";

            $connected_to = $post->id;

            switch ($action) {
                case 'like':
                    $like = new Like();
                    $like->page_id = $from->id;
                    $like->post_id = $post->id;
                    $result = $like->save();
                    $connected_to = $like->id;
                    $notificationable_type = "post";
                    break;
                case 'comment':
                    $comment = new Comment();
                    $comment->page_id = $from->id;
                    $comment->post_id = $post->id;
                    $comment->text = $faker->text;
                    $comment->save();
                    $connected_to = $comment->id;
                    $notificationable_type = "post";
                    break;
                case 'follow':
                    $followRow = Following::query()->where("user_id", $from->id)->where("following", $user->id)->firstOrNew();
                    $followRow->following = $from->id;
                    $followRow->user_id = $user->id;
                    $followRow->save();
                    $notificationable_id = $from->id;
                    $connected_to = $followRow->id;
                    $notificationable_type = "page";
                    break;
                case 'mention':
                    $newPost = Post::all()->random();
                    $connected_to = $newPost->id;
                    $notificationable_id = $newPost->id;
                    $notificationable_type = "post";
                    break;
            }

            $notification->notificationable_id = $notificationable_id;
            $notification->notificationable_type = $notificationable_type;
            $notification->connected_to = $connected_to;

            $notification->save();

            event(new NotificationEvent($notification));

        }
        return 0;
    }
}

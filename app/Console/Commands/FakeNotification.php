<?php

namespace App\Console\Commands;

use App\Models\Comment;
use App\Models\Following;
use App\Models\Like;
use App\Models\Notification;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use Carbon\Carbon;
use Faker\Generator;
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
    public function __construct(Generator $generator)
    {
        parent::__construct();
        $this->faker = $generator;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $numbers = $this->argument("nums");
        for ($i = 0; $i < $numbers; $i++) {
            $user = User::query()->find($this->argument("user"));

            $post = Post::withRelations()->where("page_id", $user->personalPage->id)->get()->random();

            $from = Page::query()->where("user_id", "!=", $user->id)->get()->random();
            $notification = new Notification();
            $notification->from = $from->id;
            $notification->to = $user->id;

            $action = $this->faker->randomElement(['like', 'comment', 'follow', 'mention']);
            // print_r($action);
            $notification->action = $action;

            $notificationable_id = $post->id;
            $notificationable_type = Post::class;

            $connected_to = $post->id;

            switch ($action) {
                case 'like':
                    $like = new Like();
                    $like->page_id = $from->id;
                    $like->post_id = $post->id;
                    $result = $like->save();
                    $connected_to = $like->id;
                    break;
                case 'comment':
                    $comment = new Comment();
                    $comment->page_id = $from->id;
                    $comment->post_id = $post->id;
                    $comment->text = $this->faker->text;
                    $comment->save();
                    $connected_to = $comment->id;
                    break;
                case 'follow':
                    $followRow = Following::query()->where("page_id", $from->id)->where("following", $user->id)->firstOrNew();
                    $followRow->following = $from->id;
                    $followRow->page_id = $user->id;
                    $followRow->save();
                    $notificationable_id = $from->id;
                    $connected_to = $followRow->id;
                    $notificationable_type = Page::class;
                    break;
                case 'mention':
                    $newPost = Post::all()->random();
                    $connected_to = $newPost->id;
                    $notificationable_id = $newPost->id;
                    break;
            }

            $notification->notifiable_id = $notificationable_id;
            $notification->notifiable_type = $notificationable_type;
            $notification->connected_to = $connected_to;
            $notification->created_at = Carbon::today()->subDays(rand(0, 30));
            $notification->timestamps = false;
            $notification->save();
        }
        return 0;
    }
}

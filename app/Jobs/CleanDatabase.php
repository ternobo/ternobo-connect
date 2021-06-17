<?php

namespace App\Jobs;

use App\Models\ActiveSession;
use App\Models\Comment;
use App\Models\ConnectedAccount;
use App\Models\Feedback;
use App\Models\Following;
use App\Models\Like;
use App\Models\Post;
use App\Models\Tip;
use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CleanDatabase implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Post::query()->whereDoesntHave("page")->orWhereDoesntHave("user")->delete();
        Comment::query()->whereDoesntHave("page")->orWhereDoesntHave("user")->delete();
        ActiveSession::query()->whereDoesntHave("user")->delete();
        Feedback::query()->whereDoesntHave("user")->delete();
        ConnectedAccount::query()->whereDoesntHave("user")->delete();
        Like::query()->whereDoesntHave("page")->delete();
        Following::query()->whereDoesntHave("follower")->orWhereDoesntHave("page")->delete();
        Transaction::query()->whereDoesntHave("user")->delete();
        Tip::query()->whereDoesntHave("user")->orWhereDoesntHave("post");
    }
}

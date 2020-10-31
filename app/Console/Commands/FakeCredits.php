<?php

namespace App\Console\Commands;

use App\Models\Skill;
use App\Models\SkillCredit;
use App\Models\User;
use Illuminate\Console\Command;

class FakeCredits extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fake:credits {nums} {skill}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fake Credits on Skill';

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
        $nums = $this->argument("nums");
        $skill = $this->argument("skill");
        $skill = Skill::query()->find($skill);

        for ($i = 0; $i < $nums; $i++) {
            $user = User::all()->random();
            $credit = new SkillCredit();
            $credit->user_id = $user->id;
            $credit->skill_id = $skill->id;
            $credit->level = 2;
            $credit->reason = "Something";
            $result = $credit->save();
        }

        return 0;
    }
}

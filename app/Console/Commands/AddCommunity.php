<?php

namespace App\Console\Commands;

use App\Services\Admin\CommunityTagsManagementService;
use App\Services\Content\CommunityTagService;
use Illuminate\Console\Command;

class AddCommunity extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'add:community {tag} {name} {icon} {cover}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add Community';

    private CommunityTagsManagementService $service;


    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(CommunityTagsManagementService $service)
    {
        parent::__construct();
        $this->service = $service;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->service->addCommunityTag(
            $this->argument("tag"),
            $this->argument("name"),
            $this->argument("icon"),
            $this->argument("cover")
        );
        return Command::SUCCESS;
    }
}

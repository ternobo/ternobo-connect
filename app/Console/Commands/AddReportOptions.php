<?php

namespace App\Console\Commands;

use App\Models\ReportOptions;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class AddReportOptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:reports';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Setup report options';

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
        $reasons = array_filter(trans("content/report"), function ($key) {
            return Str::startsWith($key, 'rep-reason-');
        }, ARRAY_FILTER_USE_KEY);
        foreach ($reasons as $key => $reason) {
            $reasonModel = ReportOptions::create([
                'key' => $key,
                'text' => $reason['text'],
                'for' => "page|post|comment",
                "parent" => '-1',
            ]);
            $subreasons = $reason['subreasons'];
            foreach ($subreasons as $subreasonKey => $subreason) {
                $parent = $reasonModel->id;
                ReportOptions::create([
                    'key' => $subreasonKey,
                    'text' => $subreasons['title'],
                    'description' => $subreasons['description'],
                    'for' => "page|post|comment",
                    "parent" => $parent,
                ]);
            }
        }
        return 0;
    }
}

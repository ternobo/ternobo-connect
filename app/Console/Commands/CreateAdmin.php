<?php

namespace App\Console\Commands;

use App\Models\Admin;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create Admin User';

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
        $username = $this->ask("Enter username");
        $password = $this->ask("Enter password");
        $name = $this->ask("Enter admin name");
        $phone = $this->ask("Enter admin phone number");
        $email = $this->ask("Enter admin email");
        $national_code = $this->ask("Enter admin national code");

        $admin = new Admin([
            'username' => $username,
            'name' => $name,
            'phone_number' => $phone,
            "national_code" => $national_code,
            'email' => $email,

        ]);
        $admin->password = Hash::make($password);
        $admin->save();
        $this->info("Admin user created successfully, UserId=$admin->id");
        return Command::SUCCESS;
    }
}

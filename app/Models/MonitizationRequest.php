<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonitizationRequest extends Model
{
    use HasFactory;

    public static string $status_accepted = "accepted";
    public static string $status_rejected = "rejected";
    public static string $status_waiting = "waiting";

    protected $fillable = [
        "user_id",
        "status",
    ];
}

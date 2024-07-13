<?php

use Illuminate\Database\Eloquent\Model;
require_once __DIR__ . "/LeaderPlace.php";

class WorkingYear extends Model
{
    protected $table = 'working_years';

    public $timestamps = false;

    public function leaderPlaces()
    {
        return $this->hasMany(LeaderPlace::class, 'working_year_id');
    }
}

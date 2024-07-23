<?php

use \Illuminate\Database\Eloquent\Model;
require_once __DIR__ . "/Leader.php";
require_once __DIR__ . "/Registration.php";

class Group extends Model
{
	public $timestamps = false;

    public function leaders()
    {
        return $this->belongsToMany(Leader::class, 'leader_places')
                    ->withPivot('working_year_id ')
                    ->using(LeaderPlace::class);
    }

    public function registrations() {
        return $this->hasMany(Registration::class, 'group_id');
    }
}
<?php

use \Illuminate\Database\Eloquent\Model;

class Group extends Model
{
	public $timestamps = false;
	
    public function leaders() {
        return $this->belongsToMany(Leader::class, 'leader_places', 'group_id', 'leader_id');
    }

    public function registrations() {
        return $this->hasMany(Registration::class, 'group_id');
    }
}
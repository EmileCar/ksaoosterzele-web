<?php

use \Illuminate\Database\Eloquent\Model;

class LeaderRole extends Model
{
    public $timestamps = false;

    public function leaders() {
        return $this->belongsToMany(Leader::class, 'leader_leader_roles', 'role_id', 'leader_id');
    }
}
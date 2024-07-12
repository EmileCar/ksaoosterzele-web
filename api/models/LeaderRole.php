<?php

use \Illuminate\Database\Eloquent\Model;

class LeaderRole extends Model
{
    public $timestamps = false;

    // a leader can have many roles
    public function leaders() {
        return $this->hasMany(Leader::class, 'role_id');
    }
}
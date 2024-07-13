<?php

use \Illuminate\Database\Eloquent\Model;
require_once __DIR__ . "/Leader.php";

class LeaderRole extends Model
{
    public $timestamps = false;

    public function leaders() {
        return $this->hasMany(Leader::class, 'role_id');
    }
}
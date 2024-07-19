<?php

use \Illuminate\Database\Eloquent\Model;
require_once __DIR__ . "/Leader.php";
require_once __DIR__ . "/Group.php";
require_once __DIR__ . "/WorkingYear.php";

class LeaderPlace extends Model
{
    public $timestamps = false;

    protected $fillable = ['leader_id', 'group_id', 'working_year_id'];


    public function leader() {
        return $this->belongsTo(Leader::class, 'leader_id');
    }

    public function group() {
        return $this->belongsTo(Group::class, 'group_id');
    }

    public function workingYear() {
        return $this->belongsTo(WorkingYear::class, 'working_year_id');
    }
}
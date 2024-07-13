<?php

use \Illuminate\Database\Eloquent\Model;
require_once __DIR__ . "/Account.php";
require_once __DIR__ . "/LeaderRole.php";
require_once __DIR__ . "/Group.php";

class Leader extends Model
{
    public $timestamps = false;

    public function accounts() {
        return $this->belongsToMany(Account::class, 'account_leaders', 'leader_id', 'account_id');
    }

    public function role() {
        return $this->belongsTo(LeaderRole::class, 'role_id');
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'leader_places', 'leader_id', 'group_id')
                    ->withPivot('working_year_id');
    }

    public function leaderPlaces() {
        return $this->hasMany(LeaderPlace::class, 'leader_id');
    }
}
<?php

use \Illuminate\Database\Eloquent\Model;

class Leader extends Model
{
    public $timestamps = false;

    public function accounts() {
        return $this->belongsToMany(Account::class, 'account_leaders', 'leader_id', 'account_id');
    }

    public function roles() {
        return $this->belongsToMany(LeaderRole::class, 'leader_leader_roles', 'leader_id', 'role_id');
    }

    public function groups() {
        return $this->belongsToMany(Group::class, 'leader_places', 'leader_id', 'group_id');
    }
}
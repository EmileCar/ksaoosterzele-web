<?php

use \Illuminate\Database\Eloquent\Model;

class AccountRole extends Model
{
    public $timestamps = false;

    public function accounts() {
        return $this->hasMany(Account::class, 'role_id');
    }
}
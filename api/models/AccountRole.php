<?php

use \Illuminate\Database\Eloquent\Model;
require_once __DIR__ . "/Account.php";

class AccountRole extends Model
{
    public $timestamps = false;

    public function accounts() {
        return $this->hasMany(Account::class, 'role_id');
    }
}
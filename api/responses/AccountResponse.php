<?php
require_once __DIR__ . '/../models/AccountRole.php';

class AccountResponse
{
    public $id;
    public $username;
    public $email;
    public $role;
    public $created_at;
    public $updated_at;

    public function __construct(Account $account)
    {
        $this->id = $account->id;
        $this->username = $account->username;
        $this->email = $account->email;
        $this->role = $account->role;
        $this->created_at = $account->created_at;
        $this->updated_at = $account->updated_at;
    }

    public function toArray()
    {
        return get_object_vars($this);
    }
}

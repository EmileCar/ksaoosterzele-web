<?php

class LeaderByRoleResponse
{
    public $id;
    public $first_name;
    public $last_name;
    public $birthdate;
    public $phone_number;
    public $email;
    public $image_file_name;
    public $group;
    public $role_id;

    public function __construct($leader, $role_id, $group = null)
    {
        $this->id = $leader->id;
        $this->first_name = $leader->first_name;
        $this->last_name = $leader->last_name;
        $this->birthdate = $leader->birthdate;
        $this->phone_number = $leader->phone_number;
        $this->email = $leader->email;
        $this->image_file_name = $leader->image_file_name;
        $this->role_id = $role_id;
        $this->group = $group ? [
            'id' => $group->id,
            'name' => $group->name,
        ] : null;
    }

    public function toArray()
    {
        return get_object_vars($this);
    }
}
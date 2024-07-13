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

    public function __construct($leader, $group = null)
    {
        $this->id = $leader->id;
        $this->first_name = $leader->first_name;
        $this->last_name = $leader->last_name;
        $this->birthdate = $leader->birthdate;
        $this->phone_number = $leader->phone_number;
        $this->email = $leader->email;
        $this->image_file_name = $leader->image_file_name;
        $this->group = $group ? [
            'name' => $group->name,
            'year' => $group->pivot->working_year_id
        ] : null;
    }

    public function toArray()
    {
        return get_object_vars($this);
    }
}

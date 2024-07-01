<?php
require_once __DIR__ . '/../models/Registration.php';

class RegistrationResponse
{
    public $id;
    public $group;
    public $first_name;
    public $last_name;
    public $birthdate;
    public $gender;
    public $birthplace;
    public $parent_first_name;
    public $parent_last_name;
    public $address;
    public $postal_code;
    public $town;
    public $phone_number;
    public $telephone_number;
    public $email;
    public $second_parent_first_name;
    public $second_parent_last_name;
    public $second_address;
    public $second_postal_code;
    public $second_town;
    public $second_phone_number;
    public $second_telephone_number;
    public $second_email;
    public $allow_media;
    public $created_at;
    public $updated_at;

    public function __construct(Registration $registration)
    {
        $this->id = $registration->id;
        $this->group = [
            'id' => $registration->group->id,
            'name' => $registration->group->name
        ];
        $this->first_name = $registration->first_name;
        $this->last_name = $registration->last_name;
        $this->birthdate = $registration->birthdate;
        $this->gender = $registration->gender;
        $this->birthplace = $registration->birthplace;
        $this->parent_first_name = $registration->parent_first_name;
        $this->parent_last_name = $registration->parent_last_name;
        $this->address = $registration->address;
        $this->postal_code = $registration->postal_code;
        $this->town = $registration->town;
        $this->phone_number = $registration->phone_number;
        $this->telephone_number = $registration->telephone_number;
        $this->email = $registration->email;
        $this->second_parent_first_name = $registration->second_parent_first_name;
        $this->second_parent_last_name = $registration->second_parent_last_name;
        $this->second_address = $registration->second_address;
        $this->second_postal_code = $registration->second_postal_code;
        $this->second_town = $registration->second_town;
        $this->second_phone_number = $registration->second_phone_number;
        $this->second_telephone_number = $registration->second_telephone_number;
        $this->second_email = $registration->second_email;
        $this->allow_media = $registration->allow_media;
        $this->created_at = $registration->created_at;
        $this->updated_at = $registration->updated_at;
    }

    public function toArray()
    {
        return get_object_vars($this);
    }
}

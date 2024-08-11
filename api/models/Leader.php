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
        return $this->belongsToMany(Group::class, 'leader_places')
                    ->withPivot('working_year_id ')
                    ->using(LeaderPlace::class);
    }

    public function leaderPlaces() {
        return $this->hasMany(LeaderPlace::class, 'leader_id');
    }

    public function invoices() {
        return $this->hasMany(Invoice::class, 'leader_id');
    }

    public static function validate($data) {
		$errors = [];

		if (empty($data["firstName"])) {
			$errors["firstNameError"] = "Naam is verplicht.";
		}

        if (empty($data["lastName"])) {
            $errors["lastNameError"] = "Achternaam is verplicht.";
        }

        if (empty($data["roleId"])) {
            $errors["roleError"] = "Rol is verplicht.";
        }

		return $errors;
	}

    public static function create($data, $leader) {
        if (!empty($data["firstName"])) {
            $leader->first_name = $data["firstName"];
        }
        if (!empty($data["lastName"])) {
            $leader->last_name = $data["lastName"];
        }
        if (!empty($data["birthdate"])) {
            $leader->birthdate = $data["birthdate"];
        }
        if (!empty($data["phoneNumber"])) {
            $leader->phone_number = $data["phoneNumber"];
        }
        if (!empty($data["email"])) {
            $leader->email = $data["email"];
        }
        if (!empty($data["imageFileName"])) {
            $leader->image_file_name = $data["imageFileName"];
        }
        if (!empty($data["description"])) {
            $leader->description = $data["description"];
        }
        if (!empty($data["roleId"])) {
            $leader->role_id = $data["roleId"];
        }
        return $leader;
    }
}
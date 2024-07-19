<?php

use Illuminate\Database\Eloquent\Model;
require_once __DIR__ . "/LeaderPlace.php";

class WorkingYear extends Model
{
    protected $table = 'working_years';

    public $timestamps = true;

    public function leaderPlaces()
    {
        return $this->hasMany(LeaderPlace::class, 'working_year_id');
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class, 'working_year_id');
    }

    public static function validate($data) {
		$errors = [];

        if(empty($data["name"])) {
            $errors["nameError"] = "Gelieve een naam mee te geven.";
        }

        if(empty($data["startYear"])) {
            $errors["startYearError"] = "Gelieve een startjaar mee te geven.";
        } else {
            $workingYears = WorkingYear::all();
            foreach ($workingYears as $workingYear) {
                if ($workingYear->start_year == $data["startYear"]) {
                    $errors["startYearError"] = "Dit werkjaar met startjaar bestaat al.";
                }
            }
        }

		return $errors;
	}
}

<?php

use \Illuminate\Database\Eloquent\Model;
require_once __DIR__ . "/Leader.php";
require_once __DIR__ . "/WorkingYear.php";

class Invoice extends Model
{
	public $timestamps = true;

	public function leader() {
		return $this->belongsTo(Leader::class, 'leader_id');
	}

	public function workingYear() {
		return $this->belongsTo(WorkingYear::class, 'working_year_id');
	}

	public static function validate($data) {
		$errors = [];

		if (empty($data["name"])) {
			$errors["nameError"] = "Naam is verplicht.";
		}

		if (empty($data["leaderId"])) {
			$errors["leaderError"] = "Een leider is verplicht.";
		} else {
			$leader = Leader::find($data["leaderId"]);
			if (empty($leader)) {
				$errors["leaderError"] = "Leider niet gevonden of invalid.";
			}
		}

		if (empty($data["amount"])) {
			$errors["amountError"] = "Bedrag is verplicht.";
		} else if (!is_numeric($data["amount"])) {
			$errors["amountError"] = "Bedrag moet numeriek zijn.";
		}

		return $errors;
	}

	public static function create($data, $invoice) {
		if (!empty($data["name"])) {
			$invoice->name = $data["name"];
		}
		if (!empty($data["leaderId"])) {
			$invoice->leader_id = $data["leaderId"];
		}
		if (!empty($data["workingYearId"])) {
			$invoice->working_year_id = $data["workingYearId"];
		} else {
			$currentWorkingYear = WorkingYear::orderBy('start_year', 'desc')->first();
			if(!empty($currentWorkingYear)) {
				$invoice->working_year_id = $currentWorkingYear->id;
			}
		}
		if (!empty($data["amount"])) {
			$invoice->amount = $data["amount"];
		}
		if (!empty($data["remarks"])) {
			$invoice->description = $data["remarks"];
		}
		return $invoice;
	}
}

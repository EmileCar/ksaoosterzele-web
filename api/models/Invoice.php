<?php

use \Illuminate\Database\Eloquent\Model;

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

		return $errors;
	}

	public static function create($data, $event) {
		if (!empty($data["name"])) {
			$event->name = $data["name"];
		}
		if (!empty($data["datetime"])) {
			$event->datetime = $data["datetime"];
		}
		if (!empty($data["location"])) {
			$event->location = $data["location"];
		}
		if (!empty($data["description"])) {
			$event->description = $data["description"];
		}
		if (!empty($data["timestamp"])) {
			$event->timestamp = $data["timestamp"];
		}
		if (!empty($data["featured"])) {
			$event->featured = $data["featured"];
		}
		if (!empty($data["imageFileName"])) {
			$event->image_file_name = $data["imageFileName"];
		}
		if (!empty($data["url"])) {
			$event->url = $data["url"];
		}
		if (!empty($data["entryPrice"])) {
			$event->entryprice = $data["entryPrice"];
		}
		return $event;
	}
}

<?php

use \Illuminate\Database\Eloquent\Model;

class Event extends Model
{
	public $timestamps = false;

	public static function validate($data) {
		$errors = [];

		if (empty($data["name"])) {
			$errors["name"] = "Naam is verplicht.";
		}

		return $errors;
	}

	public static function create($data, $event) {
		if (!empty($data["name"])) {
			$event->name = $data["name"];
		}
		if (!empty($data["date"])) {
			$event->date = $data["date"];
		}
		if (!empty($data["time"])) {
			$event->time = $data["time"];
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
		if (!empty($data["imgpath"])) {
			$event->imgpath = $data["imgpath"];
		}
		if (!empty($data["url"])) {
			$event->url = $data["url"];
		}
		return $event;
	}
}

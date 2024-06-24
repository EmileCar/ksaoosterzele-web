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
		if (!empty($data["imgpath"])) {
			$event->image_file_name = $data["imgpath"];
		}
		if (!empty($data["url"])) {
			$event->url = $data["url"];
		}
		if (!empty($data["entryPrice"])) {
			$event->entry_price = $data["entryPrice"];
		}
		return $event;
	}
}

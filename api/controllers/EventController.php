<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Event.php';
require_once __DIR__ . '/../models/Account.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';
use Carbon\Carbon;

class EventController extends Controller {

	public function getEvents() {
		$query = Event::where("datetime", '>', Carbon::now())
			->orderBy("featured", "desc")
			->orderBy("datetime", "asc");

		if (isset($_GET['limit']) && is_numeric($_GET['limit'])) {
			$limit = intval($_GET['limit']);
			$query->limit($limit);
		}

		$events = $query->get();

		exit(json_encode($events));
	}


	public function addEvent() {
		$account = Account::is_authenticated();

		$data = json_decode(file_get_contents('php://input'), true);

		$errors = Event::validate($data);

		if (!empty($errors)) {
			ErrorResponse::exitWithError(400, "Validatie fouten gevonden.", $errors);
		}

		$event = new Event();
		$event = Event::create($data, $event);
		$event->save();

		http_response_code(201);
		exit();
	}

	public function updateEvent() {
		$account = Account::is_authenticated();

		$data = json_decode(file_get_contents('php://input'), true);

		if (empty($data["id"])) {
			ErrorResponse::exitWithError(400, "Gelieve een id mee te geven.");
		}

		$event = Event::find($data["id"]);

		if (empty($event)) {
			ErrorResponse::exitWithError(404, "Activiteit niet gevonden.");
		}

		$errors = Event::validate($data);

		if (!empty($errors)) {
			ErrorResponse::exitWithError(400, "Validatie fouten gevonden.", $errors);
		}

		$event = Event::create($data, $event);
		$event->save();

		exit();
	}

	public function getEvent(){
		if(empty($_GET["id"])){
			ErrorResponse::exitWithError(400, "Gelieve een id mee te geven.");
		}

		$event = Event::find($_GET["id"]);

		if (empty($event)) {
			ErrorResponse::exitWithError(404, "Deze activiteit werd niet gevonden.");
		}

		exit(json_encode($event));
	}

	public function getImagePaths() {
		$directory = '../assets/events';
		$filenames = [];
		$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

		if (is_dir($directory)) {
			if ($handle = opendir($directory)) {
				while (($file = readdir($handle)) !== false) {
					$extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
					if ($file !== '.' && $file !== '..' && in_array($extension, $allowedExtensions)) {
						$filenames[] = $file;
					}
				}
				closedir($handle);
			}
		}

		exit(json_encode($filenames));
	}


	public function deleteEvent() {
		$account = Account::is_authenticated();

		if(empty($_GET["id"])){
			ErrorResponse::exitWithError(400, "Gelieve een id mee te geven.");
		}

		$event = Event::find($_GET["id"]);

		if (empty($event)) {
			ErrorResponse::exitWithError(404, "Activiteit niet gevonden.");
		}

		$event->delete();
		exit();
	}

	public function getAllEvents() {
		$account = Account::is_authenticated();

		$events = [];

		if (isset($_GET['past']) && $_GET['past'] === "true") {
			$events = Event::where("datetime", '<', Carbon::now())
				->orderBy("datetime", "desc")
				->get();
		} else {
			$events = Event::where("datetime", '>', Carbon::now())
				->orderBy("datetime", "asc")
				->get();
		}

		exit(json_encode($events));
	}
}


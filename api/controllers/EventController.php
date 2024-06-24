<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Event.php';
require_once __DIR__ . '/../models/Account.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';
use Carbon\Carbon;

class EventController extends Controller {

	public function getEvents() {
		$events = Event::where("datetime", '>', Carbon::now())
			->orderBy("datetime", "asc")
			->get();

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
		if (empty($_SESSION["admin_ksaoosterzele"])){
			ErrorResponse::exitWithError(401);
		}

		$data = json_decode(file_get_contents('php://input'), true);

		if (empty($data["id"])) {
			ErrorResponse::exitWithError(400, "Gelieve een id mee te geven.");
		}

		$event = Event::find($data["id"]);

		if (empty($event)) {
			ErrorResponse::exitWithError(404, "Activiteit niet gevonden.");
		}

		$event = Event::create($data, $event);
		$event->save();

		http_response_code(200);
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

	public function getImagePaths (){
		$directory = '../assets/events';
		$filenames = [];

		if (is_dir($directory)) {
			if ($handle = opendir($directory)) {
				while (($file = readdir($handle)) !== false) {
					if ($file !== '.' && $file !== '..' && pathinfo($file, PATHINFO_EXTENSION) === 'jpg') {
						$filenames[] = $file;
					}
				}
				closedir($handle);
			}
		}

		exit(json_encode($filenames));
	}

	public function deleteEvent() {
		if (empty($_SESSION["admin_ksaoosterzele"])){
			ErrorResponse::exitWithError(401);
		}

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

	public function getPastEvents() {
		if (empty($_SESSION["admin_ksaoosterzele"])){
			ErrorResponse::exitWithError(401);
		}

		$events = Event::where("timestamp", '<', Carbon::now())
			->orderBy("timestamp", "desc")
			->get();
		
		exit(json_encode($events));
	}
}


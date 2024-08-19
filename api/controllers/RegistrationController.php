<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Registration.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';
require_once __DIR__ . '/../responses/RegistrationResponse.php';
require_once __DIR__ . '/../models/WorkingYear.php';
require_once __DIR__ . '/../models/Account.php';
require_once __DIR__ . '/../models/internal/Mailer.php';

class RegistrationController extends Controller {

	public function sendRegistration() {
		$workingYear = WorkingYear::orderBy('start_year', 'desc')->first();

        if (!$workingYear) {
            ErrorResponse::exitWithError(500, 'Er is geen werkjaar actief.');
        }

		$data = json_decode(file_get_contents('php://input'), true);

		$errors = Registration::validate($data);

		if (!empty($errors)) {
			ErrorResponse::exitWithError(400, "Validatie fouten gevonden.", $errors);
		}

		$registration = new Registration();
		$registration = Registration::create($data, $registration);
		$registration->working_year_id = $workingYear->id;
		$registration->save();

		$this->_sendConfirmationMail($registration);

		http_response_code(201);
		exit();
	}

    public function getRegistrations() {
		$account = Account::is_authenticated();

		$workingYear = WorkingYear::orderBy('start_year', 'desc')->first();

        if (!$workingYear) {
			exit(json_encode([]));
        }

        $registrations = Registration::where('working_year_id', $workingYear->id)->get();
		$registrationResponses = [];
		foreach ($registrations as $registration) {
			$registrationResponses[] = new RegistrationResponse($registration);
		}
        exit(json_encode($registrationResponses));
    }

	public function updateRegistration() {
		$account = Account::is_authenticated();

		$data = json_decode(file_get_contents('php://input'), true);

		if(empty($data["id"])){
			ErrorResponse::exitWithError(400, "Gelieve een id mee te geven.");
		}

		$inschrijving = Registration::find($data["id"]);

		if (empty($inschrijving)) {
			ErrorResponse::exitWithError(404, "Inschrijving niet gevonden.");
		}

		$errors = Registration::validate($data);

		if(!empty($errors)){
			ErrorResponse::exitWithError(400, "Validatie fouten gevonden.", $errors);
		}

		$registration = Registration::create($data, $inschrijving);

		$registration->save();

		http_response_code(200);
		exit();
	}

	private function _sendConfirmationMail($registration) {
		$group_name = $registration->group ? $registration->group->name : '/';

		$registrationData = $registration->toArray();
		$registrationData['group_name'] = $group_name;

		// Verstuur bevestigingsmail naar de gebruiker
        $userTemplate = Template::render(__DIR__ . '/../mail_templates/registration_confirmation.php', $registrationData);
        Mailer::send("caron.emile@telenet.be", "Inschrijving Bevestiging", $userTemplate);

        // Verstuur notificatie naar de admin
        $adminTemplate = Template::render(__DIR__ . '/../mail_templates/registration_notification_admin.php', $registrationData);
        //Mailer::send("ksaoosterzele9860@gmail.com", "Nieuwe inschrijving!!", $adminTemplate);
        Mailer::send("caron.emile@telenet.be", "Nieuwe inschrijving!!", $adminTemplate);

		exit();
    }
}
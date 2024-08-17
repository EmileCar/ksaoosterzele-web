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

	public function test_mail () {
		$registration = new Registration();
		$registration->first_name = "Emile";
		$registration->last_name = "Caron";
		$registration->email = "test@test.be";
		$registration->phone = "0499999999";

		$this->_sendConfirmationMail($registration);
	}

	private function _sendConfirmationMail($registration) {
		// Verstuur bevestigingsmail naar de gebruiker
        $userTemplate = Template::render(__DIR__ . '/../mail_templates/registration_confirmation.php', $registration->toArray());
        Mailer::send("caron.emile@telenet.be", "Inschrijving Bevestiging", $userTemplate);

        // Verstuur notificatie naar de admin
        $adminTemplate = Template::render(__DIR__ . '/../mail_templates/registration_notification_admin.php', $registration->toArray());
        //Mailer::send("ksaoosterzele9860@gmail.com", "Nieuwe inschrijving!!", $adminTemplate);
        Mailer::send("caron.emile@telenet.be", "Nieuwe inschrijving!!", $adminTemplate);

		exit();
    }
}
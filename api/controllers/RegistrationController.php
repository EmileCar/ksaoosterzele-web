<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Registration.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';
require_once __DIR__ . '/../responses/RegistrationResponse.php';
require_once __DIR__ . '/../models/WorkingYear.php';
require_once __DIR__ . '/../models/Account.php';

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

        $registrations = Registration::all();
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

	private static function _sendConfirmationMail($registration) {
		$to = $registration->email;
		$subject = "Inschrijving Bevestiging";
		$message = '<html>
		<body style="background-color: #1576D1;font-size: 1.4rem">
			<div class="container" style="background-color: #fff;padding:1rem">
				<h2>Bedankt voor uw inschrijving!</h2>
				<p>Wij hebben uw inschrijvingsgegevens succesvol ontvangen voor ' . $registration->first_name . ' ' . $registration->last_name . '!
				Bedankt voor het inschrijven bij KSA Oosterzele!
				</p>
				<p>Bij opmerkingen of vragen kan u ons altijd bereiken: <a href="https://ksaoosterzele.be/contact">contacteerpagina</a></p>
				<p>De inschrijving wordt pas volledig voltooid wanneer het lidgeld (60 euro) gestort is op de KSA-Rekening BE22390023172547</p>
				<p>Met vriendelijke groeten,</p>
				<p>De leiding van KSA Oosterzele</p>
				<img src="https://www.ksaoosterzele.be/static/media/ksaLogo.687c0869c73880822b5702fbd8a23ada.svg" alt="KSA Oosterzele logo" style="width: 100px; height: 100px;">
			</div>
		</body>
		</html>';
		
		$headers = "From: ksaoosterzele@ksaoosterzele.be\r\n";
		$headers .= "Reply-To: ksaoosterzele9860@gmail.com\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
		mail($to, $subject, $message, $headers);

		//$to = "caron.emile@telenet.be"; //admin
		$to = "ksaoosterzele9860@gmail.com";
		$subject = "Nieuwe inschrijving!!";
		$message = '<html>
		<body style="background-color: #1576D1;font-size: 1.4rem">
			<div class="container" style="background-color: #fff;padding:1rem">
				<h2>Nieuwe inschrijving binnengekomen!</h2>
				<p>Voor ' . $registration->first_name . ' ' . $registration->last_name . ' bij de ' . $registration->group->name .'</p>
				<p>Deze gegevens zijn ontvangen:</p>
				<ul>
					<li>Voornaam: ' . $registration->first_name . '</li>
					<li>Achternaam: ' . $registration->last_name . '</li>
					<li>Geboortedatum: ' . $registration->birthdate . '</li>
					<li>Geslacht: ' . $registration->gender . '</li>
					<li>Geboorteplaats: ' . $registration->birthplace . '</li>
					<li>Voornaam ouder: ' . $registration->parent_first_name . '</li>
					<li>Achternaam ouder: ' . $registration->parent_last_name . '</li>
					<li>Straat en huisnummer: ' . $registration->address . '</li>
					<li>Postcode: ' . $registration->postal_code . '</li>
					<li>Gemeente: ' . $registration->town . '</li>
					<li>Gsm nummer: ' . $registration->phone_number . '</li>
					<li>Telefoonnummer: ' . $registration->telephone_number . '</li>
					<li>Email: ' . $registration->email . '</li>
					<li>Tweede voornaam ouder: ' . $registration->second_parent_first_name . '</li>
					<li>Tweede achternaam ouder: ' . $registration->second_parent_last_name . '</li>
					<li>Tweede straat en huisnummer: ' . $registration->second_address . '</li>
					<li>Tweede postcode: ' . $registration->second_postal_code . '</li>
					<li>Tweede gemeente: ' . $registration->second_town . '</li>
					<li>Tweede gsm nummer: ' . $registration->second_phone_number . '</li>
					<li>Tweede telefoonnummer: ' . $registration->second_telephone_number . '</li>
					<li>Tweede email: ' . $registration->second_email . '</li>
					<li>Toestemming media: ' . $registration->allow_media . '</li>
				</ul>
				<p>Bij problemen of bij fouten contacteer Emile aub</p>
				<img src="https://www.ksaoosterzele.be/static/media/ksaLogo.687c0869c73880822b5702fbd8a23ada.svg" alt="KSA Oosterzele logo" style="width: 100px; height: 100px;">
			</div>
		</body>
		</html>';
		
		$headers = "From: ksaoosterzele@ksaoosterzele.be\r\n";
		$headers .= "Reply-To: caron.emile@telenet.be\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
		mail($to, $subject, $message, $headers);
		mail("caron.emile@telenet.be", $subject, $message, $headers);
	}
}
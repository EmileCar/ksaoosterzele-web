<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Registration.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';

class InschrijvingController extends Controller {

	public function sendInschrijving() {
		$data = json_decode(file_get_contents('php://input'), true);

		$errors = Registration::validate($data);

		if (!empty($errors)) {
			ErrorResponse::exitWithError(400, "Validatie fouten gevonden.", $errors);
		}

		$registration = new Registration();
		$registration->group_id = $data["groupId"];
		$registration->first_name = $data["firstName"];
		$registration->last_name = $data["lastName"];
		$registration->birthdate = $data["birthdate"];
		$registration->gender = $data["gender"];
		$registration->birthplace = $data["birthplace"];
		$registration->parent_first_name = $data["parentFirstName"];
		$registration->parent_last_name = $data["parentLastName"];
		$registration->address = $data["address"];
		$registration->postal_code = $data["postalCode"];
		$registration->town = $data["town"];
		$registration->phone_number = $data["phoneNumber"];
		$registration->telephone_number = $data["telephoneNumber"];
		$registration->email = $data["email"];
		$registration->second_parent_first_name = $data["secondParentFirstName"];
		$registration->second_parent_last_name = $data["secondParentLastName"];
		$registration->second_address = $data["secondAddress"];
		$registration->second_postal_code = $data["secondPostalCode"];
		$registration->second_town = $data["secondTown"];
		$registration->second_phone_number = $data["secondPhoneNumber"];
		$registration->second_telephone_number = $data["secondTelephoneNumber"];
		$registration->second_email = $data["secondEmail"];
		$registration->allow_media = $data["allowMedia"];
		$registration->save();

		$this->_sendConfirmationMail($registration);

		http_response_code(201);
		exit();
	}

    public function getInschrijvingen() {
		if (empty($_SESSION["admin_ksaoosterzele"])){
			ErrorResponse::exitWithError(401);
		}

        $inschrijvingen = Registration::get();
        exit(json_encode($inschrijvingen));
    }

	public function updateInschrijving() {
		if (empty($_SESSION["admin_ksaoosterzele"])){
			ErrorResponse::exitWithError(401);
		}

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
		
		$inschrijving->tak = $data["tak"];
		$inschrijving->voornaam = $data["voornaam"];
		$inschrijving->achternaam = $data["achternaam"];
		$inschrijving->geboortedatum = $data["geboortedatum"];
		$inschrijving->geslacht = $data["geslacht"];
		$inschrijving->geboorteplaats = $data["geboorteplaats"];
		$inschrijving->voornaamOuder = $data["voornaamOuder"];
		$inschrijving->achternaamOuder = $data["achternaamOuder"];
		$inschrijving->straatEnHuisnummer = $data["straatEnHuisnummer"];
		$inschrijving->postcode = $data["postcode"];
		$inschrijving->gemeente = $data["gemeente"];
		$inschrijving->gsmNummer = $data["gsmNummer"];
		$inschrijving->telefoonnummer = $data["telefoonnummer"];
		$inschrijving->email = $data["email"];
		$inschrijving->tweedeVoornaamOuder = $data["tweedeVoornaamOuder"];
		$inschrijving->tweedeAchternaamOuder = $data["tweedeAchternaamOuder"];
		$inschrijving->tweedeStraatEnHuisnummer = $data["tweedeStraatEnHuisnummer"];
		$inschrijving->tweedePostcode = $data["tweedePostcode"];
		$inschrijving->tweedeGemeente = $data["tweedeGemeente"];
		$inschrijving->tweedeGsmNummer = $data["tweedeGsmNummer"];
		$inschrijving->tweedeTelefoonnummer = $data["tweedeTelefoonnummer"];
		$inschrijving->tweedeEmail = $data["tweedeEmail"];
		$inschrijving->allowMedia = $data["allowMedia"];
		$inschrijving->save();

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
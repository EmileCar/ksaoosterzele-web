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

		$inschrijving = new Registration();
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

		$this->_sendConfirmationMail($data);

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

	private static function _sendConfirmationMail($data) {
		$to = $data["email"];
		$subject = "Inschrijving Bevestiging";
		$message = '<html>
		<body style="background-color: #1576D1;font-size: 1.4rem">
			<div class="container" style="background-color: #fff;padding:1rem">
				<h2>Bedankt voor uw inschrijving!</h2>
				<p>Wij hebben uw inschrijvingsgegevens succesvol ontvangen voor ' . $data["voornaam"] . ' ' . $data["achternaam"] . '!
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
				<p>Voor ' . $data["voornaam"] . ' ' . $data["achternaam"] . ' bij de ' . $data["tak"] .'</p>
				<p>Deze gegevens zijn ontvangen:</p>
				<ul>
					<li>Voornaam: ' . $data["voornaam"] . '</li>
					<li>Achternaam: ' . $data["achternaam"] . '</li>
					<li>Geboortedatum: ' . $data["geboortedatum"] . '</li>
					<li>Geslacht: ' . $data["geslacht"] . '</li>
					<li>Geboorteplaats: ' . $data["geboorteplaats"] . '</li>
					<li>Voornaam ouder: ' . $data["voornaamOuder"] . '</li>
					<li>Achternaam ouder: ' . $data["achternaamOuder"] . '</li>
					<li>Straat en huisnummer: ' . $data["straatEnHuisnummer"] . '</li>
					<li>Postcode: ' . $data["postcode"] . '</li>
					<li>Gemeente: ' . $data["gemeente"] . '</li>
					<li>Gsm nummer: ' . $data["gsmNummer"] . '</li>
					<li>Telefoonnummer: ' . $data["telefoonnummer"] . '</li>
					<li>Email: ' . $data["email"] . '</li>
					<li>Tweede voornaam ouder: ' . $data["tweedeVoornaamOuder"] . '</li>
					<li>Tweede achternaam ouder: ' . $data["tweedeAchternaamOuder"] . '</li>
					<li>Tweede straat en huisnummer: ' . $data["tweedeStraatEnHuisnummer"] . '</li>
					<li>Tweede postcode: ' . $data["tweedePostcode"] . '</li>
					<li>Tweede gemeente: ' . $data["tweedeGemeente"] . '</li>
					<li>Tweede gsm nummer: ' . $data["tweedeGsmNummer"] . '</li>
					<li>Tweede telefoonnummer: ' . $data["tweedeTelefoonnummer"] . '</li>
					<li>Tweede email: ' . $data["tweedeEmail"] . '</li>
					<li>Toestemming media: ' . $data["allowMedia"] . '</li>
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
<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/MattentaartOrder.php';
require_once __DIR__ . '/../models/MattentaartLeidingOrder.php';
require_once __DIR__ . '/../models/MattentaartData.php';
use Carbon\Carbon;

class MattentaartOrderController extends Controller {
	
	public function addMattentaartenOrder() {
		$requestData = json_decode(file_get_contents('php://input'), true);
		if (empty($requestData)) {
			http_response_code(400);
			exit("Geen data ontvangen");
		}
	
		$validationErrors = MattentaartOrder::validate($requestData);
		if (!empty($validationErrors)) {
			http_response_code(400);
			exit(json_encode($validationErrors));
		}
	
		$order = new MattentaartOrder();
		$order->name = $requestData["name"];
		$order->amountOfZakjes = $requestData["amountOfZakjes"];
		$order->deliveryMethod = $requestData["deliveryMethod"];
		$order->timePeriod = $requestData["timePeriod"];
		$order->email = $requestData["email"];
		$order->address = $requestData["address"];
		$order->phoneNumber = $requestData["phoneNumber"];
		$order->paymentMethod = $requestData["paymentMethod"];
		$order->opmerkingen = $requestData["opmerkingen"];
		$order->payed = false;
		$order->delivered = false;
		//$order->save();
		//$this->_sendConfirmationMail($order);
		http_response_code(400);
		exit(json_encode("Bestellingen zijn gesloten"));
		//exit(json_encode($order));
	}

	public function getMattentaartenOrders() {
		if (empty($_SESSION["admin_ksaoosterzele"])){
			http_response_code(401);
			exit("U bent niet gemachtigd om deze actie uit te voeren.");
		}

		$orders = MattentaartOrder::all();
		exit(json_encode($orders));
	}

	public function getMattentaartData(){
		if (empty($_SESSION["admin_ksaoosterzele"])){
			http_response_code(401);
			exit("U bent niet gemachtigd om deze actie uit te voeren.");
		}

		$data = MattentaartData::first();
		$leidingOrders = MattentaartLeidingOrder::all();
		
		// bereken totaal bestelde mattentaarten
		$orders = MattentaartOrder::all();
		$totalOrderedZakjes = 0;
		foreach ($orders as $order) {
			$totalOrderedZakjes += $order->amountOfZakjes;
		}
		foreach ($leidingOrders as $order) {
			$totalOrderedZakjes += $order->amountOfZakjes;
		}
		$data->totalOrderedZakjes = $totalOrderedZakjes;
		$data->totalOrdered = $totalOrderedZakjes * 3;

		$totalOrderedZakjesPaid = 0;
		$totalOrderedZakjesPaidFromBestellingen = 0;
		foreach ($orders as $order) {
			if ($order->payed) {
				$totalOrderedZakjesPaidFromBestellingen += $order->amountOfZakjes;
			}
		}
		$totalOrderedZakjesPaid += $totalOrderedZakjesPaidFromBestellingen;
		foreach ($leidingOrders as $order) {
			if ($order->payed) {
				$totalOrderedZakjesPaid += $order->amountOfZakjes;
			}
		}
		$data->totalOrderedZakjesPaid = $totalOrderedZakjesPaid;
		$data->totalOrderedPaid = $totalOrderedZakjesPaid * 3;

		$totalOrderedZakjesDelivered = 0;
		foreach ($orders as $order) {
			if ($order->delivered) {
				$totalOrderedZakjesDelivered += $order->amountOfZakjes;
			}
		}
		foreach ($leidingOrders as $order) {
			if ($order->delivered) {
				$totalOrderedZakjesDelivered += $order->amountOfZakjes;
			}
		}
		$data->totalOrderedZakjesDelivered = $totalOrderedZakjesDelivered;
		$data->totalOrderedDelivered = $totalOrderedZakjesDelivered * 3;
		
		// bereken omzet
		$totalIncome = 0;
		$totalIncome = $this->_calculatePrijs($totalOrderedZakjesPaidFromBestellingen);
		foreach ($leidingOrders as $order) {
			if ($order->payed) {
				$totalIncome += $order->totalPrice;
			}
		}
		$data->totalIncome = $totalIncome;
		exit(json_encode($data));
	}

	public function getLeidingOrders() {
		if (empty($_SESSION["admin_ksaoosterzele"])){
			http_response_code(401);
			exit("U bent niet gemachtigd om deze actie uit te voeren.");
		}

		$orders = MattentaartLeidingOrder::all();
		exit(json_encode($orders));
	}

	public function addLeidingOrder(){
		if (empty($_SESSION["admin_ksaoosterzele"])){
			http_response_code(401);
			exit("U bent niet gemachtigd om deze actie uit te voeren.");
		}

		$requestData = json_decode(file_get_contents('php://input'), true);
		if (empty($requestData)) {
			http_response_code(400);
			exit("Geen data ontvangen");
		}
	
		$order = new MattentaartLeidingOrder();
		$order->name = $requestData["name"];
		$order->amountOfZakjes = $requestData["amountOfZakjes"];
		$order->payed = false;
		$order->delivered = false;
		$order->save();
		exit(json_encode($order));
	}

	public function updateMattentaartenOrder(){
		if (empty($_SESSION["admin_ksaoosterzele"])){
			http_response_code(401);
			exit("U bent niet gemachtigd om deze actie uit te voeren.");
		}

		$requestData = json_decode(file_get_contents('php://input'), true);
		if (empty($requestData)) {
			http_response_code(400);
			exit("Geen data ontvangen");
		}
	
		$order = MattentaartOrder::find($requestData["id"]);
		$order->name = $requestData["name"];
		$order->amountOfZakjes = $requestData["amountOfZakjes"];
		$order->deliveryMethod = $requestData["deliveryMethod"];
		$order->timePeriod = $requestData["timePeriod"];
		$order->email = $requestData["email"];
		$order->address = $requestData["address"];
		$order->phoneNumber = $requestData["phoneNumber"];
		$order->paymentMethod = $requestData["paymentMethod"];
		$order->opmerkingen = $requestData["opmerkingen"];
		$order->payed = $requestData["payed"];
		$order->delivered = $requestData["delivered"];
		$order->save();
		http_response_code(203);
		exit(json_encode($order));
	
	}

	public function updateLeidingOrder(){
		if (empty($_SESSION["admin_ksaoosterzele"])){
			http_response_code(401);
			exit("U bent niet gemachtigd om deze actie uit te voeren.");
		}

		$requestData = json_decode(file_get_contents('php://input'), true);
		if (empty($requestData)) {
			http_response_code(400);
			exit("Geen data ontvangen");
		}
	
		$order = MattentaartLeidingOrder::find($requestData["id"]);
		$order->name = $requestData["name"];
		$order->amountOfZakjes = $requestData["amountOfZakjes"];
		$order->payed = $requestData["payed"];
		$order->delivered = $requestData["delivered"];
		$order->save();
		exit(json_encode($order));
	}
	
	private static function _sendConfirmationMail($data) {
		$to = $data["email"];
		$subject = "Mattentaartenbestelling bevestiging";
		$message = '<html>
		<body style="background-color: #1576D1;font-size: 1.4rem">
			<div class="container" style="background-color: #fff;padding:1rem">
				<h2>Bedankt voor uw bestelling!</h2>
				<p>Wij hebben uw bestelling succesvol ontvangen voor ' . $data["name"] . '<br/>Hier ziet u nog een overzicht:</p>
				<p>Uw bestelling van <strong style="font-weight: bold">' . $data["amountOfZakjes"] .' zakjes</strong> bedraagt <strong style="font-weight: bold">€' . self::_calculatePrijs($data["amountOfZakjes"]) .'</strong> </p>
				' . ($data["deliveryMethod"] === "thuislevering" 
					? '<p>Uw bestelling zal thuis geleverd worden op ' . ($data["timePeriod"] === "zaterdag" ? "zaterdag 16 maart (we rijden rond om 9u30-12u30 en 13u30-17u30)" : "zondag 17 maart (we rijden rond om 10u en 17u)") . ' op het adres ' . $data["address"] . '</p>'
					: '<p>Uw bestelling zal klaarliggen in <strong style="font-weight: bold">den amb8</strong> op ' . ($data["timePeriod"] === "zaterdag" ? "zaterdag 16 maart tussen 9u30-12u30 en 13u30 en 17u30" : "zondag 17 maart tussen 10u en 17u30 ") . '(Lange ambachtstraat 42, 9860 Oosterzele)</p>') .
				'<p>Uw betaling zal gebeuren via <strong style="font-weight: bold">' . ($data["paymentMethod"] === "cash" ? "cash of payconic</strong>" : "overschijving</strong> op rekeningnummer BE22390023172547. Gelieve daarbij te vermelden <strong style='font-weight: bold'>NAAM + AANTAL ZAKJES</strong>") . '</p> ' .
				(!empty($data["opmerkingen"]) ? '<p>Uw Opmerkingen: <span style="font-style: italic">' . $data["opmerkingen"] . '</span></p>' : '') . '
				<img src="https://www.ksaoosterzele.be/static/media/ksaLogo.687c0869c73880822b5702fbd8a23ada.svg" alt="KSA Oosterzele logo" style="width: 100px; height: 100px;"> ';
				
		$headers = "From: ksaoosterzele@ksaoosterzele.be\r\n";
		$headers .= "Reply-To: ksaoosterzele9860@gmail.com\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
		//mail($to, $subject, $message, $headers);

		$to = "caron.emile@telenet.be"; //admin
		//$to = "ksaoosterzele9860@gmail.com";
		$subject = "Nieuwe Mattentaartenbestelling!!";
		$message = '<html>
		<body style="background-color: #1576D1;font-size: 1.4rem">
			<div class="container" style="background-color: #fff;padding:1rem">
				<h2>Nieuwe bestelling!</h2>
				<p>Er is een nieuwe bestelling geplaatst door ' . $data["name"] . '</p>
				<p>De bestelling van ' . $data["amountOfZakjes"] .' zakjes bedraagt €' . self::_calculatePrijs($data["amountOfZakjes"]) .' </p>
				<p>De bestelling zal geleverd worden op ' . ($data["timePeriod"] === "zaterdag" ? "zaterdag 16 maart tussen 10u en 17u" : "zondag 17 maart tussen 11u en 17u ") . '</p>
				<p>De betaling zal gebeuren via ' . ($data["paymentMethod"] === "cash" ? "cash of payconic" : "overschijving") . '</p>
				<p>U kan de bestelling bevestigen via de admin panel</p>
				<img src="https://www.ksaoosterzele.be/static/media/ksaLogo.687c0869c73880822b5702fbd8a23ada.svg" alt="KSA Oosterzele logo" style="width: 100px; height: 100px;"> ;
			</div>
		</body>
		</html>';
		
		$headers = "From: ksaoosterzele@ksaoosterzele.be\r\n";
		$headers .= "Reply-To: caron.emile@telenet.be\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
		//mail($to, $subject, $message, $headers);
		//mail("caron.emile@telenet.be", $subject, $message, $headers);
	}

	public function sendMailToCustomer(){
		if (empty($_GET["id"])){
			http_response_code(400);
			exit("Geen id ontvangen");
		}
		$id = $_GET["id"];
		$order = MattentaartOrder::where("id", $id)->first();
		if (empty($order)) {
			http_response_code(400);
			exit("Geen data");
		}
		$this->_sendMailToCustomer($order);
		exit("Mail verzonden");
	}

	private static function _sendMailToCustomer($data) {
		$to = $data["email"];
		$subject = "Mattentaartenbestelling bevestiging";
		$message = '<html>
		<body style="background-color: #1576D1;font-size: 1.4rem">
			<div class="container" style="background-color: #fff;padding:1rem">
				<h2>Bedankt voor uw bestelling!</h2>
				<p>Wij hebben uw bestelling succesvol ontvangen voor ' . $data["name"] . '<br/>Hier ziet u nog een overzicht:</p>
				<p>Uw bestelling van <strong style="font-weight: bold">' . $data["amountOfZakjes"] .' zakjes</strong> bedraagt <strong style="font-weight: bold">€' . self::_calculatePrijs($data["amountOfZakjes"]) .'</strong> </p>
				' . ($data["deliveryMethod"] === "thuislevering" 
					? '<p>Uw bestelling zal thuis geleverd worden op ' . ($data["timePeriod"] === "zaterdag" ? "zaterdag 16 maart (we rijden rond om 9u30-12u30 en 13u30-17u30)" : "zondag 17 maart (we rijden rond om 10u en 17u)") . ' op het adres ' . $data["address"] . '</p>'
					: '<p>Uw bestelling zal klaarliggen in <strong style="font-weight: bold">den amb8</strong> op ' . ($data["timePeriod"] === "zaterdag" ? "zaterdag 16 maart tussen 9u30-12u30 en 13u30 en 17u30" : "zondag 17 maart tussen 10u en 17u30 ") . '(Lange ambachtstraat 42, 9860 Oosterzele)</p>') .
				'<p>Uw betaling zal gebeuren via <strong style="font-weight: bold">' . ($data["paymentMethod"] === "cash" ? "cash of payconic</strong>" : "overschijving</strong> op rekeningnummer BE22390023172547. Gelieve daarbij te vermelden <strong style='font-weight: bold'>NAAM + AANTAL ZAKJES</strong>") . '</p> ' .
				(!empty($data["opmerkingen"]) ? '<p>Uw Opmerkingen: <span style="font-style: italic">' . $data["opmerkingen"] . '</span></p>' : '') . '
				<img src="https://www.ksaoosterzele.be/static/media/ksaLogo.687c0869c73880822b5702fbd8a23ada.svg" alt="KSA Oosterzele logo" style="width: 100px; height: 100px;"> ';
				
		$headers = "From: ksaoosterzele@ksaoosterzele.be\r\n";
		$headers .= "Reply-To: ksaoosterzele9860@gmail.com\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
		mail($to, $subject, $message, $headers);
	}


	private static function _checkAllowedOrigin(){
		$allowedOrigins = [
			'http://localhost:3000',
			'https://ksaoosterzele.be' ,
			'http://ksaoosterzele.be'
		 ];
		 
		 if(in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins))
		 {
			 $http_origin = $_SERVER['HTTP_ORIGIN'];
		 } else {
			 $http_origin = "https://ksaoosterzele.be";
		 }

		return $http_origin;
	}

	private static function _calculatePrijs($amountOfZakjes) {
		if ($amountOfZakjes < 0) {
			return 0;
		}
	
		$pricePerZakje = 6;
		$totalPrice = $amountOfZakjes * $pricePerZakje;
	
		if ($amountOfZakjes >= 3) {
			$numberOfDiscountedZakjes = floor($amountOfZakjes / 3);
			$discountedPricePerZakje = $pricePerZakje / 2;
			$totalPrice -= $numberOfDiscountedZakjes * $discountedPricePerZakje;
		}
	
		return $totalPrice;
	}

}


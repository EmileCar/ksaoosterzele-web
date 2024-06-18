<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Account.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';
require_once __DIR__ . '/../responses/AccountResponse.php';

class AccountController extends Controller {

	public function validate_credentials() {
		$requestData = json_decode(file_get_contents('php://input'), true);

		if (empty($requestData["username"]) || empty($requestData["password"])) {
			ErrorResponse::exitWithError(400, "Username and password are required.");
		}

		$account = Account::where('username', $requestData["username"])->where('password', $requestData["password"])->first();

		if (empty($account)) {
			ErrorResponse::exitWithError(401, "De inloggegevens zijn onjuist.");
		}

		$_SESSION["account_ksaoosterzele"] = $account->id;
		exit();
	}

	public function get_account() {
		$account = Account::is_authenticated();
		$accountResponse = new AccountResponse($account);

		exit(json_encode($accountResponse->toArray()));
	}

	public function remove_credentials() {
		if(!empty($_SESSION["account_ksaoosterzele"])){
			unset($_SESSION["account_ksaoosterzele"]);
			exit(json_encode("Session removed"));
		}
	}
}


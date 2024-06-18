<?php

use \Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
	public $timestamps = true;

	public function group() {
        return $this->belongsTo(Group::class, 'group_id');
    }

	public static function validate($data) {
		$errors = [];

		$takError = self::validateTak($data['tak']);
		if (!empty($takError)) {
				$errors["takError"] = $takError;
		}

		$voornaamError = self::validateVoornaam($data['voornaam']);
		if (!empty($voornaamError)) {
				$errors["voornaamError"] = $voornaamError;
		}

		$achternaamError = self::validateAchternaam($data['achternaam']);
		if (!empty($achternaamError)) {
				$errors["achternaamError"] = $achternaamError;
		}

		$geboortedatumError = self::validateGeboortedatum($data['geboortedatum']);
		if (!empty($geboortedatumError)) {
				$errors["geboortedatumError"] = $geboortedatumError;
		}

		$geslachtError = self::validateGeslacht($data['geslacht']);
		if (!empty($geslachtError)) {
				$errors["geslachtError"] = $geslachtError;
		}

		$geboorteplaatsError = self::validateGeboorteplaats($data['geboorteplaats']);
		if (!empty($geboorteplaatsError)) {
				$errors["geboorteplaatsError"] = $geboorteplaatsError;
		}

		$voornaamOuderError = self::validateVoornaamOuder($data['voornaamOuder'], false);
		if (!empty($voornaamOuderError)) {
				$errors["voornaamOuderError"] = $voornaamOuderError;
		}

		$achternaamOuderError = self::validateAchternaamOuder($data['achternaamOuder'], false);
		if (!empty($achternaamOuderError)) {
				$errors["achternaamOuderError"] = $achternaamOuderError;
		}

		$straatEnHuisnummerError = self::validateStraatEnHuisnummer($data['straatEnHuisnummer'], false);
		if (!empty($straatEnHuisnummerError)) {
				$errors["straatEnHuisnummerError"] = $straatEnHuisnummerError;
		}

		$postcodeError = self::validatePostcode($data['postcode'], false);
		if (!empty($postcodeError)) {
				$errors["postcodeError"] = $postcodeError;
		}

		$gemeenteError = self::validateGemeente($data['gemeente'], false);
		if (!empty($gemeenteError)) {
				$errors["gemeenteError"] = $gemeenteError;
		}

		$gsmNummerError = self::validateGsmNummer($data['gsmNummer'], false);
		if (!empty($gsmNummerError)) {
				$errors["gsmNummerError"] = $gsmNummerError;
		}

		$telefoonnummerError = self::validateTelefoonnummer($data['telefoonnummer']);
		if (!empty($telefoonnummerError)) {
				$errors["telefoonnummerError"] = $telefoonnummerError;
		}

		$emailError = self::validateEmail($data['email'], false);
		if (!empty($emailError)) {
				$errors["emailError"] = $emailError;
		}

		$tweedeVoornaamOuderError = self::validateVoornaamOuder($data['tweedeVoornaamOuder'], true);
		if (!empty($tweedeVoornaamOuderError)) {
				$errors["tweedeVoornaamOuderError"] = $tweedeVoornaamOuderError;
		}

		$tweedeAchternaamOuderError = self::validateAchternaamOuder($data['tweedeAchternaamOuder'], true);
		if (!empty($tweedeAchternaamOuderError)) {
				$errors["tweedeAchternaamOuderError"] = $tweedeAchternaamOuderError;
		}

		$tweedeStraatEnHuisnummerError = self::validateStraatEnHuisnummer($data['tweedeStraatEnHuisnummer'], true);
		if (!empty($tweedeStraatEnHuisnummerError)) {
				$errors["tweedeStraatEnHuisNummerError"] = $tweedeStraatEnHuisnummerError;
		}

		$tweedePostcodeError = self::validatePostcode($data['tweedePostcode'], true);
		if (!empty($tweedePostcodeError)) {
				$errors["tweedePostcodeError"] = $tweedePostcodeError;
		}

		$tweedeGemeenteError = self::validateGemeente($data['tweedeGemeente'], true);
		if (!empty($tweedeGemeenteError)) {
				$errors["tweedeGemeenteError"] = $tweedeGemeenteError;
		}

		$tweedeGsmNummerError = self::validateGsmNummer($data['tweedeGsmNummer'], true);
		if (!empty($tweedeGsmNummerError)) {
				$errors["tweedeGsmNummerError"] = $tweedeGsmNummerError;
		}

		$tweedeTelefoonnummerError = self::validateTelefoonnummer($data['tweedeTelefoonnummer']);
		if (!empty($tweedeTelefoonnummerError)) {
				$errors["tweedeTelefoonnummerError"] = $tweedeTelefoonnummerError;
		}

		$tweedeEmailError = self::validateEmail($data['tweedeEmail'], true);
		if (!empty($tweedeEmailError)) {
				$errors["tweedeEmailError"] = $tweedeEmailError;
		}

		return $errors;
	}

	private static function validateTak($tak) {
		$error = null;

		if (empty($tak)) {
				$error = 'Gelieve een tak in te vullen';
		} elseif ($tak !== "Leeuwkes" && $tak !== "Jongknapen" && $tak !== "Knapen" && $tak !== "Jonghernieuwers") {
				$error = 'Tak is niet geldig';
		}

		return $error;
	}

	private static function validateVoornaam($voornaam) {
		$error = null;

		if (empty($voornaam)) {
				$error = 'Gelieve een voornaam in te vullen';
		} elseif (strlen($voornaam) < 2) {
				$error = 'Voornaam moet minstens 2 karakters bevatten';
		} elseif (strlen($voornaam) > 50) {
				$error = 'Voornaam mag maximum 50 karakters bevatten';
		}

		return $error;
	}

	private static function validateAchternaam($achternaam) {
		$error = null;

		if (empty($achternaam)) {
				$error = 'Gelieve een achternaam in te vullen';
		} elseif (strlen($achternaam) < 2) {
				$error = 'Achternaam moet minstens 2 karakters bevatten';
		} elseif (strlen($achternaam) > 50) {
				$error = 'Achternaam mag maximum 50 karakters bevatten';
		}

		return $error;
	}

	private static function validateGeboortedatum($geboortedatum) {
		$error = null;

		if (empty($geboortedatum)) {
				$error = 'Gelieve een geboortedatum in te vullen';
		} elseif (self::calculateAge($geboortedatum) < 5) {
				$error = 'Uw kind is te jong om deel te maken van de ksa.';
		} elseif (self::calculateAge($geboortedatum) > 16) {
				$error = 'Uw kind is te oud om deel te maken van de ksa. Hij zou al leiding moeten zijn.';
		}

		return $error;
	}

	private static function validateGeslacht($geslacht) {
		$error = null;

		if (empty($geslacht)) {
				$error = 'Gelieve een geslacht in te vullen';
		} elseif ($geslacht !== 'M' && $geslacht !== 'V' && $geslacht !== 'X') {
				$error = 'Geslacht moet M, V of X zijn';
		}

		return $error;
	}

	private static function validateGeboorteplaats($geboorteplaats) {
		$error = null;

		return $error;
	}

	private static function validateVoornaamOuder($voornaamOuder, $second) {
		$error = null;

		if (empty($voornaamOuder)) {
			if($second) {
				return $error;
			}
			$error = 'Gelieve een voornaam in te vullen';
		} elseif (strlen($voornaamOuder) < 2) {
				$error = 'Voornaam moet minstens 2 karakters bevatten';
		} elseif (strlen($voornaamOuder) > 50) {
				$error = 'Voornaam mag maximum 50 karakters bevatten';
		}

		return $error;
	}

	private static function validateAchternaamOuder($achternaamOuder, $second) {
		$error = null;

		if (empty($achternaamOuder)) {
			if($second) {
				return $error;
			}
				$error = 'Gelieve een achternaam in te vullen';
		} elseif (strlen($achternaamOuder) < 2) {
				$error = 'Achternaam moet minstens 2 karakters bevatten';
		} elseif (strlen($achternaamOuder) > 50) {
				$error = 'Achternaam mag maximum 50 karakters bevatten';
		}

		return $error;
	}

	private static function validateStraatEnHuisnummer($straatEnHuisnummer, $second) {
		$error = null;

		if (empty($straatEnHuisnummer)) {
			if($second) {
				return $error;
			}
			$error = 'Gelieve een straat en huisnummer in te vullen';
		}

		return $error;
	}

	private static function validatePostcode($postcode, $second) {
		$error = null;

		if (empty($postcode)) {
			if($second) {
				return $error;
			}
				$error = 'Gelieve een postcode in te vullen';
		} elseif (!preg_match('/^[0-9]{4}$/', $postcode)) {
				$error = 'Postcode moet 4 cijfers bevatten';
		}

		return $error;
	}

	private static function validateGemeente($gemeente, $second) {
		$error = null;

		if (empty($gemeente)) {
			if($second) {
				return $error;
			}
				$error = 'Gelieve een gemeente in te vullen';
		}

		return $error;
	}

	private static function validateGsmNummer($gsmNummer, $second) {
		$error = null;

		if (empty($gsmNummer)) {
			if($second) {
				return $error;
			}
				$error = 'Gelieve een gsm nummer in te vullen';
		} elseif (!preg_match('/^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/', $gsmNummer)) {
				$error = 'Gsm nummer is niet geldig (formaat: 04xxxxxxxx of +324xxxxxxxx)';
		}

		return $error;
	}

	private static function validateTelefoonnummer($telefoonnummer) {
		$error = null;

		if (empty($telefoonnummer)) {
				return $error;
		} elseif (!preg_match('/^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/', $telefoonnummer)) {
				$error = 'Telefoonnummer is niet geldig (gebruik geen / en spaties)';
		}

		return $error;
	}

	private static function validateEmail($email, $second) {
		$error = null;

		if (empty($email)) {
			if($second) {
				return $error;
			}
				$error = 'Gelieve een email in te vullen';
		} elseif (!preg_match('/^.+?@.+?\..+$/', $email)) {
				$error = 'Email is niet geldig (moet een @ en een . bevatten)';
		}

		return $error;
	}

	private static function calculateAge($geboortedatum) {
		if (empty($geboortedatum)) {
				return null;
		}

		$today = new DateTime();
		$birthDate = new DateTime($geboortedatum);
		$age = $today->format('Y') - $birthDate->format('Y');
		$monthDifference = $today->format('m') - $birthDate->format('m');

		if ($monthDifference < 0 || ($monthDifference === 0 && $today->format('d') < $birthDate->format('d'))) {
				$age--;
		}

		return $age;
	}
}

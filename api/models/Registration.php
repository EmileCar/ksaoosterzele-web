<?php

use \Illuminate\Database\Eloquent\Model;
require_once 'Group.php';

class Registration extends Model
{
	public $timestamps = true;

	public function group() {
        return $this->belongsTo(Group::class, 'group_id');
    }

	public static function validate($data) {
		$errors = [];

		$group_error = self::validate_group($data['groupId']);
		if (!empty($group_error)) {
			$errors["groupError"] = $group_error;
		}

		$first_name_error = self::validate_first_name($data['firstName']);
		if (!empty($first_name_error)) {
			$errors["firstNameError"] = $first_name_error;
		}

		$last_name_error = self::validate_last_name($data['lastName']);
		if (!empty($last_name_error)) {
			$errors["lastNameError"] = $last_name_error;
		}

		$birthdate_error = self::validate_birth_date($data['birthdate']);
		if (!empty($birthdate_error)) {
			$errors["birthdateError"] = $birthdate_error;
		}

		$gender_error = self::validate_gender($data['gender']);
		if (!empty($gender_error)) {
			$errors["genderError"] = $gender_error;
		}

		$birthplace_error = self::validate_birth_place($data['birthplace']);
		if (!empty($birthplace_error)) {
			$errors["birthplaceError"] = $birthplace_error;
		}

        $parent_first_name_error = self::validate_parent_first_name($data['parentFirstName'], false);
        if (!empty($parent_first_name_error)) {
            $errors["parentFirstNameError"] = $parent_first_name_error;
        }

        $parent_last_name_error = self::validate_parent_last_name($data['parentLastName'], false);
        if (!empty($parent_last_name_error)) {
            $errors["parentLastNameError"] = $parent_last_name_error;
        }

        $address_error = self::validate_address($data['address'], false);
        if (!empty($address_error)) {
            $errors["addressError"] = $address_error;
        }

        $postal_code_error = self::validate_postal_code($data['postalCode'], false);
        if (!empty($postal_code_error)) {
            $errors["postalCodeError"] = $postal_code_error;
        }

        $town_error = self::validate_town($data['town'], false);
        if (!empty($town_error)) {
            $errors["townError"] = $town_error;
        }

        $phone_number_error = self::validate_phone_number($data['phoneNumber'], false);
        if (!empty($phone_number_error)) {
            $errors["phoneNumberError"] = $phone_number_error;
        }

		$telephone_number_error = self::validate_telephone_number($data['telephoneNumber'], false);
		if (!empty($telephone_number_error)) {
			$errors["telephoneNumberError"] = $telephone_number_error;
		}

        $email_error = self::validate_email($data['email'], false);
        if (!empty($email_error)) {
            $errors["emailError"] = $email_error;
        }

        $second_parent_first_name_error = self::validate_parent_first_name($data['secondParentFirstName'], true);
        if (!empty($second_parent_first_name_error)) {
            $errors["secondParentFirstNameError"] = $second_parent_first_name_error;
        }

        $second_parent_last_name_error = self::validate_parent_last_name($data['secondParentLastName'], true);
        if (!empty($second_parent_last_name_error)) {
            $errors["secondParentLastNameError"] = $second_parent_last_name_error;
        }

        $second_address_error = self::validate_address($data['secondAddress'], true);
        if (!empty($second_address_error)) {
            $errors["secondAddressError"] = $second_address_error;
        }

        $second_postal_code_error = self::validate_postal_code($data['secondPostalCode'], true);
        if (!empty($second_postal_code_error)) {
            $errors["secondPostalCodeError"] = $second_postal_code_error;
        }

        $second_town_error = self::validate_town($data['secondTown'], true);
        if (!empty($second_town_error)) {
            $errors["secondTownError"] = $second_town_error;
        }

        $second_phone_number_error = self::validate_phone_number($data['secondPhoneNumber'], true);
        if (!empty($second_phone_number_error)) {
            $errors["secondPhoneNumberError"] = $second_phone_number_error;
        }

		$tweedeTelefoonnummerError = self::validate_telephone_number($data['secondPhoneNumber'], true);
		if (!empty($tweedeTelefoonnummerError)) {
			$errors["secondPhoneNumberError"] = $tweedeTelefoonnummerError;
		}

        $second_email_error = self::validate_email($data['secondEmail'], true);
        if (!empty($second_email_error)) {
            $errors["secondEmailError"] = $second_email_error;
        }

		return $errors;
	}

	private static function validate_group($group_id) {
		$error = null;

		if (empty($group_id)) {
			$error = 'Gelieve een tak in te vullen';
		} elseif (!Group::find($group_id)) {
			$error = 'Tak bestaat niet';
		}

		return $error;
	}

	private static function validate_first_name($first_name) {
		$error = null;

		if (empty($first_name)) {
			$error = 'Gelieve een voornaam in te vullen';
		} elseif (strlen($first_name) < 2) {
			$error = 'Voornaam moet minstens 2 karakters bevatten';
		} elseif (strlen($first_name) > 50) {
			$error = 'Voornaam mag maximum 50 karakters bevatten';
		}

		return $error;
	}

	private static function validate_last_name($last_name) {
		$error = null;

		if (empty($last_name)) {
			$error = 'Gelieve een achternaam in te vullen';
		} elseif (strlen($last_name) < 2) {
			$error = 'Achternaam moet minstens 2 karakters bevatten';
		} elseif (strlen($last_name) > 50) {
			$error = 'Achternaam mag maximum 50 karakters bevatten';
		}

		return $error;
	}

	private static function validate_birth_date($birth_date) {
		$error = null;

		if (empty($birth_date)) {
			$error = 'Gelieve een geboortedatum in te vullen';
		} elseif (self::calculate_age($birth_date) < 5) {
			$error = 'Uw kind is te jong om deel te maken van de ksa.';
		} elseif (self::calculate_age($birth_date) > 16) {
			$error = 'Uw kind is te oud om deel te maken van de ksa. Hij zou al leiding moeten zijn.';
		}

		return $error;
	}

	private static function validate_gender($gender) {
		$error = null;

		if (empty($gender)) {
			$error = 'Gelieve een geslacht in te vullen';
		} elseif ($gender !== 'M' && $gender !== 'V' && $gender !== 'X') {
			$error = 'Geslacht moet M, V of X zijn';
		}

		return $error;
	}

	private static function validate_birth_place($birth_place) {
		$error = null;

		return $error;
	}

	private static function validate_parent_first_name($parent_first_name, $second) {
		$error = null;

		if (empty($parent_first_name)) {
			if($second) {
				return $error;
			}
			$error = 'Gelieve een voornaam in te vullen';
		} elseif (strlen($parent_first_name) < 2) {
			$error = 'Voornaam moet minstens 2 karakters bevatten';
		} elseif (strlen($parent_first_name) > 50) {
			$error = 'Voornaam mag maximum 50 karakters bevatten';
		}

		return $error;
	}

	private static function validate_parent_last_name($parent_last_name, $second) {
		$error = null;

		if (empty($parent_last_name)) {
			if($second) {
				return $error;
			}
			$error = 'Gelieve een achternaam in te vullen';
		} elseif (strlen($parent_last_name) < 2) {
			$error = 'Achternaam moet minstens 2 karakters bevatten';
		} elseif (strlen($parent_last_name) > 50) {
			$error = 'Achternaam mag maximum 50 karakters bevatten';
		}

		return $error;
	}

	private static function validate_address($address, $second) {
		$error = null;

		if (empty($address)) {
			if($second) {
				return $error;
			}
			$error = 'Gelieve een straat en huisnummer in te vullen';
		}

		return $error;
	}

	private static function validate_postal_code($postal_code, $second) {
		$error = null;

		if (empty($postal_code)) {
			if($second) {
				return $error;
			}
			$error = 'Gelieve een postcode in te vullen';
		} elseif (!preg_match('/^[0-9]{4}$/', $postal_code)) {
			$error = 'Postcode moet 4 cijfers bevatten';
		}

		return $error;
	}

	private static function validate_town($town, $second) {
		$error = null;

		if (empty($town)) {
			if($second) {
				return $error;
			}
			$error = 'Gelieve een gemeente in te vullen';
		}

		return $error;
	}

	private static function validate_phone_number($phone_number, $second) {
		$error = null;

		if (empty($phone_number)) {
			if($second) {
				return $error;
			}
			$error = 'Gelieve een gsm nummer in te vullen';
		} elseif (!preg_match('/^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/', $phone_number)) {
			$error = 'Gsm nummer is niet geldig (formaat: 04xxxxxxxx of +324xxxxxxxx)';
		}

		return $error;
	}

	private static function validate_telephone_number($telephone_number, $second) {
		$error = null;

		if (empty($telephone_number)) {
			return $error;
		} elseif (!preg_match('/^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/', $telephone_number)) {
			$error = 'Telefoonnummer is niet geldig (gebruik geen / en spaties)';
		}

		return $error;
	}

	private static function validate_email($email, $second) {
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

	private static function calculate_age($birthdate) {
		if (empty($birthdate)) {
			return null;
		}

		$today = new DateTime();
		$birthdate = new DateTime($birthdate);
		$age = $today->format('Y') - $birthdate->format('Y');
		$month_difference = $today->format('m') - $birthdate->format('m');

		if ($month_difference < 0 || ($month_difference === 0 && $today->format('d') < $birthdate->format('d'))) {
			$age--;
		}

		return $age;
	}
}

<?php

use \Illuminate\Database\Eloquent\Model;
require_once __DIR__ . "/AccountRole.php";
require_once __DIR__ . "/Leader.php";

class Account extends Model
{
    public function role() {
        return $this->belongsTo(AccountRole::class, 'role_id');
    }

    public function leaders() {
        return $this->belongsToMany(Leader::class, 'account_leaders', 'account_id', 'leader_id');
    }

    public static function is_authenticated(): Account {
        if (empty($_SESSION["account_ksaoosterzele"])) {
            ErrorResponse::exitWithError(204, "Er is geen sessie actief.");
        }

        $accountId = $_SESSION["account_ksaoosterzele"];
        $account = Account::find($accountId);

        if (empty($account)) {
            ErrorResponse::exitWithError(404, "Account niet gevonden. Log uit en probeer opnieuw in te loggen.");
        }

        return $account;
    }
}
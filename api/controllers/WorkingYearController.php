<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/WorkingYear.php';
require_once __DIR__ . '/../models/Account.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';

class WorkingYearController extends Controller {

    public function getWorkingYears() {
        $account = Account::is_authenticated();

        $workingYears = WorkingYear::get();
        exit(json_encode($workingYears));
    }
}


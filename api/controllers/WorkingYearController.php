<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/WorkingYear.php';
require_once __DIR__ . '/../models/Account.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';

class WorkingYearController extends Controller {

    public function getWorkingYears() {
        $account = Account::is_authenticated();

        $workingYears = WorkingYear::with(['leaderPlaces', 'registrations'])->get();

        $workingYearsWithCounts = $workingYears->map(function ($workingYear) {
            return [
                'id' => $workingYear->id,
                'name' => $workingYear->name,
                'start_year' => $workingYear->start_year,
                'created_at' => $workingYear->created_at,
                'registration_count' => $workingYear->registrations->count(),
                'leader_count' => $workingYear->leaderPlaces->count(),
            ];
        });

        exit(json_encode($workingYearsWithCounts));
    }

    public function startNewWorkingYear() {
        $account = Account::is_authenticated();
        Account::is_authorised($account, 2);

		$data = json_decode(file_get_contents('php://input'), true);

        $errors = WorkingYear::validate($data);

        if (!empty($errors)) {
			ErrorResponse::exitWithError(400, "Validatie fouten gevonden.", $errors);
		}

        $workingYear = new WorkingYear();
        $workingYear->name = $data["name"];
        $workingYear->start_year = $data["startYear"];
        $workingYear->save();

        http_response_code(201);
        exit(json_encode($workingYear));
    }
}


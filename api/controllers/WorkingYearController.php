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
                'registration_count' => $workingYear->registrations->count(),
                'leader_count' => $workingYear->leaderPlaces->count(),
            ];
        });

        exit(json_encode($workingYearsWithCounts));
    }
}


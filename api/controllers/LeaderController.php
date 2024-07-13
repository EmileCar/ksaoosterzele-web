<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/WorkingYear.php';
require_once __DIR__ . '/../models/Group.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';

class LeaderController extends Controller {

    public function getLeadersOfWorkingYear() {
        $workingYear = WorkingYear::orderBy('start_year', 'desc')->first();

        if (!$workingYear) {
            ErrorResponse::exitWithError(500, 'Er is geen werkjaar actief.');
        }

        $groups = Group::with(['leaders' => function ($query) use ($workingYear) {
            $query->whereHas('leaderPlaces', function ($q) use ($workingYear) {
                $q->where('working_year_id', $workingYear->id);
            });
        }])->get();

        $leadersByGroup = [];

        foreach ($groups as $group) {
            $leadersByGroup[$group->name] = $group->leaders->map(function ($leader) {
                return [
                    'id' => $leader->id,
                    'first_name' => $leader->first_name,
                    'last_name' => $leader->last_name,
                    'image_file_name' => $leader->image_file_name,
                ];
            });
        }

        exit(json_encode($leadersByGroup));
    }

    public function getLeadersByRole() {
        $roles = LeaderRole::with('leaders')->get();

        $leadersByRole = [];

        foreach ($roles as $role) {
            $leadersByRole[$role->name] = $role->leaders->map(function ($leader) {
                return [
                    'id' => $leader->id,
                    'first_name' => $leader->first_name,
                    'last_name' => $leader->last_name,
                    'birthdate' => $leader->birthdate,
                    'phone_number' => $leader->phone_number,
                    'email' => $leader->email,
                    'image_file_name' => $leader->image_file_name,
                ];
            })->toArray();
        }

        exit(json_encode($leadersByRole));
    }
}
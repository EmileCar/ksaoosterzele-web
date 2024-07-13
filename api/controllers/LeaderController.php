<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/WorkingYear.php';
require_once __DIR__ . '/../models/Group.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';
require_once __DIR__ . '/../responses/LeaderByRoleResponse.php';

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
        $currentWorkingYear = WorkingYear::orderBy('start_year', 'desc')->first();

        if (!$currentWorkingYear) {
            $roles = LeaderRole::with('leaders')->get();
        } else {
            $roles = LeaderRole::with(['leaders' => function ($query) use ($currentWorkingYear) {
                $query->with(['groups' => function ($q) use ($currentWorkingYear) {
                    $q->wherePivot('working_year_id', $currentWorkingYear->id);
                }]);
            }])->get();
        }

        $leadersByRole = [];

        foreach ($roles as $role) {
            $leadersByRole[$role->name] = $role->leaders->map(function ($leader) use ($currentWorkingYear) {
                $group = $currentWorkingYear ? $leader->groups->first() : null;

                $leaderResponse = new LeaderByRoleResponse($leader, $group);
                return $leaderResponse->toArray();
            })->toArray();
        }
    
        exit(json_encode($leadersByRole));
    }

    public function getLeaderRoles() {
        $roles = LeaderRole::get();
        exit(json_encode($roles));
    }
}
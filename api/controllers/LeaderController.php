<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Leader.php';
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
            $leadersByRole[$role->name] = $role->leaders->map(function ($leader) use ($role, $currentWorkingYear) {
                $group = $currentWorkingYear ? $leader->groups->first() : null;

                $leaderResponse = new LeaderByRoleResponse($leader, $role->id, $group);
                return $leaderResponse->toArray();
            })->toArray();
        }

        exit(json_encode($leadersByRole));
    }

    public function createLeader() {
        $account = Account::is_authenticated();

        $data = json_decode(file_get_contents('php://input'), true);

        $errors = Leader::validate($data);

        if (!empty($errors)) {
			ErrorResponse::exitWithError(400, "Validatie fouten gevonden.", $errors);
		}

        $leader = new Leader();
		$leader = Leader::create($data, $leader);
		$leader->save();

		http_response_code(201);
		exit();
    }

    public function updateLeader() {
        $account = Account::is_authenticated();

        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data["id"])) {
			ErrorResponse::exitWithError(400, "Gelieve een id mee te geven.");
		}

        $leader = Leader::find($data["id"]);

        if (empty($leader)) {
            ErrorResponse::exitWithError(404, "Leider niet gevonden.");
        }

        $errors = Leader::validate($data);

        if (!empty($errors)) {
            ErrorResponse::exitWithError(400, "Validatie fouten gevonden.", $errors);
        }

        $leader = Leader::create($data, $leader);
        $leader->save();

        exit();
    }



    public function getLeaderRoles() {
        $roles = LeaderRole::get();
        exit(json_encode($roles));
    }

    public function changeRoleOfLeader() {
        if(!isset($_GET['leader_id']) || !isset($_GET['role_id'])) {
            ErrorResponse::exitWithError(400, 'Leider of rol niet opgegeven.');
        }

        $leaderId = $_GET['leader_id'];
        $roleId = $_GET['role_id'];

        $leader = Leader::find($leaderId);
        $role = LeaderRole::find($roleId);

        if (!$leader || !$role) {
            ErrorResponse::exitWithError(404, 'Leider of rol niet gevonden.');
        }

        $leader->role()->associate($role);
        $leader->save();

        exit();
    }

    public function changeGroupOfLeader() {
        if (!isset($_GET['leader_id']) || !isset($_GET['group_id'])) {
            ErrorResponse::exitWithError(400, 'Leider of groep niet opgegeven.');
        }

        $leaderId = $_GET['leader_id'];
        $groupId = $_GET['group_id'];

        $leader = Leader::find($leaderId);
        $group = Group::find($groupId);

        if (!$leader || !$group) {
            ErrorResponse::exitWithError(404, 'Leider of groep niet gevonden.');
        }

        $currentWorkingYear = WorkingYear::orderBy('start_year', 'desc')->first();
        if (!$currentWorkingYear) {
            ErrorResponse::exitWithError(500, 'Er is geen werkjaar actief.');
        }

        $leaderPlace = LeaderPlace::where('leader_id', $leaderId)
            ->where('working_year_id', $currentWorkingYear->id)
            ->first();

        if (empty($leaderPlace)) {
            $leaderPlace = new LeaderPlace();
            $leaderPlace->leader_id = $leaderId;
            $leaderPlace->working_year_id = $currentWorkingYear->id;
        }

        $leaderPlace->group_id = $groupId;
        $leaderPlace->save();

        exit();
    }

    public function getLeaderGroups() {
        if (!isset($_GET['leader_id'])) {
            ErrorResponse::exitWithError(400, 'Leider niet opgegeven.');
        }

        $leaderId = $_GET['leader_id'];

        $leader = Leader::find($leaderId);

        if (!$leader) {
            ErrorResponse::exitWithError(404, "Leider niet gevonden.");
        }

        $currentWorkingYear = WorkingYear::orderBy('start_year', 'desc')->first();

        if (!$currentWorkingYear) {
            ErrorResponse::exitWithError(500, 'Er is geen werkjaar actief.');
        }

        $sortedLeaderPlaces = $leader->leaderPlaces
            ->filter(function ($leaderPlace) use ($currentWorkingYear) {
                return $leaderPlace->workingYear->id !== $currentWorkingYear->id;
            })
            ->sortByDesc(function ($leaderPlace) {
                return $leaderPlace->workingYear->start_year;
            });

        $groups = $sortedLeaderPlaces->map(function ($leaderPlace) {
            return [
                'group' => $leaderPlace->group->name,
                'working_year' => $leaderPlace->workingYear->name,
            ];
        })->values();
        exit(json_encode($groups));
    }
}
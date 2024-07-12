<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Leader.php';
require_once __DIR__ . '/../models/LeaderRole.php';

class LeaderController extends Controller {

    public function getLeadersByRole()
    {
        $rolesQuery = LeaderRole::with(['leaders' => function ($query) {
            $query->with(['groups' => function ($q) {
                $q->select('groups.id', 'groups.name', 'lp.leader_id', 'lp.year')
                  ->join('leader_places as lp', 'groups.id', '=', 'lp.group_id');
            }]);
        }]);

        if (!isset($_GET['all']) || $_GET['all'] !== "1") {
            $rolesQuery->whereIn('name', ['bondsleiders', 'leiding']);
        }

        $roles = $rolesQuery->get();

        $leadersByRole = [];

        foreach ($roles as $role) {
            $leadersByRole[$role->name] = $role->leaders->map(function ($leader) {
                $leader->groups = $leader->groups->map(function ($group) {
                    return [
                        'name' => $group->name,
                        'year' => $group->pivot->year
                    ];
                });
                return [
                    'id' => $leader->id,
                    'first_name' => $leader->first_name,
                    'last_name' => $leader->last_name,
                    'image_file_name' => $leader->image_file_name,
                    'groups' => $leader->groups,
                ];
            });
        }

        exit(json_encode($leadersByRole));
    }
}
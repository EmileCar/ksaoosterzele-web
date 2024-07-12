<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Leader.php';
require_once __DIR__ . '/../models/LeaderRole.php';

class LeaderController extends Controller {

    public function getLeadersByRole()
    {
        $roles = LeaderRole::with('leaders')->get();

        $leadersByRole = [];

        foreach ($roles as $role) {
            $leadersByRole[$role->name] = $role->leaders;
        }

        echo json_encode($leadersByRole);
    }
}
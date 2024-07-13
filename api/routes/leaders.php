<?php
$leaderRoutes = [
    'working_year_leaders' => array(
        'controller' => 'Leader',
        'methods' => array(
            'GET' => 'getLeadersOfWorkingYear',
        )
    ),
    'leaders_by_role' => array(
        'controller' => 'Leader',
        'methods' => array(
            'GET' => 'getLeadersByRole',
        )
    ),
    'leader_roles' => array(
        'controller' => 'LeaderRole',
        'methods' => array(
            'GET' => 'getLeaderRoles',
        )
    ),
];
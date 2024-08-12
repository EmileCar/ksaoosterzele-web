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
        'controller' => 'Leader',
        'methods' => array(
            'GET' => 'getLeaderRoles',
        )
    ),
    'leader' => array(
        'controller' => 'Leader',
        'methods' => array(
            'GET' => 'getLeader',
            'POST' => 'createLeader',
            'PUT' => 'updateLeader',
            'DELETE' => 'deleteLeader',
        )
    ),
    'leader_role' => array(
        'controller' => 'Leader',
        'methods' => array(
            'PATCH' => 'changeRoleOfLeader',
        )
    ),
    'leader_group' => array(
        'controller' => 'Leader',
        'methods' => array(
            'PATCH' => 'changeGroupOfLeader',
        )
    ),
    'leader_groups' => array(
        'controller' => 'Leader',
        'methods' => array(
            'GET' => 'getLeaderGroups',
        )
    ),
    'leader_images' => array(
        'controller' => 'Leader',
        'methods' => array(
            'GET' => 'getLeaderImagePaths',
        )
    ),
    'leaders' => array(
        'controller' => 'Leader',
        'methods' => array(
            'GET' => 'getLeaders',
        )
    ),
];
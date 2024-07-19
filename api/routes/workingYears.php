<?php
$workingYearRoutes = [
    'working_years' => array(
        'controller' => 'WorkingYear',
        'methods' => array(
            'GET' => 'getWorkingYears',
            'POST'=> 'startNewWorkingYear',
        )
    ),
];
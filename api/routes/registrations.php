<?php
$inschrijvingRoutes = [
    'registrations' => array(
        'controller' => 'Registration',
        'methods' => array(
            'GET' => 'getRegistrations',
        )
    ),
    'registration' => array(
        'controller' => 'Registration',
        'methods' => array(
            'POST' => 'sendRegistration',
            'PUT' => 'updateRegistration',
        )
    ),
    'test_mail' => array(
        'controller' => 'Registration',
        'methods' => array(
            'GET' => 'test_mail',
        )
    ),
];
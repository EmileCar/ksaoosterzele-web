<?php
$inschrijvingRoutes = [
    'inschrijvingen' => array(
        'controller' => 'Inschrijving',
        'methods' => array(
            'GET' => 'getInschrijvingen',
        )
    ),
    'inschrijving' => array(
        'controller' => 'Inschrijving',
        'methods' => array(
            'POST' => 'sendInschrijving',
            'PUT' => 'updateInschrijving',
        )
    ),
];
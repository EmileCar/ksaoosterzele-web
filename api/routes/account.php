<?php
$accountRoutes = [
    'validate_credentials' => array(
        'controller' => 'Account',
        'methods' => array(
            'POST' => 'validate_credentials',
        )
    ),
    'remove_credentials' => array(
        'controller' => 'Account',
        'methods' => array(
            'DELETE' => 'remove_credentials',
        )
    ),
    'account' => array(
        'controller' => 'Account',
        'methods' => array(
            'GET' => 'get_account',
        )
    )
];
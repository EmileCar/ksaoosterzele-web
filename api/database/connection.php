<?php


use Illuminate\Database\Capsule\Manager as Capsule;
$capsule = new Capsule;
$capsule->addConnection([
'driver'    => 'mysql',
'host'      => 'prive',
'database'  => 'prive',
'username'  => 'prive',
'password'  => 'prive',
'charset'   => 'utf8mb4',
'collation' => 'utf8mb4_unicode_ci',
'prefix'    => '',
]);
$capsule->setAsGlobal();
$capsule->bootEloquent();

try{
    $capsule->getConnection()->getPdo();
} catch (Exception $e) {
    http_response_code(500);
    exit("Er kon geen verbinding gemaakt worden met de database.");
}
<?php
require_once 'events.php';
require_once 'media.php';
require_once 'mattentaartenOrders.php';
require_once 'account.php';
require_once 'registrations.php';
require_once 'groups.php';

// Als er geen pagina is opgegeven, zet de page op index
if(empty($_GET['page'])) {
    $_GET['page'] = 'index';
}

$allowedRoutes = array_merge($eventRoutes, $accountRoutes, $inschrijvingRoutes, $mediaRoutes, $mattentaartenOrderRoutes, $groupRoutes);

// Als de route niet bestaat, geef een 404
if (empty($allowedRoutes[$_GET['page']])) {
    http_response_code(404);
    exit("Deze pagina bestaat niet");
}

// Als de methode niet toegevoegd is aan de route, geef een 405
$route = $allowedRoutes[$_GET['page']];
$requestMethod = $_SERVER['REQUEST_METHOD'];
if (isset($route['methods'][$requestMethod])) {
    $actionMethod = $route['methods'][$requestMethod];
} else {
    http_response_code(405);
    exit("Deze methode is niet toegestaan voor deze route");
}
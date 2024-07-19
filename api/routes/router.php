<?php
require_once 'events.php';
require_once 'media.php';
require_once 'mattentaartenOrders.php';
require_once 'account.php';
require_once 'registrations.php';
require_once 'groups.php';
require_once 'leaders.php';
require_once 'workingYears.php';

// Als er geen pagina is opgegeven, zet de page op index
if(empty($_GET['page'])) {
    $_GET['page'] = 'index';
}

$allowedRoutes = array_merge($eventRoutes, $accountRoutes, $inschrijvingRoutes, $mediaRoutes, $mattentaartenOrderRoutes, $groupRoutes, $leaderRoutes, $workingYearRoutes);

require_once __DIR__ . '/../responses/ErrorResponse.php';

// Als de route niet bestaat, geef een 404
if (empty($allowedRoutes[$_GET['page']])) {
    ErrorResponse::exitWithError(404, 'Deze pagina bestaat niet');
}

// Als de methode niet toegevoegd is aan de route, geef een 405
$route = $allowedRoutes[$_GET['page']];
$requestMethod = $_SERVER['REQUEST_METHOD'];
if (isset($route['methods'][$requestMethod])) {
    $actionMethod = $route['methods'][$requestMethod];
} else {
    ErrorResponse::exitWithError(405, 'Deze methode is niet toegestaan');
}
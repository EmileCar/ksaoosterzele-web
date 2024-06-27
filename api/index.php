<?php
/*
 * Dit is de entry point van de KSA Oosterzele API.
 * 1) CORS instellingen worden gecontroleerd
 * 2) PHP Sessies worden geïnitialiseerd
 * 3) De controller wordt bepaald en geïnitialiseerd
 * 4) De route wordt doorgegeven aan de controller
 *
 * Aangezien de frontend op dezelfde server/locatie draait als de API, is elke endpoint zo ?page={page} opgebouwd. (in query string)
*/

// Zet error handling uit
ini_set('display_errors', false);
error_reporting(1);

set_error_handler(function($errno, $errstr, $errfile, $errline) {
    throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
});

// CORS INSTELLINGEN
$allowedOrigins = [
    'http://localhost:3000',
    'https://ksaoosterzele.be' ,
    'http://ksaoosterzele.be'
];

if(!empty($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins))
{
    $http_origin = $_SERVER['HTTP_ORIGIN'];
} else {
    $http_origin = "https://ksaoosterzele.be";
}

header("Access-Control-Allow-Origin: " . $http_origin);
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
header('Access-Control-Max-Age: 86400');
header('Access-Control-Allow-Credentials: true');
http_response_code(200);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	return;
}

// SESSIONS
session_set_cookie_params([
    'samesite' => 'None',
    'secure' => true,
]);
session_start();

// GET ROUTE AND CONTROLLER
require_once "../vendor/autoload.php";
require_once "./database/connection.php";
require_once "./routes/router.php";

$controllerName = $route['controller'] . 'Controller';

require_once __DIR__ . '/controllers/' . $controllerName . ".php";

$controllerObj = new $controllerName();
$controllerObj->route = $route;

require_once __DIR__ . '/responses/ErrorResponse.php';

try {
    $controllerObj->filter();
} catch (Throwable $e) {
    ErrorResponse::exitWithError(500, "Er is iets misgelopen, probeer het later opnieuw. Fout in een endpoint.", ["error" => $e->getMessage()]);
}

// ALLE ENDPOINTS EXITEN, DUS ALS DE CODE HIER KOMT, IS ER IETS MIS
ErrorResponse::exitWithError(500, "Er is iets misgelopen, probeer het later opnieuw. Fout in de applicatie.");
restore_error_handler();
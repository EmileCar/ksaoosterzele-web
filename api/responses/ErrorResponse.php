<?php

class ErrorResponse {
    public $errorMessage;
    public $statusCode;
    public $errorFields;

    private static $defaultMessages = [
        400 => "Bad Request",
        401 => "U bent niet gemachtigd om deze actie uit te voeren.",
        404 => "Er werd niets gevonden.",
        500 => "Er is iets misgelopen, probeer het later opnieuw."
    ];

    public function __construct($errorMessage, $statusCode, $errorFields = null) {
        $this->errorMessage = $errorMessage;
        $this->statusCode = $statusCode;
        $this->errorFields = $errorFields;
    }

    /**
    * Exits the script with a JSON response containing the error message and status code.
    */
    public static function exitWithError($statusCode, $errorMessage = null, $errorFields = null) {
        $errorMessage = $errorMessage ?? self::$defaultMessages[$statusCode] ?? "Unknown Error";
        $errorResponse = new ErrorResponse($errorMessage, $statusCode, $errorFields);
        http_response_code($statusCode ?? 500);
        exit(json_encode($errorResponse));
    }
}
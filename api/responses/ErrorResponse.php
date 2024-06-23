<?php

class ErrorResponse {
    public $error_message;
    public $status_code;
    public $error_fields;

    private static $defaultMessages = [
        400 => "Bad Request",
        401 => "U bent niet gemachtigd om deze actie uit te voeren.",
        404 => "Er werd niets gevonden.",
        500 => "Er is iets misgelopen, probeer het later opnieuw."
    ];

    public function __construct($error_message, $status_code, $error_fields = null) {
        $this->error_message = $error_message;
        $this->status_code = $status_code;
        $this->error_fields = $error_fields;
    }

    /**
    * Exits the script with a JSON response containing the error message and status code.
    */
    public static function exitWithError($status_code, $error_message = null, $error_fields = null) {
        $error_message = $error_message ?? self::$defaultMessages[$status_code] ?? "Unknown Error";
        $errorResponse = new ErrorResponse($error_message, $status_code, $error_fields);
        http_response_code($status_code ?? 500);
        exit(json_encode($errorResponse));
    }
}
class ErrorResponse {
  message: string;
  statusCode: number | null;
  errorFields: any | null;

  constructor(message: string, statusCode: number, errorFields = null) {
    this.message = message;
    this.statusCode = statusCode;
    this.errorFields = errorFields;
  }

  static async createFromResponse(response: Response) {
    try {
      const errorResponse = await response.json();
      return new ErrorResponse(
        errorResponse.error_message,
        response.status,
        errorResponse.error_fields
      );
    } catch (error) {
      return new ErrorResponse(
        "Er is een fout opgetreden. Deadly probleem in de API",
        response.status
      );
    }
  }
}

export default ErrorResponse;
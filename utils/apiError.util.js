class ApiError extends Error {
  constructor(statusCode = 500, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;

const { StatusCodes } = require("http-status-codes");

class ValidationError extends Error {
  constructor(error) {
    super();
    this.explanation = [];
    error.errors.forEach((err) => {
      this.explanation.push(err.message);
    });
    this.name = "ValidationError";
    this.message = "Not able to validate data sent in request";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = ValidationError;

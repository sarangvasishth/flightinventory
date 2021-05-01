function ErrorResponse(message, statusCode) {
  this.message = message;
  this.statusCode = statusCode;
}
ErrorResponse.prototype = new Error();

module.exports = ErrorResponse;

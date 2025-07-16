class AppException extends Error {
  constructor(statusCode, message) {
    super(message)

    this.statusCode = statusCode
  }
}

export default AppException

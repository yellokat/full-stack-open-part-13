class NotExistResourceError extends Error {
  constructor() {
    super("No such resource found.");
    this.name = "NotExistResourceError"
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthError"
  }
}

module.exports = {
  NotExistResourceError,
  AuthError
}
export class InvalidTokenException extends Error {
  constructor() {
    super();
    this.name = 'InvalidTokenException';
    this.message = 'Token is invalid';
  }
}

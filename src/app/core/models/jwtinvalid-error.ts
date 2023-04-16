export class JWTInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JWTInvalidError';
    Object.setPrototypeOf(this, JWTInvalidError.prototype);
  }
}

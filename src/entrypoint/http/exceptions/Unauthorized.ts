export class Unauthorized extends Error {
  constructor() {
    super();
    this.name = 'Unauthorized';
    this.message = 'Client not unauthorized';
  }
}

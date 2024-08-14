class HttpError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, messsage: string) {
    super(messsage);
    this.status = status;
    this.code = code;

    // Set the prototype explicitly to maintain the prototype chain
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export default HttpError;

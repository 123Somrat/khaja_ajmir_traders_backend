class HttpError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, messsage: string) {
    super(messsage);
    this.status = status; 
    this.code = code;
  }
}

export default HttpError
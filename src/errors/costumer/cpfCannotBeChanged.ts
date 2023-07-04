
export class CpfCannotBeChanged extends Error {
    readonly message: string;
    readonly statusCode: number;
    readonly error: string;
  
  
    constructor(message: string) {
      super();
      this.message = message;
      this.statusCode = 400;
      this.error = "Bad Request"
    }
  }
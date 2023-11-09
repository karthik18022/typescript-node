import { HttpStatusCode } from "axios";

class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;
    
    constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean, res: any) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
    
      console.log('base error called');
      
      this.name = name;
      this.httpCode = httpCode;
      this.isOperational = isOperational;
      res.send({ error: this.name, message: this.message });
    }
    
}    


module.exports = BaseError;
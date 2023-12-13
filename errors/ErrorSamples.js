import { StatusCodes } from "http-status-codes";

class CustomError extends Error{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR; 
    }
}

class BadRequest extends CustomError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

class NotFound extends CustomError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
class Unauthorized extends CustomError{
    constructor(message){
        super(message); 
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
export default {
    CustomError,
    NotFound, 
    BadRequest,
    Unauthorized
}; 

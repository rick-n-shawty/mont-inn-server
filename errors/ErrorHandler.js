import error from "./ErrorSamples.js";
import Joi from "joi";
import jwt from "jsonwebtoken"; 
import { StatusCodes } from "http-status-codes";
const ErrorHandler = (err, req, res, next) => {
    if(err instanceof error.CustomError){
        return res.status(err.statusCode).json({err: err.message})
    }else if(err instanceof Joi.ValidationError){
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).json({err: "Input Validation Error"})
    }else if(err instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.UNAUTHORIZED).json({err: "JWT Error"})
    }

    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err: "something went wrong"})
}
export default ErrorHandler;
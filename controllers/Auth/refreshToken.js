import error from "../../errors/ErrorSamples.js";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../../helperFn/tokens.js";
import { StatusCodes } from "http-status-codes";

const refreshToken = (req, res, next) => {
    try{
        const headers = req.headers.authorization; 
        if(!headers || !headers.startsWith('Bearer ')) throw new error.Unauthorized('You are not authorized');
        const token = headers.split(' ')[1]
        if(!token){
            throw new error.Unauthorized('You are not authorized');
        }
        const isVerified = jwt.verify(token, process.env.JWT_REFRESH);
        const { userId } = isVerified;
        if(!userId || !isVerified) throw new error.Unauthorized("You are not authorized");
        const accessToken = createAccessToken(userId);
        const refreshToken = createRefreshToken(userId);
        
        return res.status(StatusCodes.OK).json({accessToken, refreshToken, status: "success"});
    }catch(err){
        return next(err);
    }
}

export default refreshToken;
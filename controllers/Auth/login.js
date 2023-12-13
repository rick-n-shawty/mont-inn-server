import User from "../../DB/User.js"; 
import Joi  from "joi";
import error from "../../errors/ErrorSamples.js"; 
import { StatusCodes } from "http-status-codes";
import { createAccessToken, createRefreshToken } from "../../helperFn/tokens.js";
const validateBody = async (body) => {
    try{
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
        const {error, value} = loginSchema.validate(body);
        if(error) throw error; 
        return value; 
    }catch(err){
        throw err;
    }
}
const login = async (req, res, next) => {
    try{
        const {email, password} = await validateBody(req.body);
        const user = await User.findOne({email: email})
        if(!user) throw new error.NotFound("User with this email not found"); 
        const isPasswordValid = await user.ComparePasswords(password);
        if(!isPasswordValid) throw new error.BadRequest("Password is incorrect");
        const accessToken = createAccessToken(user._id); 
        const refreshToken = createRefreshToken(user._id); 
        return res.status(StatusCodes.OK).json({
            accessToken: accessToken, 
            refreshToken: refreshToken, 
            status: "Logged in successfully!"
        });
    }catch(err){
        return next(err);
    }
}
export default login;

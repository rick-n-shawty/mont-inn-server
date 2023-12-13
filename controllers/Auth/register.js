import User from "../../DB/User.js";
import Joi from "joi";
import error from "../../errors/ErrorSamples.js";
import { createAccessToken } from "../../helperFn/tokens.js";
import { StatusCodes } from "http-status-codes";
const validateBody = async (body) => {
    try{
        const registerSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
        const {error, value} = registerSchema.validate(body);
        if(error) throw error;
        return value;
    }catch(err){
        throw err; 
    }
}

const register = async(req, res, next) => {
    try{ 
        // restrict access to register later 
        const { email, password } = await validateBody(req.body); 
        const user = await User.create({email, password}); 
        if(!user) throw new error.CustomError("Something went wrong");
        const token = createAccessToken(user._id);
        return res.status(StatusCodes.OK).json({accessToken: token, status: "registered successfully!"});
    }catch(err){
        return next(err);
    }
}
export default register;

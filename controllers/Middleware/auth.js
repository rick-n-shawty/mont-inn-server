import jwt from "jsonwebtoken"; 
import { StatusCodes } from "http-status-codes"; 
const auth = async (req, res, next) => {
    const authHead = req.headers.authorization 
    if(!authHead || !authHead.startsWith("Bearer")) return res.status(StatusCodes.BAD_REQUEST).json({err: 'not authenticated'})
    const token = authHead.split(' ')[1]
    if(!token) return res.status(StatusCodes.BAD_REQUEST).json({err: 'not authenticated'})
    try{    
        jwt.verify(token, process.env.JWT_ACCESS, async (err, decoded) =>{
            if(err) return res.status(StatusCodes.BAD_REQUEST).json({err: 'token is expired'})
            const userId = decoded.userId
            req.userId = userId
            next()
        })
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err: 'Something went wrong in middleware'})
    }
}

export default auth;
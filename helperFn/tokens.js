import jwt from "jsonwebtoken";
export const createAccessToken = (userId) => { 
    return jwt.sign({userId}, process.env.JWT_ACCESS, {expiresIn: process.env.JWT_ACCESS_LIFE})
}
export const createRefreshToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_REFRESH, {expiresIn: process.env.JWT_REFRESH_LIFE})
}

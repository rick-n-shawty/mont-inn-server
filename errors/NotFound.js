import { StatusCodes } from "http-status-codes";

const NotFound = (req, res, next) => {
    return res.status(StatusCodes.NOT_FOUND).json({msg: "Resource not found"});
}
export default NotFound; 
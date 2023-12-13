import { StatusCodes } from "http-status-codes";
import Card from "../../DB/Card.js";
import deleteS3 from "../../helperFn/deleteS3.js";
import ErrorSamples from "../../errors/ErrorSamples.js";
import invalidateCache from "../../helperFn/invalidateCache.js";
const { BadRequest, NotFound } = ErrorSamples; 
const deleteCard = async(req, res, next) => {
    try{
        const { id } = req.params;
        if(id.length < 24) throw new BadRequest("Invalid Card ID");
        const card = await Card.findOneAndDelete({_id: id}) ;
        if(!card){
            throw new NotFound("Card with ID " + id + " not found!");
        }
        // delete files from the cloud 
        for(const key of card.images){
            await deleteS3(key); 
            await invalidateCache(key);
        } 
        return res.status(StatusCodes.OK).json({status: "success", msg: "object was deleted"});
    }catch(err){
        return next(err)
    }
}

export default deleteCard;
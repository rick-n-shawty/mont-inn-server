import Card from "../../DB/Card.js";
import { StatusCodes } from "http-status-codes";
import getAwsUrl from "../../helperFn/getAwsUrl.js";
import ErrorSamples from "../../errors/ErrorSamples.js";
const { BadRequest, NotFound } = ErrorSamples
const getCard = async(req, res, next) => {
    try{
        const { id } = req.params  
        if(id.length < 24) throw new BadRequest("Invalid Card ID")
        const card = await Card.findOne({_id: id, type: 'room'})
        if(!card) throw new NotFound("Card with ID " + id + " not found!")
        card.mainImage = getAwsUrl(card.mainImage) 
        for(let i = 0; i < card.images.length; i++){
            card.images[i] = getAwsUrl(card.images[i])
        }
        return res.status(StatusCodes.OK).json({status: "success", card})
    }catch(err){
        return next(err)
    }
}



export default getCard;
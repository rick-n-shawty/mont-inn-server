import ErrorSamples from "../../errors/ErrorSamples.js";
import { StatusCodes } from "http-status-codes"; 
import getAwsUrl from "../../helperFn/getAwsUrl.js";
import Card from "../../DB/Card.js";
const { BadRequest } = ErrorSamples;
const getCards = async (req,res,next) => {
    try{
        const { type } = req.params
        if(type !== 'room' && type !== 'cottage'){
            throw new BadRequest("Invalid card type")
        }
        const cards = await Card.find({type: type}, {images: 0}).limit(30)
        const newCards = []
        for(const obj of cards){
            const card = {
                mainImage: getAwsUrl(obj.mainImage),
                price: obj.price,
                title: obj.title,
                description: obj.description,
                id: obj._id
            }
            newCards.push(card)
        }
        return res.status(StatusCodes.OK).json({status: "success", cards: newCards})
    }catch(err){
        return next(err)
    }
}

export default getCards 
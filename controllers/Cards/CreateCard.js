import cleanUp from "../../helperFn/cleanUploads.cjs";
import Card from "../../DB/Card.js";
import Joi from "joi";
import error from "../../errors/ErrorSamples.js";
const { BadRequest } = error
import data from "../../imports.cjs";
const {imageFormats} = data
import { StatusCodes } from "http-status-codes"; 
import getKey from "../../helperFn/getAwsKey.js";
import uploadS3 from "../../helperFn/uploadS3.js";

const validateBody = (images, body) => {
    try{
        const bodySchema = Joi.object({
            price: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            type: Joi.string().valid('room', 'cottage').required()
        })
        const {error, value} = bodySchema.validate(body) 
        if(error) throw error   
        for(const obj of images){
            const str = obj.originalname;
            const dotIndex = str.lastIndexOf('.'); 
            let ext;
            if(dotIndex !== -1){
                ext = str.substring(dotIndex)
            }else{
                throw new BadRequest("File has no extension!");
            }
            if(!imageFormats.includes(ext)){
                throw new BadRequest(ext + "Extension is not supported")
            }
        }
    }catch(err){
        throw err; 
    }
}

const createCard = async(req, res, next) => { 
    try{ 
        const images = req.files 
        const body = JSON.parse(req.body.jsondata)
        validateBody(images, body)
        const newImages = []
        for(const obj of images){
            obj["awsKey"] = getKey() + obj.filename; 
            await uploadS3(obj);
            newImages.push(obj['awsKey'])
        } 
        const mainImageUrl = images[0]["awsKey"]
        const card = await Card.create({...body, mainImage: mainImageUrl, images: newImages}) 
        return res.status(StatusCodes.OK).json({status: "success"})
    }catch(err){
        return next(err);
    }finally{
        await cleanUp();
    }
}

export default createCard;
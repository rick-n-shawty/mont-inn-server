import { s3 } from "../imports.cjs";
import { PutObjectCommand } from "@aws-sdk/client-s3"; 
import ErrorSamples from "../errors/ErrorSamples.js";
import fs from "fs"; 
import { fileURLToPath } from 'url';
import path from 'path';

const { BadRequest } = ErrorSamples
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
import dotenv from "dotenv";
dotenv.configDotenv()
const uploadS3 = async (file, disposition='inline') => {
    try{
        console.log("uploading files...")
        if(!file) throw new BadRequest("File is missing")
        const filePath = path.join(__dirname, '..', 'uploads', file.filename)
        const readStream = fs.createReadStream(filePath)
        readStream.on("error", (err) => console.log("stream error",err))

        const putCommand = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,    
            Key: file.awsKey,
            Body: readStream,
            ContentType: file.mimetype,
            ContentDisposition: disposition
        })
        const response = await s3.send(putCommand)
        console.log(response)
        return response
    }catch(err){
        throw err; 
    }
}

export default uploadS3; 
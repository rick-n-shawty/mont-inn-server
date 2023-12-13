import { s3 } from "../imports.cjs";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

const deleteS3 = async (key) => {
    try{
        const deleteCommand = new DeleteObjectCommand({
            Key: key,
            Bucket: process.env.BUCKET_NAME 
        })
        const res = await s3.send(deleteCommand); 
        console.log(res)
        return res;
    }catch(err){
        throw err; 
    }
}
export default deleteS3;
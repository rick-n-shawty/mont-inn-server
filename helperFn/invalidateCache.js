import { CloudFront } from "../imports.cjs";
import { CreateInvalidationCommand } from "@aws-sdk/client-cloudfront";

const invalidateCache = async (key) =>{
    try{
        const invalidateCommand = new CreateInvalidationCommand({
            DistributionId: process.env.AWS_DISTRIBUTION_ID,
            InvalidationBatch: {
                CallerReference: key,
                Paths: {
                    Items: [`/${key}`],
                    Quantity: 1
                }
            }
        })
        const response = await CloudFront.send(invalidateCommand)
        return response 
    }catch(err){
        throw err
    }
}
export default invalidateCache;
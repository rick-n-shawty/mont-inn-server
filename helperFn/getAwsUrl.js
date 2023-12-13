import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
const getAwsUrl = (key, expiresIn=1000*60*60*48) => {
    const signedUrl = process.env.CLOUD_FRONT_DOMAIN + `/${key}`;
    return signedUrl;
}

export default getAwsUrl;
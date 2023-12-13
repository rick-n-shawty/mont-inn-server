const path = require("path")
const { S3 } = require('@aws-sdk/client-s3')
const { CloudFrontClient } = require('@aws-sdk/client-cloudfront')
const multer = require('multer')
const dotenv = require('dotenv')
dotenv.configDotenv();
const s3 = new S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_REGION
})

const CloudFront = new CloudFrontClient({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_REGION
})
const uploadsPath = path.join(__dirname, 'uploads')
const storage = multer.diskStorage({
    filename: function(req, file, cb){
        const fileName = file.originalname.replace(/[\s_]+/g, '');
        file.originalname = fileName
        file.filename = fileName
        cb(null, fileName)
    },
    destination: function(req, file, cb){
        cb(null, uploadsPath)
    }
})
const upload = multer({storage})
const imageFormats = ['.png', '.jpeg', '.jpg']; 

module.exports = {
    upload, imageFormats, s3, CloudFront
}
import crypto from "crypto"; 
const getKey = (bytes=16) => {
    return crypto.randomBytes(bytes).toString('hex')
}

export default getKey;
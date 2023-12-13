import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const { genSalt, hash, compare } = bcryptjs;
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
UserSchema.pre("save", async function(){
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
})

UserSchema.methods.ComparePasswords = async function(password){
    const isValid = await compare(password,this.password);
    return isValid; 
}

const User = mongoose.model("users", UserSchema); 

export default User;

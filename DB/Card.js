import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['room', 'cottage'],
        required: true,
    },
    images: {
        type: Array,
        default: []
    },
    mainImage: {
        type: String,
        required: true
    },
    price: {
        type: String
    },
    title:{
        type: String
    },
    description: {
        type: String
    }
})

const Card = mongoose.model("cards", CardSchema);

export default Card
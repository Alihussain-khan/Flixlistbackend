import mongoose from "mongoose";

// Creating User Schema
const movieSchema = new mongoose.Schema({

    id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    imbd:{
        type: String,
        required: true
    },
    director:{
        type: String,
        required: true
    },
    writers:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    role:{
        type: Number,
        default: 0,        
    }
},{timestamps:true})


export default mongoose.model('movie', movieSchema)



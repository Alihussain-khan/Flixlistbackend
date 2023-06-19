import mongoose from "mongoose";

// Creating User Schema
const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        
    },
    address:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    movies:[String],
    role:{
        type: Number,
        default: 0,        
    }
},{timestamps:true})


export default mongoose.model('users', userSchema)



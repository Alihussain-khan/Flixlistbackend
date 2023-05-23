import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../model/userModel.js";
import movieSchema from "../model/moviesModel.js"
import JWT from 'jsonwebtoken'
import moviesModel from "../model/moviesModel.js";


export const registerController = async(req,res) =>{    
    try {
        const {name, phone, address, email, password} = req.body;
        if(!name || !phone || !address || !email || !password){
            return res.send({message: "Fields cannot be empty"})
        }

        // checking whether user record is already available or not ?
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: "user already exists"
            })
        }
        // replacing original password with hashed password in DB
        let updatedPassword = await hashPassword(password)
        const user = await new userModel({name, phone, address, email, password:updatedPassword}).save();

        res.status(201).send({
            success: true,
            message: "user created successfully",
            user
        })
    
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            success: false,
            message: "Error in Signing up",
            error
        })

    }

}

// login controller 
export const loginController = async(req,res) => {
    try {
        
        // Destructure email and password from user
        const {email, password} = req.body;

        // checking if no email and no password is provided by the user
        if(!email || !password){
            return res.send({message: "email or password required"})
        }

        // Check Database on the basis of email address whether a specific user is already available or not 
        const user = await userModel.findOne({email});

        if(!user){            
            return res.send({message: "email not found"})
        }

        // if user is already available, comparing the plaint password with hashedpassword available in user object
        const match = await comparePassword(password,user.password)

        if(!match){
            return res.send({message: "password incorrect"})
        }

        // if email and password is correct, return jwt token
        const token = JWT.sign({_id: user._id}, process.env.JWT_Key,{expiresIn: '7d'})

        res.status(200).send({
            success: true,
            message: "loggined successfully...!",
            user:{
                name: user.name,
                phone: user.phone,
                address: user.address,
                email: user.email,
               
            },
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "invalid login detail",
            error
        })
        
    }

}


export const dummyController = (req,res) =>{
    res.send("Access granted to Protected Routes")    
}


export const movieController = async(req,res) =>{    
    try {
        const {id, title, image, imbd, director, writers, description} = req.body;
        if(!id || !title || !image || !imbd || !director || !writers || !description){
            return res.send({message: "Fields cannot be empty"})
        }

        // checking whether user record is already available or not ?
        const existingUser = await userModel.findOne({title})
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: "Movie already exists"
            })
        }
        const user = await new moviesModel({id, title, image, imbd, director, writers, description}).save();

        res.status(201).send({
            success: true,
            message: "Movie created successfully",
            user
        })
    
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            success: false,
            message: "Error in Adding Movie",
            error
        })

    }

}
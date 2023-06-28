import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../model/userModel.js";
import movieSchema from "../model/moviesModel.js"
import JWT from 'jsonwebtoken'
import moviesModel from "../model/moviesModel.js";
import { json } from "express";
import mongoose from "mongoose";


export const registerController = async(req,res) =>{    
    try {
        const {name, phone, address, email, password} = req.body;
        if(!name || !phone || !address || !email || !password){
            return res.send({message: "Fields cannot be empty"})
        }

        // checking whether user record is already available or not ?
        const existingUser1 = await userModel.findOne({phone})
        if(existingUser1){
            return res.status(200).send({
                success: false,
                message: "change phone number"
            })
        }
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "user already exists"
            })
        }
        // replacing original password with hashed password in DB
        let updatedPassword = await hashPassword(password)
        const user = await new userModel({name, phone, address, email, password:updatedPassword, movies:[]}).save();

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
        const token = JWT.sign({_id: user._id}, "skahsdkjashdashld",{expiresIn: '7d'})

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
        const {id, title, image, imbd, director, writers,category, description} = req.body;
        if(!id || !title || !image || !imbd || !director || !writers || !description || !category){
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
        const user = await new moviesModel({id, title, image, imbd, director, writers, category, description}).save();

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


// sending Movies back
export const moviesSender = async (req,res) =>{
    
try {
    const mdata = await movieSchema.find()
       res.send(mdata)
} catch (error) {
    console.log(error)
}


       
}


// adding Movies back
export const add = async (req,res) =>{
    const {id, email} = req.body;
    const user = await userModel.find({email, movies:id})
    
    if(user.length==0)
    {
        let updateuser = await userModel.updateOne(
            {email},
            {$push: {movies:id}}
        )
        res.status(201).send({
            success: true,
            message: "Movie added",
            updateuser
            
        })
       

    }
    else{
    res.status(201).send({
        success: true,
        message: "Movie Already exists",
    })
}
         
}

// removing the movie
export const remove = async (req,res) =>{
    const {id, email} = req.body;
       let updateuser = await userModel.updateOne(
        {email},
        {$pull: {movies:id}}
    )
    res.send(updateuser)      
}


// 
export const usermovies = async (req,res) =>{
    const {email} = req.body;
    console.log(email)
    const existingUser = await userModel.findOne({email})
    console.log(existingUser)
    if(existingUser && existingUser?.movies?.length){
        const moviesList = await Promise.all(
            existingUser.movies.map(async (movieId) => {
              const movie = await moviesModel.findById(movieId);
              return movie;
            })
          );
        console.log(`moviesList = ${JSON.stringify(moviesList?.length)}`)
        console.log(`moviesList = ${JSON.stringify(moviesList)}`)
        res.send(moviesList)
    }
    else(
        res.status(200).send({
            success:false,
            message: "cant find user"
        })
    )     
}


export const verifiy = async (req,res) =>{
    try{
        const decode = await JWT.verify(req.headers.authorization, "skahsdkjashdashld")
        res.status(200).send({
            success: true,
            message: "success"
        })
        // res.status(401).send({
        //     success:false,
        //     message: "invalid token"
        // })
}
    catch(e){
        res.status(401).send({
            success:false,
            message: "invalid token"
        })
    }
    
         
}


// sending Movies back
export const getUserMovie = async (req,res) =>{
    const {email} = req.body;
    const existingUser = await userModel.findOne({email})
    res.send(existingUser)      
}
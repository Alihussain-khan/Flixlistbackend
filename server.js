import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import authRouter from "./router/authRoute.js"
import cors from 'cors'
dotenv.config()



const app = express()

//converting plaint / string data to json
app.use(express.json());
app.use(cors())


//Db connection activiated
dbConnection();

// Api end point declaration:
app.use("/api/v1/auth",authRouter)



app.listen(process.env.PORT || 6010, ()=>{
    console.log("server started")
})
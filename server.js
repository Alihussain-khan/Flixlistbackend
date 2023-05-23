import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import authRouter from "./router/authRoute.js"
dotenv.config()



const app = express()

//converting plaint / string data to json
app.use(express.json());


//Db connection activiated
dbConnection();

// Api end point declaration:
app.use("/api/v1/auth",authRouter)

app.listen(process.env.PORT, ()=>{
    console.log("server started")
})
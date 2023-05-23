import mongoose from "mongoose";

const dbConnection = async() =>{
    try {
        let conn = await mongoose.connect(process.env.Mongo_Url);
        console.log(`Database connected succesfully..!!`)
    } catch (error) {
        console.log(`Error in Database Connection`)
    }
}
export default dbConnection;
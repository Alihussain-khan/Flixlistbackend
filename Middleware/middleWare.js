import JWT from 'jsonwebtoken'
import userModel from '../model/userModel.js';

// creating middleware for protection on the basis of token

export const signInRequire = async (req,res,next) =>{    
    try {        
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_Key)
        req.user = decode;
        next(); 

    } catch (error) {
        res.status(401).send({
            success:false,
            message: "error in middleware"
        })
    }
}

///============================
// checking whether a user is admin or user / granting access on the basis of role

export const isAdmin = async(req,res,next) =>{
    try {
        
        const user = await userModel.findById(req.user._id);

        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message: "you are not admin / unauthorized access"
            })
        }else{
            next()
        }

    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            message: "error in admin middleware",
            error
        })
    }
}




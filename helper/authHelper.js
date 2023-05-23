import bcrypt from "bcrypt"

//Hashing Password with SaltRounds
export const hashPassword = async(password) =>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword;
        
    } catch (error) {
        console.log(err)
    }
}

//Comparing a Plain password with harshedPassword;
export const comparePassword = (password,hashedPassword) => {
    return bcrypt.compare(password,hashedPassword)
}



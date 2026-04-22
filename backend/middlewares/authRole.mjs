import jwt from "jsonwebtoken"
import userModel from "../models/userModel.mjs"

const authRole = async(req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        console.log(req.headers.authorization)
    if(!token){
        return res.status(400).json({success: false, message: "authentication failed token not exist"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await userModel.findOne({email: decoded.email, role: decoded.role})
    if(!user){
        return res.status(400).json({success: false, message: "authentication failed this role or email or both is not valid"})
        
    }
    // if(decoded.role !== "admin" ){
    //     return res.status(400).json({success: false, message: "authentication failed this role is not valid"})
    // }
    next()
    
    }catch(err){
        console.log(err, "ree")
        return res.status(500).json({success: false, message: err.message})
    } 
    
}

export default authRole
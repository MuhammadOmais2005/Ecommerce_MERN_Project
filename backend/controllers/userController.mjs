import userModel from "../models/userModel.mjs";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendEmail } from "../utils/sendEmail.mjs"; 
import crypto from "crypto"

const registerUser = async (req, res) => {
    try {
        const { email, password, username, role } = req.body
        const user = await userModel.findOne({ email, role, isVerified: true })
        if (user) {
            return res.status(400).json({ success: false, message: "email already exists or with this role" })
        }
        const hashedPassword = await bcrypt.hash(password, 10) 
        const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString()
        const expiryDate = Date.now() + (1000 * 60)
        await sendEmail(
            email,
            "OTP",
            "otp",
            {
                name: username,
                otp: generatedOtp,
            }
        );
        // const registeredUser = await userModel.create({email, password: hashedPassword, role , username})
        const registeredUser = await userModel.findOneAndUpdate({ email, role }, {
            $set: { email, password: hashedPassword, role, username, isVerified: false, otp: generatedOtp, expiryDate }
        }, 
        {upsert: true, new: true}
        )
        delete registeredUser.password
        res.status(201).json({ success: true, data: registeredUser })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message })
    }
}



const verifyUser = async(req, res)=>{
    try{
        const {email, otp, role} = req.body  
        console.log(email)
        console.log(otp)
        console.log(role)
        const user = await userModel.findOne({ email, role, isVerified: false })
        console.log(user)
        if (!user) {
            return res.status(400).json({ success: false, message: "user does not exist." })
        } 
        if(Date.now() > user.expiryDate){
            return res.status(400).json({ success: false, message: "OTP expired."})   
        }
        if(user.otp == otp){
            user.isVerified = true  
            await user.save()
            return res.status(200).json({ success: true, message: "verified successfully.", data: user })
        }
        return res.status(400).json({ success: false, message: "verification failed" })

    }catch(err){
        console.log(err)
        res.status(500).json({ success: false, message: err.message })   
    }
}

const loginUser = async (req, res) => {
    try {
        
        const { email, password, role } = req.body 
        console.log(email, role)
        const user = await userModel.findOne({ email, role, isVerified: true })
        console.log(user)
        console.log({ email, role, isVerified: true })
        if (!user) {
            return res.status(400).json({ success: false, message: "email doesn't exist or with this role" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "invalid credentials" })
        }

        jwt.sign({ email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                return res.status(400).json({ success: false, message: err.message })
            }
            return res.status(200).json({ success: true, message: "login successfully", data: { email, token, username: user.username, id: user._id } })
        })




    } catch (err) {
        return res.status(400).json({ success: false, message: err.message })
    }
}



const profileUser = async (req, res) => {
    try {

    } catch (err) {
        return res.status(400).json({ success: false, message: err.message })
    }
}


const unregisterUser = async (req, res) => {
    try {
        const { email, role } = req.body
        const user = await userModel.findOneAndDelete({ email, role })
        if (!user) {
            return res.status(400).json({ success: false, message: "user doesn't exist or with this role" })
        }
        return res.status(200).json({ success: true, message: "user successfully delted" })

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}




const forgetPassword = async(req, res)=>{
    try{
        const {email, role} = req.body 
        const user = await userModel.findOne({email, isVerified: true, role}) 
        console.log(user)
        if(!user){
            console.log("jds;")
            return res.status(404).json({success: false, message: "Email is not registered."})
        }
        const token = crypto.randomBytes(32).toString('hex')  
        const resetToken = crypto.createHash("sha256").update(token).digest("hex") 
        user.resetToken = resetToken 
        user.resetExpiry = Date.now() + 1000 * 60 * 10 
        await user.save()
                await sendEmail(
            email,
            "RESET",
            "forgetPassword",
            {
                name: user.username,
                link: `http://localhost:5173/reset-password/${token}`
            }
        );

        res.status(200).json({success: true, message: "email have been sent to reset password", data: {email}})
    }
    catch(err){
        console.log(err)
        res.status(200).json({success: false, message: err.message})
    }
}



const resetPassword = async(req, res)=>{
    try{
        const {password, token} = req.body 
        console.log({password, token})
        const resetToken = crypto.createHash("sha256").update(token).digest("hex")
        const user = await userModel.findOne({resetToken}) 

        if(!user){
            return res.status(400).json({success: false, message: "Invalid token"})
        }
        console.log(user)
        console.log(new Date() > user.resetExpiry)
        if( new Date() > user.resetExpiry){
            return res.status(400).json({success: false, message: "Token expired"})
        }

        const hashedPassword = await bcrypt.hash(password, 10) 
        user.password = hashedPassword 
        await user.save()
        res.status(200).json({success: true, message: "password reset successfully."})

    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err.message})
    }
}



const protectedRoute = async(req, res)=>{
    console.log("valid")
    return res.status(200).json({success: true, message: "token valid, authorized"})
}

export { registerUser, loginUser, unregisterUser, profileUser, verifyUser, forgetPassword, resetPassword, protectedRoute }
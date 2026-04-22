import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        required: true, 
        type: String
    },
    email: {
        required: true, 
        type: String
    }, 
    password: {
        required: true, 
        type: String
    }, 
    role: {
        type: String, 
        enum: ["user", "admin"], 
        default: "user"
    }, 
    isVerified: {
        type: Boolean, 
        default: false
    }, 
    otp: {
        type: String, 
        required: true
    }, 
    expiryDate: {
        type: Date, 
        required: true
    }, 
    resetToken: {
        type: String, 
    }, 
    resetExpiry: {
        type: Date
    }

}, {timestamps: true}) 

const userModel = mongoose.model("User", userSchema) 

export default userModel
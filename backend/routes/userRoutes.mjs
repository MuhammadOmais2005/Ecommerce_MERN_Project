import express from "express" 
import { registerUser, loginUser, unregisterUser, verifyUser, forgetPassword, resetPassword, protectedRoute } from "../controllers/userController.mjs" 
import authRole from "../middlewares/authRole.mjs"
const userRouter = express.Router() 
userRouter.post("/register", registerUser) 
userRouter.post("/verify", verifyUser) 
userRouter.post("/login", loginUser) 
userRouter.delete("/unregister", unregisterUser) 
userRouter.post("/forget-password", forgetPassword) 
userRouter.post("/reset-password", resetPassword) 
userRouter.get("/protected-route", authRole, protectedRoute) 
export default userRouter

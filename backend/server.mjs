import dotenv from "dotenv/config"
import express from "express" 
import mongoose from "mongoose"
import cors from "cors"
import productRouter from "./routes/productRoutes.mjs"
import userRouter from "./routes/userRoutes.mjs" 
import orderRouter from "./routes/orderRoutes.mjs" 
import dashboardRouter from "./routes/dashboardRoutes.mjs"
// console.log('cloud_name:', process.env.CLOUDINARY_CLOUD_NAME);
// console.log('api_key:', process.env.CLOUDINARY_API_KEY);
// console.log('api_secret:', process.env.CLOUDINARY_API_SECRET);
import http from "http"
import {Server} from "socket.io"
const app = express()
const server = http.createServer(app)
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(cors( ))
app.use("/", productRouter)
app.use("/", userRouter) 
app.use("/", orderRouter)
app.use("/", dashboardRouter)
// console.log(process.env.CLOUDINARY_API_KEY, "kk");
const io = new Server(server, {
    cors: { origin: "*" }
})
const orderNamespace = io.of("/order:track");
orderNamespace.on("connection", (socket) => {
  console.log("User connected");
  socket.on("join", (data)=>{
    socket.join(data)
    console.log(`${data} joined room`)
})
});


mongoose.connect(process.env.MONGODB_URI).then((conn)=>{
    console.log("mongoose successfully connected.")
    console.log(`successfully connected to ${conn.connection.host}`)
    console.log(`successfully connected to ${conn.connection.host}`)
}).catch((err)=>{
    console.log("mongoose connection failed", err)
})
server.listen(process.env.PORT,()=>{
    console.log(`server started at port ${process.env.PORT}`)
})


export {orderNamespace, io}


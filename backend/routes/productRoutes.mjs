import express from "express"
import multer from "multer" 
import { addProduct, getProducts, getProduct, getFilter, updateProduct, deleteSingleProduct } from "../controllers/productController.mjs"
import authRole from "../middlewares/authRole.mjs"
const productRouter = express.Router() 
const storage = multer.memoryStorage() 
const upload = multer({storage})
productRouter.get("/products", getProducts)
productRouter.get("/product/:id", getProduct)
productRouter.get("/filter", getFilter)
// productRouter.post("/product",upload.array("images",4) , authRole, addProduct)
productRouter.post("/product",upload.array("images",4) ,addProduct)
productRouter.put("/product/:id",upload.array("images",4) ,updateProduct)
productRouter.delete("/product/:id", deleteSingleProduct)
export default productRouter

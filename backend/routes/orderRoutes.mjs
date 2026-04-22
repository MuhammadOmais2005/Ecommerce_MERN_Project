import express from "express"  
import {addOrder, getOrders, getOrdersFilter, deleteSingleOrder, updateSingleOrder, orderTracking} from "../controllers/orderController.mjs"
const orderRouter = express.Router() 

orderRouter.post("/order", addOrder )
orderRouter.get("/orders", getOrders )
orderRouter.get("/orders-filter", getOrdersFilter )
orderRouter.delete("/order-delete/:id", deleteSingleOrder )
orderRouter.put("/order-update/:id", updateSingleOrder )
orderRouter.get("/order-track/:id", orderTracking )
export default orderRouter
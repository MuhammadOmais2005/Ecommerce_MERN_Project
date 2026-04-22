import express from "express"  
import { getProductsAnalytics, productsOverTime, orderRevenueAnalytics, orderNumberAnalytics, ordersOverTime, revenueOverTime, overview } from "../controllers/dashboardController.mjs";
const dashboardRouter = express.Router() 

dashboardRouter.get("/products-analytics", getProductsAnalytics) 
dashboardRouter.get("/products-qty-over-time", productsOverTime) 
dashboardRouter.get("/order-revenue-analytics", orderRevenueAnalytics) 
dashboardRouter.get("/order-numbers-analytics", orderNumberAnalytics) 
dashboardRouter.get("/orders-over-time", ordersOverTime) 
dashboardRouter.get("/reveneu-over-time", revenueOverTime) 
dashboardRouter.get("/overview", overview) 

export default dashboardRouter
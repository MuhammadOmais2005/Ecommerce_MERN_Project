import mongoose from "mongoose"
import orderModel from "../models/orderModel.mjs"
import productModel from "../models/productModel.mjs" 
import { io, orderNamespace } from "../server.mjs"

const addOrder = async (req, res) => {

    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        const data = req.body
        // console.log(req.body, "body") 
        for (const item of data.orderItems) {
            const product = await productModel.findById(item.productId)
            if (!product) {
                await session.abortTransaction()
                return res.status(404).json({ success: false, message: "Product not found", data: item, availabiliyError: true })
            };

            const sizeExist = product.variants.some((variant) => {
                return variant.size == item.size
            })
            if (!sizeExist) {
                session.abortTransaction()
                return res.status(400).json({ success: false, message: "Size is not available", data: { ...item }, sizeError: true })
            }

            for (const variant of product.variants) {
                if (variant.size == item.size && variant.stock < item.qty) {
                    await session.abortTransaction()
                    return res.status(400).json({ success: false, message: "Stock is not available", data: { ...item, currStock: variant.stock }, stockError: true })
                }
            }
        }
        for (const item of data.orderItems) {
            console.log("running updating product")
            const product = await productModel.findById(item.productId)
            const updatedVariants = [...product.variants].map((variant) => {
                if (variant.size == item.size) {
                    return { size: variant.size, stock: variant.stock - item.qty }
                }
                return variant
            })
            const updatedProduct = await productModel.findByIdAndUpdate(item.productId, { $set: { variants: updatedVariants } }, { new: true, session })
            console.log("updated product", updatedProduct, "updated product")

        }
        console.log("running saving order")
        const orderData = await orderModel.create(data, { session })
        await session.commitTransaction()
        orderNamespace.to(order.shippingAddress.email).emit("orderUpdated", orderData)
        return res.status(201).json({ success: true, message: "order created successfully.", data: orderData })
    } catch (err) {
        console.log(err)
        console.log(err.message)
        await session.abortTransaction()
        return res.status(500).json({ success: false, message: err.message })
    } finally {
        session.endSession()
    }
}




const getOrders = async (req, res) => {
    try {
        const { limit, page, paymentStatus, startDate, endDate, sort, search, orderStatus, maxGrandPrice, minGrandPrice } = req.query

        const filter = {}

        if (orderStatus) {
            filter.orderStatus = orderStatus
        }
        if (minGrandPrice || maxGrandPrice) {
            filter.grandPrice = {}
            if (minGrandPrice) {
                filter.grandPrice.$gte = Number(minGrandPrice)
            }
            if (maxGrandPrice) {
                filter.grandPrice.$lte = Number(maxGrandPrice)
            }
        }
        console.log(paymentStatus)
        if (paymentStatus) {
            let paymentStatusess = []
            if (!Array.isArray(paymentStatus)) {
                paymentStatusess = [paymentStatus]
            } else {
                paymentStatusess = paymentStatus
            }
            filter["paymentInfo.status"] = { $in: paymentStatusess }
        }



        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }


        if (search) {
            console.log(search)
            filter.$or = [
                { "shippingAddress.fullName": { $regex: search, $options: "i" } },
                { "shippingAddress.email": { $regex: search, $options: "i" } },
                { "shippingAddress.phone": { $regex: search, $options: "i" } }
                // { description: { $elemMatch: { $regex: search, $options: "i" } } }
            ];
        }
        console.log(search)

        console.log(filter)

        var sortOption = { createdAt: -1 }

        if (sort) {
            switch (sort) {
                case "new":
                    sortOption = { createdAt: -1 };
                    break;

                case "old":
                    sortOption = { createdAt: 1 };
                    break;

                case "high-price":
                    sortOption = { grandPrice: -1 };
                    break;

                case "low-price":
                    sortOption = { grandPrice: 1 };
                    break;

                case "asc-fullName":
                    sortOption = { "shippingAddress.fullName": 1 };
                    break;

                case "desc-fullName":
                    sortOption = { "shippingAddress.fullName": -1 };
                    break;

                case "asc-orderStatus":
                    sortOption = { "orderStatus": 1 };
                    break;

                case "desc-orderStatus":
                    sortOption = { "orderStatus": -1 };
                    break;

                case "asc-paymentStatus":
                    sortOption = { "paymentInfo.status": 1 };
                    break;

                case "desc-paymentStatus":
                    sortOption = { "paymentInfo.status": -1 };
                    break;
            }
        }

        const options = {
            page: Number(page) || 1,
            limit: Number(limit) || 3,
            sort: sortOption
        }


        const data = await orderModel.paginate(filter, options)

        res.status(200).json({ success: true, data })
    } catch (err) {
        res.status(500).json({ sucess: false, message: err.message })
    }
}


const getOrdersFilter = async (req, res) => {
    try {
        const prices = await orderModel.aggregate([
            {
                $group: {
                    _id: null,
                    maxPrice: { $max: "$grandPrice" },
                    minPrice: { $min: "$grandPrice" },
                }
            }
        ])

        return res.status(200).json({ success: true, data: { maxPrice: prices[0].maxPrice, minPrice: prices[0].minPrice, } })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: err.message })
    }
}



const deleteSingleOrder = async (req, res) => {
    try {
        const id = req.params.id
        const order = await orderModel.findByIdAndDelete(id)
        if (order) {
            console.log(order)
            return res.status(200).json({ success: true, message: "order deleted successfully.", data: order })
        }
        return res.status(400).json({ success: false, message: "order deleted failed." })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: err.message })
    }
}


const updateSingleOrder = async (req, res) => {
    try {
        const id = req.params.id
        console.log(req.body)
        const { orderStatus, paymentStatus } = req.body
        const order = await orderModel.findByIdAndUpdate(id, {
            $set: {
                orderStatus,
                "paymentInfo.status": paymentStatus
            }
        })
        if(order){
            orderNamespace.to(order.shippingAddress.email).emit("orderUpdated", order)
            return res.status(200).json({success: true, message: "order updated successfully", data: order})
        }
        return res.status(400).json({success: false, message: "order update failed"})

    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: err.message })
    }
}






const orderTracking = async(req, res)=>{
    try{
        const email = req.params.id
        console.log(email)
        const data = await orderModel.find({"shippingAddress.email": email, orderStatus: {$nin: ["Delivered", "Completed"]}})
        res.status(200).json({success: true, data})
    }catch(err){
        console.log(err) 
        res.status(500).json({success: false, message: err})
    }
}

export { addOrder, getOrders, getOrdersFilter, deleteSingleOrder, updateSingleOrder, orderTracking }

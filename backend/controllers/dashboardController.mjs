import productModel from "../models/productModel.mjs";
import orderModel from "../models/orderModel.mjs"
import userModel from "../models/userModel.mjs"
import { useState } from "react";


const getProductsAnalytics = async (req, res) => {
  try {
    const totalProducts = await productModel.countDocuments()
    const totalActiveProducts = await productModel.countDocuments({ isActive: true })
    const totalInActiveProducts = await productModel.countDocuments({ isActive: false })
    const totalProductsPerCategory = await productModel.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ])
    const priceAnalytics = await productModel.aggregate([
      {
        $group: {
          _id: null,
          avgPrice: { $avg: "$price" },
          maxPrice: { $max: "$price" },
          minPrice: { $min: "$price" }
        }
      }
    ])
    const totalStock = await productModel.aggregate([
      {
        $unwind: "$variants"
      },
      {
        $group: {
          _id: null,
          totalStock: {
            $sum: "$variants.stock"
          }
        }
      }
    ])
    const totalOutOfStock = await productModel.countDocuments({
      variants: {
        $elemMatch: {
          stock: 0
        }
      }
    })
    const data = {
      totalProducts,
      totalActiveProducts,
      totalInActiveProducts,
      totalProductsPerCategory,
      priceAnalytics,
      totalStock,
      totalOutOfStock
    }
    res.status(200).json({ success: true, message: "true", data })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}




const productsOverTime = async (req, res) => {
  try {
    const { period, start, end } = req.query;

    const startDate = new Date(start);
    const endDate = new Date(end);

    console.log({ period, start, end });

    let groupFormat;

    // Define grouping fields
    if (period === "daily") {
      groupFormat = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" }
      };
    }

    if (period === "weekly") {
      groupFormat = {
        year: { $year: "$createdAt" },
        // month: { $month: "$createdAt" }, // add month
        week: { $week: "$createdAt" }    // week number
      };
    }

    if (period === "monthly") {
      groupFormat = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      };
    }

    if (period === "yearly") {
      groupFormat = {
        year: { $year: "$createdAt" }
      };
    }

    const data = await productModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: groupFormat,
          count: { $sum: 1 }
        }
      },
      // Add a computed "label" field that concatenates all _id parts
      {
        $addFields: {
          label: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: { $ifNull: ["$_id.month", ""] } },
              {
                $cond: [
                  { $ifNull: ["$_id.week", false] },
                  { $concat: ["-W", { $toString: "$_id.week" }] },
                  ""
                ]
              },
              {
                $cond: [
                  { $ifNull: ["$_id.day", false] },
                  { $concat: ["-", { $toString: "$_id.day" }] },
                  ""
                ]
              }
            ]
          }
        }
      },
      // Sort based on all possible fields
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.week": 1,
          "_id.day": 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      period,
      data
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};




const orderRevenueAnalytics = async (req, res) => {
  const { orderStatus, paymentMethod, category, gender } = req.query
  console.log(orderStatus, paymentMethod)
  let matchStatus = {}
  if (orderStatus) {
    matchStatus.orderStatus = orderStatus
  }
  if (paymentMethod) {
    matchStatus["paymentInfo.method"] = paymentMethod
  }


  let matchCategory = {}

  if (category) {
    matchCategory["orderItems.category"] = category
  }
  if (gender == "boy" && category == "kids") {
    matchCategory["orderItems.isBoy"] = true
  }
  if (gender == "girl" && category == "kids") {
    matchCategory["orderItems.isBoy"] = false
  }

  console.log(gender)
  console.log(matchStatus)
  console.log(matchCategory)

  try {
    const revenue = await orderModel.aggregate([
      {
        $match: matchStatus
      },
      {
        $project: { orderItems: 1 }
      },
      {
        $unwind: "$orderItems"

      },
      {
        $match: matchCategory
      },
      {
        $addFields: {
          total: {
            $multiply: ["$orderItems.qty", "$orderItems.price"]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
          avgRevenue: { $avg: "$total" },
          maxRevenue: { $max: "$total" },
          minRevenue: { $min: "$total" }
        }
      }
    ])



    const data = {}

    if (revenue?.[0]?.totalRevenue) {
      data.totalRevenue = revenue?.[0]?.totalRevenue
    } else {
      data.totalRevenue = 0
    }

    if (revenue?.[0]?.avgRevenue) {
      data.avgRevenue = revenue?.[0]?.avgRevenue
    } else {
      data.avgRevenue = 0
    }

    if (revenue?.[0]?.maxRevenue) {
      data.maxRevenue = revenue?.[0]?.maxRevenue
    } else {
      data.maxRevenue = 0
    }

    if (revenue?.[0]?.minRevenue) {
      data.minRevenue = revenue?.[0]?.minRevenue
    } else {
      data.minRevenue = 0
    }

    console.log(data)

    res.status(200).json({ success: true, data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: err.message })
  }
}




const orderNumberAnalytics = async (req, res) => {


  try {
    const numbers = await orderModel.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          numbers: { $sum: 1 },
        }
      }
    ])

    const data = {}

    console.log(data)

    res.status(200).json({ success: true, data: numbers })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: err.message })
  }
}







const ordersOverTime = async (req, res) => {
  try {
    const { period, start, end, orderStatus, paymentMethod, category, gender } = req.query;

    const startDate = new Date(start);
    const endDate = new Date(end);

    let matchStatus = {
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    }
    if (orderStatus) {
      matchStatus.orderStatus = orderStatus
    }
    if (paymentMethod) {
      matchStatus["paymentInfo.method"] = paymentMethod
    }


    let matchCategory = {}

    if (category) {
      matchCategory["orderItems.category"] = category
    }
    if (gender == "boy" && category == "kids") {
      matchCategory["orderItems.isBoy"] = true
    }
    if (gender == "girl" && category == "kids") {
      matchCategory["orderItems.isBoy"] = false
    }

    console.log(gender)
    console.log(matchStatus)
    console.log(matchCategory)


    // const startDate = new Date(start);
    // const endDate = new Date(end);


    // let match = {
    //   createdAt: {
    //     $gte: startDate,
    //     $lte: endDate
    //   }
    // }

    // if (orderStatus) {
    //   match.orderStatus = orderStatus
    // }
    // if (paymentMethod) {
    //   match["paymentInfo.method"] = paymentMethod
    // }

    console.log({ period, start, end });

    let groupFormat;

    // Define grouping fields
    if (period === "daily") {
      groupFormat = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" }
      };
    }

    if (period === "weekly") {
      groupFormat = {
        year: { $year: "$createdAt" },
        // month: { $month: "$createdAt" }, // add month
        week: { $week: "$createdAt" }    // week number
      };
    }

    if (period === "monthly") {
      groupFormat = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      };
    }

    if (period === "yearly") {
      groupFormat = {
        year: { $year: "$createdAt" }
      };
    }

    const data = await orderModel.aggregate([
      {
        $match: matchStatus
      },
      {
        $unwind: "$orderItems"
      },
      {
        $match: matchCategory
      },
      {
        $group: {
          _id: groupFormat,
          count: { $sum: 1 }
        }
      },
      // Add a computed "label" field that concatenates all _id parts
      {
        $addFields: {
          label: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: { $ifNull: ["$_id.month", ""] } },
              {
                $cond: [
                  { $ifNull: ["$_id.week", false] },
                  { $concat: ["-W", { $toString: "$_id.week" }] },
                  ""
                ]
              },
              {
                $cond: [
                  { $ifNull: ["$_id.day", false] },
                  { $concat: ["-", { $toString: "$_id.day" }] },
                  ""
                ]
              }
            ]
          }
        }
      },
      // Sort based on all possible fields
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.week": 1,
          "_id.day": 1
        }
      }
    ]);


    console.log(data)

    res.status(200).json({
      success: true,
      period,
      data
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};







const revenueOverTime = async (req, res) => {
  try {
    const { period, start, end, orderStatus, paymentMethod, category, gender } = req.query;


    const startDate = new Date(start);
    const endDate = new Date(end);

    let matchStatus = {
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    }
    if (orderStatus) {
      matchStatus.orderStatus = orderStatus
    }
    if (paymentMethod) {
      matchStatus["paymentInfo.method"] = paymentMethod
    }


    let matchCategory = {}

    if (category) {
      matchCategory["orderItems.category"] = category
    }
    if (gender == "boy" && category == "kids") {
      matchCategory["orderItems.isBoy"] = true
    }
    if (gender == "girl" && category == "kids") {
      matchCategory["orderItems.isBoy"] = false
    }

    console.log(gender)
    console.log(matchStatus)
    console.log(matchCategory)



    // const startDate = new Date(start);
    // const endDate = new Date(end);


    // let match = {
    //   createdAt: {
    //     $gte: startDate,
    //     $lte: endDate
    //   }
    // }

    // if (orderStatus) {
    //   match.orderStatus = orderStatus
    // }
    // if (paymentMethod) {
    //   match["paymentInfo.method"] = paymentMethod
    // }

    console.log({ period, start, end });

    let groupFormat;

    // Define grouping fields
    if (period === "daily") {
      groupFormat = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" }
      };
    }

    if (period === "weekly") {
      groupFormat = {
        year: { $year: "$createdAt" },
        // month: { $month: "$createdAt" }, // add month
        week: { $week: "$createdAt" }    // week number
      };
    }

    if (period === "monthly") {
      groupFormat = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      };
    }

    if (period === "yearly") {
      groupFormat = {
        year: { $year: "$createdAt" }
      };
    }

    const data = await orderModel.aggregate([
      {
        $match: matchStatus
      },
      {
        $unwind: "$orderItems"
      },
      {
        $match: matchCategory
      },
      {
        $addFields: {
          total: {
            $multiply: ["$orderItems.qty", "$orderItems.price"]
          }
        }
      },
      {
        $group: {
          _id: groupFormat,
          count: { $sum: "$total" }
        }
      },
      // Add a computed "label" field that concatenates all _id parts
      {
        $addFields: {
          label: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: { $ifNull: ["$_id.month", ""] } },
              {
                $cond: [
                  { $ifNull: ["$_id.week", false] },
                  { $concat: ["-W", { $toString: "$_id.week" }] },
                  ""
                ]
              },
              {
                $cond: [
                  { $ifNull: ["$_id.day", false] },
                  { $concat: ["-", { $toString: "$_id.day" }] },
                  ""
                ]
              }
            ]
          }
        }
      },
      // Sort based on all possible fields
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.week": 1,
          "_id.day": 1
        }
      }
    ]);


    console.log(data)

    console.log(data)
    res.status(200).json({
      success: true,
      period,
      data
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};







const overview = async (req, res) => {
  const { start, end, period } = req.query



  try {
    const users = await userModel.find({ role: "user" }).countDocuments()

    const customers = await orderModel.find().distinct("shippingAddress.email")

    const topOrders = await orderModel.find().sort({ grandPrice: -1 }).limit(5)

    const topProduct = await orderModel.aggregate([
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: "$orderItems.productId",
          totalQty: { $sum: "$orderItems.qty" }, 
          product: {$last: "$orderItems"}          
        }
      },
      {
        $sort: {totalQty: -1}
      },
      {
        $limit: 5
      }
    ])

    const topCustomers = await orderModel.aggregate([
      {
        $group: {
          _id: "$shippingAddress.email",
          totalGrandPrice: { $sum: "$grandPrice" },   
          info: {$last: "$shippingAddress"}       
        }
      },
      {
        $sort: {totalQty: -1}
      },
      {
        $limit: 5
      }
    ])





    const data = {}
    if (users) {
      data.users = users
    }
    if (customers && Array.isArray(customers)) {
      data.customers = customers.length
    }
    if (topOrders && Array.isArray(topOrders)) {
      data.topOrders = topOrders
    }
    if (topProduct && Array.isArray(topProduct)) {
      data.topProducts = topProduct
    }
    if (topCustomers && Array.isArray(topCustomers)) {
      data.topCustomers = topCustomers
    }
    res.status(200).json({ success: true, data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: err.message })
  }
}


export { getProductsAnalytics, productsOverTime, orderRevenueAnalytics, orderNumberAnalytics, ordersOverTime, revenueOverTime, overview }
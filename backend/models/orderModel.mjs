import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const orderSchema = new mongoose.Schema(
  {

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderItems: [mongoose.Schema.Types.Mixed],

    // 🔹 Shipping Address
    shippingAddress: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String},
      country: { type: String, required: true },
      state: { type: String, required: true },
    },

    // 🔹 Payment Information
    paymentInfo: {
      transactionId: mongoose.Schema.Types.ObjectId,
      method: {
        type: String,
        enum: ["cod", "card"],
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending",
      },
      paidAt: Date,
    },

    // 🔹 Pricing
    shippingPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    grandPrice: { type: Number, required: true },

    // 🔹 Order Status
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      default: "Pending",
    },

    // 🔹 Delivery & Cancel Info
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,

    isCancelled: { type: Boolean, default: false },
    cancelledAt: Date,
  },
  { timestamps: true }
);

orderSchema.plugin(mongoosePaginate)

export default mongoose.model("Order", orderSchema);


// {
//   "user": "6995ce8d3c00426146f455ac",
//   "orderItems": [
//     {
//       "title": "hello"
//     }
//   ], 
//   "isDelivered": false, 
//   "isCancelled": false, 
//   "orderStatus": "Pending", 
//   "shippingPrice": 500, 
//   "totalPrice": 50000, 
//   "grandPrice": 550000,
//   "paymentInfo": {
//     "method": "cod",
//     "status": "Pending",
//     "paidAt": "2026-02-18T10:30:00.000Z"
//   },
//   "shippingAddress": {
//     "fullName": "Muhammad Ali",
//     "phone": "+9234587623451",
//     "address": "karachi street ",
//     "city": "karachi",
//     "postalCode": "75050",
//     "country": "Pakistan",
//     "state": "Sindh"
//   }


// }





// {
//   "email": "muhammadomais@gmail.com",
//   "password": "omais1@1",
//   "username": "Muhammad Omais", 
//   "role": "user"
// }















// {

//   "user": "6992ad7528fd894871f9eddc",
//   "orderItems": [
//     {
//       "productId": "69a18fa2c62693454a788240",
//       "title": "lkasfl'k'",
//       "price": 1313,
//       "images": [
//         "https://res.cloudinary.com/da87qbgpq/image/upload/v1772195746/vvlzq8h2ogfv6dajd4fe.jpg",
//         "https://res.cloudinary.com/da87qbgpq/image/upload/v1772197341/xsrpydhosyyt8wl8fcen.webp",
//         "https://res.cloudinary.com/da87qbgpq/image/upload/v1772197341/mkakbfom3p5usg855ctm.webp"
//       ],
//       "stock": 9,
//       "category": "men",
//       "color": "red",
//       "numReviews": 0,
//       "rating": 0,
//       "qty": 2,
//       "size": "M"
//     }
//   ],
//   "shippingAddress": {
//     "fullName": "Muhammad Omais",
//     "email": "muhammadomais@gmail.com",
//     "phone": "+923212639731",
//     "address": "Flat # A305 Raza Rsidency Malir Karach8i",
//     "city": "Karachi",
//     "postalCode": "75050",
//     "country": "Pakistan",
//     "state": "Sindh"
//   },
//   "paymentInfo": {
//     "method": "cod",
//     "status": "Pending",
//     "paidAt": null
//   },
//   "shippingPrice": 500,
//   "totalPrice": 2626,
//   "grandPrice": 3126,
//   "orderStatus": "Pending",
//   "isDelivered": false,
//   "isCancelled": false,
//   "createdAt": {
//     "$date": "2026-03-02T12:35:50.138Z"
//   },
//   "updatedAt": {
//     "$date": "2026-03-02T12:35:50.138Z"
//   }
// }
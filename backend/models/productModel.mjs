import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["men", "women", "kids"]
    },
    images: {
        type: [String],
    },
    price: {
        required: true,
        type: Number, 
        min: 0
    },
    variants: [
        {
            size: {
                required: true,
                type: String,
                enum: ["XS", "S", "M", "L", "XL"]
            },
            stock: {
                type: Number,
                required: true, 
                min: 0
            }
        }
    ],
    color: {
        required: true,
        type: String
    },
    rating: {
        type: Number,
        default: 0, 
        min: 0, 
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0, 
        min: 0
    }, 
    fabric: {
        type: "string"
    },
    isBoy: {
        type: Boolean,
    },
    isActive: {
        type: Boolean,
        default: true
    }


}, { timestamps: true })

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model("Product", productSchema)

export default productModel




import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images:{
        type: ["String"]
    },
    // category: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Category'
    // }

}, {timestamps: true})

export default mongoose?.models?.Product || mongoose.model("Product", ProductSchema)
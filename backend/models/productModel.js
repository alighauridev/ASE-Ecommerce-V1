const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },

    price: {
        type: Number,
        required: [true, "Please enter product price"],
    },
    cuttedPrice: {
        type: Number,
        required: [true, "Please enter cutted price"],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxlength: [4, "Stock cannot exceed limit"],
        default: 1,
    },

    auction: {
        isAuction: Boolean,
        startTime: Date,
        endTime: Date,
        startingBid: Number,
    },
    classifiedAd: {
        isClassifiedAd: Boolean,
        promotionDuration: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);

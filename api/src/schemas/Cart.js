const mongoose = require("mongoose");

const Cart = mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["in Process", "sold", "delivered"],
      default: "in Process",
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    seller_id: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    buyer_id: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", Cart);

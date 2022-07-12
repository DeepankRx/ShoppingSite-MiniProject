const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: String,
        quantity: Number,
        title: String,
        description: String,
        price: Number,
        imageUrl: String,
      },
    ],
    isOrdered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);

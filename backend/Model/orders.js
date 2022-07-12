const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = Schema(
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
        dateOfOrder: {
          type: Date,
          default: Date.now(),
        },
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
module.exports = mongoose.model("Order", orderSchema);

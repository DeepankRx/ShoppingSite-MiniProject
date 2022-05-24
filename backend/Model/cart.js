const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);

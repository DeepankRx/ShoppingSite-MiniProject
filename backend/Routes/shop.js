const path = require("path");

const express = require("express");

const productsController = require("../Controller/product");
const cartController = require("../Controller/cart");
const router = express.Router();

router.get("/all-products", productsController.getProducts);
router.get("/:productId", productsController.getASingleProduct);
router.post("/cart", cartController.postCart);
module.exports = router;

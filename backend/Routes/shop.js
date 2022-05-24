const path = require("path");

const express = require("express");

const productsController = require("../Controller/product");
const cartController = require("../Controller/cart");
const router = express.Router();

router.get("/getCart", cartController.getCart);
router.get("/all-products", productsController.getProducts);
router.post("/cart", cartController.postCart);
router.get("/:productId", productsController.getASingleProduct);
module.exports = router;

const path = require("path");

const express = require("express");

const productsController = require("../Controller/product");

const router = express.Router();

router.get("/all-products", productsController.getProducts);
router.get("/:productId", productsController.getASingleProduct);

module.exports = router;

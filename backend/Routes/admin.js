const path = require("path");

const express = require("express");

const productsController = require("../Controller/product");

const router = express.Router();

router.post("/add-product", productsController.postAddProduct);
router.delete("/delete-product/:productId", productsController.deleteProduct);
router.put("/update-product/:productId", productsController.updateProduct);
module.exports = router;

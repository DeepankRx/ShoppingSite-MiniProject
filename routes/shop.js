const express = require("express");
const router = express.Router();
const path = require("path");
const adminData = require("./admin")
router.get("/", (req, res, next) => {
    const products = adminData.products;
    res.status(200).render('shop',{prods: products,docTitle:'Shop'});
});

module.exports = router;
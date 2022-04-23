const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");

const products = [];

router.post("/add-product", (req, res, next) => {
    products.push({
        title: req.body.title
    });

  res.redirect("/");
});


router.get("/add-product", (req, res, next) => {
  res.status(200).render("add-product",{pageTitle:"Add Product",path: "/admin/add-product"});
});

exports.routes = router;
exports.products = products;

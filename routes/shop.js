const express = require("express");
const router = express.Router();
const path = require("path");
const adminData = require("./admin")
router.get("/", (req, res, next) => {
    console.log(adminData.products);
    res.status(200).render('shop');
});

module.exports = router;
const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});


router.get("/add-product", (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir , "views", "add-product.html"));
});

module.exports = router;

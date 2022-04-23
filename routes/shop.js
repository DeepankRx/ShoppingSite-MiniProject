const express = require("express");
const router = express.Router();
const path = require("path");
router.get("/", (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname,'../','views','shop.html'))
});

module.exports = router;
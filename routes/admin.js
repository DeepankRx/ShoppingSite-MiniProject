const express = require("express");
const router = express.Router();


router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});


router.get("/add-product", (req, res, next) => {
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title' placeholder='Enter the product'></input><button type='submit'>Submit    </button></form>"
  );
});

module.exports = router;

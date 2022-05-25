const express = require("express");

const userController = require("../Controller/user");

const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/isLoggedIn", userController.isLoggedIn);
router.get("/logout", userController.logoutUser);
module.exports = router;

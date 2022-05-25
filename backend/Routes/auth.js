const path = require("path");

const express = require("express");

const userController = require("../Controller/user");

const router = express.Router();

router.post("/register",userController.createUser);

module.exports = router;
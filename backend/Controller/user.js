const User = require("../Model/user");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  const saltRounds = 10;  
  const { name, email, password, address, phone } = req.body;
  const hashPassword = await bcrypt.hash(password,saltRounds);
  console.log(hashPassword)
  const user = new User({
    name: name,
    email: email,
    password: hashPassword,
    address: address,
    phone: phone,
  });
  user
    .save()
    .then(() => {
      res.json({
        message: "Sign Up successfully!",
      });
    })
    .catch((err) => {
      res.json({
        message: "Email or Phone already exist",
      });
    });
};

exports.loginUser = async (req, res) => {
  req.session.isLoggedIn = true;
  const { email, password } = req.body;
  User.findOne({ email: email, password: password }).then((user) => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "User not found!",
      });
    }
  });
};

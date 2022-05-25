const User = require("../Model/user");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  const saltRounds = 10;
  const { name, email, password, address, phone } = req.body;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  console.log(req.session.isLoggedIn)
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
  const { email, password } = req.body;
  req.session.isLoggedIn = true;
  console.log(req.body);
  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          console.log(req.session);
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(404).json({
        message: "User not found!",
      });
    }
  });
};

exports.isLoggedIn = async (req, res) => {
  if (req.session.isLoggedIn) {
    return res.json({
      message: "You are signed in",
      loggedIn: true,
    });
  } else {
    return res.json({
      message: "Please sign in",
      loggedIn: false,
    });
  }
};

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const app = express();
const uri = "mongodb://localhost:27017/mern-shopping";
mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.once("open", () => console.log("Connected to mongoose"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./Routes/auth");
app.use("/api/admin", adminRoutes);
app.use("/api/shop", shopRoutes);
app.use('/api/auth',authRoutes);
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/404.html"));
});
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

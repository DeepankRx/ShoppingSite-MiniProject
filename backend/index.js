const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const storage = require("node-sessionstorage");
const MongoDBStore = require("connect-mongodb-session")(session);
const uri = "mongodb://localhost:27017/mern-shopping";
const app = express();
const store = new MongoDBStore({
  uri: uri,
  collection: "sessions",
});
mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.once("open", () => console.log("Connected to mongoose"));
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 10, // 1 week
    },
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

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
app.use("/api/auth", authRoutes);
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/404.html"));
});
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

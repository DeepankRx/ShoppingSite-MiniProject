const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(adminRoutes);
app.use(shopRoutes);

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server is running on port " + port);
});

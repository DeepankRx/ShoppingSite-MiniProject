const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
})

app.use("/add-product", (req, res, next) => {   
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title' placeholder='Enter the product'></input><button type='submit'>Submit    </button></form>"
  );
});
app.use("/", (req, res, next) => {
  res.send("<h1>Hello From Express</h1>");

});

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server is running on port " + port);
});

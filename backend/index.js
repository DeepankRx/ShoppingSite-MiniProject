const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
})  
const port = 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
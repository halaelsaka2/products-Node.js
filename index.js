const express = require('express');
const userRoute = require("./routs/user");
const productRoute = require("./routs/product");
const categoryRoute = require("./routs/cat")
require('express-async-errors');
require('dotenv').config();
require("./db");
const cors = require ("cors")
const app =express();
const port=3000;

// var bodyParser = require('body-parser');
   
// var expressValidator = require('express-validator');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressValidator());

app.use(cors())

app.use(express.json());
app.use(express.urlencoded());

app.use("/user",userRoute);
app.use("/product",productRoute);
app.use("/category",categoryRoute);



app.use((req,res,next)=>{
    res.json({
        "request url":req.url,
        method: req.method,
        "current time":Date.now()
    })
})

app.use((err,req,res,next) => {
    console.log(err)
    const statusCode= err.statusCode || 500;

    // if(err.statusCode >=500){
    //     return res.status(statusCode).json({
    //         meesage:'Something wrong',
    //         type:'INTERNAL_SERVER_ERORR',
    //         details:[]
    //     })
    // }
    res.status(statusCode).json({
        // statusCode:err.statusCode,
        meesage:err.message,
        type:err.type,
        details:err.details
    })
})

app.listen(port, () => console.log(`running at port ${port}`));
//Requiring config setting for the app
require('../config/config');


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","OPTIONS,PUT,POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.put('/vehicles',(req,res)=>{
    console.log(req.body);
    res.send();
});

app.post('/readings',(req,res)=>{
   console.log(req.body);
   res.send();
});

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});

module.exports = {app};
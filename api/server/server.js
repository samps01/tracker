//Requiring config setting for the app
require('../config/config');


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const _ = require('lodash');



const {vehicleController} = require('../controller/vehicles');
const {readingObj,readingController} = require('../controller/reading');
const {alertNotification} = require('../controller/alertNotification');
const {alertMail} = require('../controller/mailer');

const app = express();
const port = process.env.PORT;

const accessLogStream = fs.createWriteStream(`./access.log`, {flags: 'a'});

app.use(morgan('short',{stream: accessLogStream}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","OPTIONS,PUT,POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//PUT method for vehicles data
app.put('/vehicles',(req,res)=>{
    const vehicles = req.body;
    if(_.isEmpty(vehicles)){
        res.status(400).send({text:'Vehicle data expected'});
    }else{
        vehicles.forEach((vehicle)=>{
            vehicleController(vehicle);
        });
        res.send();
    }
});

//POST method for reading data
app.post('/readings',(req,res)=>{
    const data = req.body;
    if(_.isEmpty(data)){
        res.status(400).send({text:'Expects readings data'});
    }else{
        alertNotification.alertNotifier(data);
        const result = readingObj(data);
        readingController(data,result);
        res.send();
    }
    //alertMail('sp03075n@pace.edu','Trial mail','Hello World');
});

app.use('/*',(req,res,next)=>{
   res.status(404).send({type:'Not found Error'})
    next();
});
app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});

module.exports = {app};
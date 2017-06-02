//Requiring config setting for the app
require('../config/config');


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');



const {vehicleController} = require('../controller/vehicles');
const {readingObj,readingController} = require('../controller/reading');
const {alertNotification} = require('../controller/alertNotification');

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

    vehicles.forEach((vehicle)=>{
        vehicleController(vehicle);
    });
    res.send();
});

//POST method for reading data
app.post('/readings',(req,res)=>{
    const data = req.body;
    alertNotification.engineRpmAlert(data);
    alertNotification.fuelVolumeAlert(data);
    alertNotification.tireAlert(data);
    alertNotification.checkEngineAlert(data);
    const result = readingObj(data);
    readingController(data,result);
    res.send()
});

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});

module.exports = {app};
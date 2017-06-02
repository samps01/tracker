//Requiring config setting for the app
require('../config/config');


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');

const {Vehicles} = require('../models/vehicles');
const {Readings} = require('../models/readings');

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

const insertDocument = (docs,collection)=>{
    collection.insertMany(docs).then((data)=>{
       // console.log('Added');
    },(e)=>{
        console.log(e);
    });
};
app.put('/vehicles',(req,res)=>{
    const vehicles = req.body;

    vehicles.forEach((vehicle)=>{
        Vehicles.findOneAndUpdate({vin:vehicle.vin},{
            $set:{
                make:vehicle.make,
                model:vehicle.model,
                year:vehicle.year,
                redlineRpm:vehicle.redlineRpm,
                maxFuelVolume:vehicle.maxFuelVolume,
                lastServiceDate:vehicle.lastServiceDate
            }
        },{
            new: true
        }).then((data)=>{
            if(data === null){
                insertDocument(vehicle,Vehicles);
            }else{
             //   console.log('updated')
            }
        }).catch((e)=>{
            console.log(e);
        })
    });
    res.send();
});


//Custom reading object schema
const readingObj = (data)=>{
    return {
        vin: data.vin,
        location:[
            {
                latitude:data.latitude,
                longitude:data.longitude
            }
        ],
        timestamp:[data.timestamp],
        fuelVolume:[data.fuelVolume],
        speed:[data.speed],
        engineHp:[data.speed],
        checkEngineLightOn:[data.checkEngineLightOn],
        engineCoolantLow:[data.engineCoolantLow],
        cruiseControlOn:[data.cruiseControlOn],
        engineRpm:[data.engineRpm],
        tires:[
            {
                frontLeft:data.tires.frontLeft,
                frontRight:data.tires.frontRight,
                rearLeft:data.tires.rearLeft,
                rearRight:data.tires.rearRight
            }
        ]
    };
};

//function to add to Reading collection
const addNewReading = (data)=>{
    Readings.insertMany(result).then((data)=>{
        //console.log('Added Reading');
    }).catch((e)=>{
        res.send(e);
    });
};

app.post('/readings',(req,res)=>{
    const data = req.body;
    const result = readingObj(data);
    Readings.findOneAndUpdate({vin:data.vin},{
        $push:{
            location:{
                latitude:data.latitude,
                longitude:data.longitude
            },
            timestamp:data.timestamp,
            fuelVolume:data.fuelVolume,
            speed:data.speed,
            engineHp:data.engineHp,
            checkEngineLightOn:data.checkEngineLightOn,
            engineCoolantLow:data.engineCoolantLow,
            cruiseControlOn:data.cruiseControlOn,
            engineRpm:data.engineRpm,
            tires:{
                frontLeft:data.tires.frontLeft,
                frontRight:data.tires.frontRight,
                rearLeft:data.tires.rearLeft,
                rearRight:data.tires.rearRight
            }
        }
    },{
        new:true
    }).then((data)=>{
        if(data === null){
            addNewReading(data);
        }else{
            //console.log('Updated Reading')
        }
        res.send();
    }).catch((e)=>{
       res.send(e);
    });
});



app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});

module.exports = {app};
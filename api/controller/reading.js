const {Readings} = require('../models/readings');

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
const addNewReading = (doc)=>{
    Readings.insertMany(doc).then((res)=>{
        //console.log('Added Reading');
    }).catch((e)=>{
        console.log(e)
    });
};

const readingController = (data,result)=>{
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
    }).then((res)=>{
        if(res === null){
            addNewReading(result);
        }else{
            //console.log('Updated Reading')
        }
    }).catch((e)=>{
        console.log(e);
    });
}

module.exports = {readingObj,readingController};
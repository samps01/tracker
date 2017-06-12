const {AlertNotification} = require('../models/alert');
const {Vehicles} = require('../models/vehicles');
const _ = require('lodash');
const moment = require('moment');

//Gets vehicle info from the vehicle collection
const getVehicleInfo = (currentData)=>{
   let data = Vehicles.findOne({vin:currentData.vin}).then((data)=>{
        return data
  }).catch((e)=>{
     console.log(e);
  });
   return data;
};


//Parent method to be exported = accepts readings
const alertNotifier = (readingData)=>{
    const vehicleData = getVehicleInfo(readingData);
    vehicleData.then((data)=>{
       update(readingData,data);
    }).catch((err)=>{
       console.log(err);
    });
};

//Defines the model for the alert structure
const alertModel = (currentData)=>{
    const alertObj = {
        vin:"",
        priority:[]
    };
    const vehicleData = getVehicleInfo(currentData);
    return vehicleData.then((vehicle)=>{
        //code refractoring required
        const fuelRatio = (currentData.fuelVolume/vehicle.maxFuelVolume)*100;
        if(vehicle !== null){
            alertObj.vin  = currentData.vin;
            if(currentData.engineRpm > vehicle.redlineRpm){
                alertObj.priority.push({
                    flag:'HIGH',
                    message:"Red Line RPM exceeded",
                    timeStamp: currentData.timestamp
                });
            };
            if(fuelRatio<10){
                alertObj.priority.push({
                    flag:'Medium',
                    message:"Less than 10% Fuel",
                    timeStamp: currentData.timestamp
                });
            };
            for(const prop in currentData.tires){
                if(currentData.tires[prop] < 32 || currentData.tires.prop > 36){
                    alertObj.priority.push({
                        flag:'LOW',
                        message:`Tire Pressure ${prop}`,
                        timeStamp: currentData.timestamp
                    });
                }
            }
            if(currentData.engineCoolantLow || currentData.checkEngineLightOn){
                if(currentData.engineCoolantLow){
                    alertObj.priority.push({
                        flag:'LOW',
                        message:"Engine Coolant Low",
                        timeStamp: currentData.timestamp
                    });
                }
                if(currentData.checkEngineLightOn){
                    alertObj.priority.push({
                        flag:'LOW',
                        message:"Check Engine",
                        timeStamp: currentData.timestamp
                    });
                }
            }
        };
        if(alertObj.priority.length>0){
            return alertObj;
        }
        return false;
    }).catch((err)=>{
        console.log(err);
    });
};


//Filters for rules
//Returns array of alert object
//if no alert - return empty array
const alertRules = (currentData,vehicle)=>{
    let priority = [];
    const fuelRatio = (currentData.fuelVolume/vehicle.maxFuelVolume)*100;
    if(vehicle !== null){
        if(currentData.engineRpm > vehicle.redlineRpm){
            priority.push({
                flag:'HIGH',
                message:"Red Line RPM exceeded",
                timeStamp: currentData.timestamp
            });
        };
        if(fuelRatio<10){
            priority.push({
                flag:'Medium',
                message:"Less than 10% Fuel",
                timeStamp: currentData.timestamp
            });
        };
        for(const prop in currentData.tires){
            if(currentData.tires[prop] < 32 || currentData.tires[prop] > 36){
                priority.push({
                    flag:'LOW',
                    message:"Tire Pressure",
                    timeStamp: currentData.timestamp
                });
            }
        }
        if(currentData.engineCoolantLow || currentData.checkEngineLightOn){
            if(currentData.engineCoolantLow){
                priority.push({
                    flag:'LOW',
                    message:"Engine Coolant Low",
                    timeStamp: currentData.timestamp
                });
            }
            if(currentData.checkEngineLightOn){
                priority.push({
                    flag:'LOW',
                    message:"Check Engine",
                    timeStamp: currentData.timestamp
                });
            }
        }
    };
    if(priority.length===0){
        return [];
    }
    return priority;
};

//Adds new alert to the alert collection
const addAlert = (alertObj)=>{
    AlertNotification.insertMany(alertObj).then((docs)=>{
        return docs;
    }).catch((e)=>{
        console.log(e);
    });
};

//Update function checks for existing records and updates it
//if no record found calls addAlert function
const update = (newData,vehicleData)=>{
        const priority = alertRules(newData,vehicleData);
        AlertNotification.findOneAndUpdate({vin:newData.vin},{
                $push:{
                    priority : {$each:priority}
                }
            },{
                new:true
            }).then((data)=>{
            if(data === null){
                const model = alertModel(newData)
                return model;
            }
            return false;
        }).then((doc)=>{
            if(doc){
                addAlert(doc);
            }
        }).catch((e)=>{
            console.log(e)
        })
};
module.exports.alertNotification = {
    alertNotifier
}
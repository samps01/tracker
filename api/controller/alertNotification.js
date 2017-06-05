const {AlertNotification} = require('../models/alert');
const {Vehicles} = require('../models/vehicles');
const _ = require('lodash');

const getVehicleInfo = (currentData)=>{
   let data = Vehicles.findOne({vin:currentData.vin}).then((data)=>{
        return data
  }).catch((e)=>{
     console.log(e);
  });
   return data;
};


const alertNotifier = (readingData)=>{
    const vehicleData = getVehicleInfo(readingData);
    vehicleData.then((data)=>{
       update(readingData,data);
    }).catch((err)=>{
       console.log(err);
    });
};

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
                    timeStamp: Date()
                });
            };
            if(fuelRatio<10){
                alertObj.priority.push({
                    flag:'Medium',
                    message:"Less than 10% Fuel",
                    timeStamp: Date()
                });
            };
            for(const prop in currentData.tires){
                if(currentData.tires[prop] < 32 || currentData.tires.prop > 36){
                    alertObj.priority.push({
                        flag:'LOW',
                        message:`Tire Pressure ${prop}`,
                        timeStamp: Date()
                    });
                }
            }
            if(currentData.engineCoolantLow || currentData.checkEngineLightOn){
                if(currentData.engineCoolantLow){
                    alertObj.priority.push({
                        flag:'LOW',
                        message:"Engine Coolant Low",
                        timeStamp: Date()
                    });
                }
                if(currentData.checkEngineLightOn){
                    alertObj.priority.push({
                        flag:'LOW',
                        message:"Check Engine",
                        timeStamp: Date()
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

const alertRules = (currentData,vehicle)=>{
    let priority = [];
    const fuelRatio = (currentData.fuelVolume/vehicle.maxFuelVolume)*100;
    if(vehicle !== null){
        if(currentData.engineRpm > vehicle.redlineRpm){
            priority.push({
                flag:'HIGH',
                message:"Red Line RPM exceeded",
                timeStamp: Date()
            });
        };
        if(fuelRatio<10){
            priority.push({
                flag:'Medium',
                message:"Less than 10% Fuel",
                timeStamp: Date()
            });
        };
        for(const prop in currentData.tires){
            if(currentData.tires[prop] < 32 || currentData.tires[prop] > 36){
                priority.push({
                    flag:'LOW',
                    message:"Tire Pressure",
                    timeStamp: Date()
                });
            }
        }
        if(currentData.engineCoolantLow || currentData.checkEngineLightOn){
            if(currentData.engineCoolantLow){
                priority.push({
                    flag:'LOW',
                    message:"Engine Coolant Low",
                    timeStamp: Date()
                });
            }
            if(currentData.checkEngineLightOn){
                priority.push({
                    flag:'LOW',
                    message:"Check Engine",
                    timeStamp: Date()
                });
            }
        }
    };
    if(priority.length===0){
        return [];
    }
    return priority;
};

const addAlert = (alertObj)=>{
    AlertNotification.insertMany(alertObj).then((docs)=>{
        return docs;
    }).catch((e)=>{
        console.log(e);
    });
};

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
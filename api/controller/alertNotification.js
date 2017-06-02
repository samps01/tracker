const {AlertNotification} = require('../models/alert');
const {Vehicles} = require('../models/vehicles');

let vehicleInfo;
const getVehicleInfo = (currentData)=>{
    //console.log(currentData)
   let data = Vehicles.findOne({vin:currentData.vin}).then((data)=>{
        return data
  }).catch((e)=>{
     console.log(e);
  });
   return data;
};

const engineRpmAlert = (currentData)=>{
    const alertObj = {};
    const vehicleData = getVehicleInfo(currentData);
    vehicleData.then((data)=>{
        if(currentData.engineRpm > data.redlineRpm) {
            alertObj.vin = data.vin;
            alertObj.priority = 'HIGH';
            alertObj.engineRpm = currentData.engineRpm;
            return alertObj;
        }
    }).then((obj)=>{
        addAlert(obj);
    });
};

const fuelVolumeAlert = (currentData)=>{
    const alertObj = {};
    const vehicleData = getVehicleInfo(currentData);
        vehicleData.then((data)=>{
            if(((currentData.fuelVolume/data.maxFuelVolume)*100)<10){
                alertObj.vin = data.vin;
                alertObj.fuelVolume = currentData.fuelVolume;
                alertObj.priority = 'MEDIUM';
                return alertObj;
            };
        }).then((obj)=>{
           addAlert(obj);
        });
};

const tireAlert = (currentData)=>{
    const alertObj = {};
    const vehicleData = getVehicleInfo(currentData);
    vehicleData.then((data)=>{
        const tireData  = currentData.tires;
        if(tireData.frontLeft < 32 || tireData.frontLeft >36){
            alertObj.vin = data.vin;
            alertObj.tires= {frontLeft:tireData.frontLeft}
            alertObj.priority = 'LOW';
        }
        if(tireData.frontRight < 32 || tireData.frontRight >36){
            alertObj.vin = data.vin;
            alertObj.tires = {frontRight:tireData.frontRight};
            alertObj.priority = 'LOW';
        }
        if(tireData.rearLeft < 32 || tireData.rearLeft >36){
            alertObj.vin = data.vin;
            alertObj.tires = {rearLeft:tireData.rearLeft};
            alertObj.priority = 'LOW';
        }
        if(tireData.rearRight < 32 ||tireData.rearRight >36){
            alertObj.vin = data.vin;
            alertObj.tires = {rearRight:tireData.rearRight};
            alertObj.priority = 'LOW';
        }
        return alertObj;
    }).then((obj)=>{
       addAlert(obj);
    }).catch((e)=>{
        console.log(e);
    });
};

const checkEngineAlert = (currentData)=>{
    const alertObj = {};
    const vehicleData = getVehicleInfo(currentData);
    vehicleData.then((data)=>{
        if(currentData.engineCoolantLow === true){
            alertObj.vin = data.vin;
            alertObj.engineCoolantLow = true;
            alertObj.priority = 'LOW';
        }
        if(currentData.checkEngineLightOn === true){
            alertObj.vin = data.vin;
            alertObj.checkEngineLightOn = true;
            alertObj.priority = 'LOW';
        }
        return alertObj;
    }).then((obj)=>{
        addAlert(obj);
    }).catch((e)=>{
       console.log(e);
    });
};

const addAlert = (data)=>{
  AlertNotification.insertMany(data).then((docs)=>{
    return docs;
  }).catch((e)=>{
     console.log(e);
  });
};


module.exports.alertNotification = {
    engineRpmAlert,
    fuelVolumeAlert,
    tireAlert,
    checkEngineAlert,
    addAlert
}
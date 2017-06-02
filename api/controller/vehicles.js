const {Vehicles} = require('../models/vehicles');

const insertDocument = (docs,collection)=>{
    collection.insertMany(docs).then((data)=>{
        // console.log('Added');
    },(e)=>{
        console.log(e);
    });
};

const vehicleController = (vehicle)=>{
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
    });
};

module.exports = {
    vehicleController
}
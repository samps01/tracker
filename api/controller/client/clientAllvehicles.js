const {Vehicles} = require('../../models/vehicles');


const getAllVehicles = ()=>{
        return Vehicles.find({});
}

module.exports = {getAllVehicles};
const {Readings} = require('../../models/readings');

const getFullVehicleDetail = (vin)=>{
    return Readings.findOne({vin})
}

module.exports = {getFullVehicleDetail};

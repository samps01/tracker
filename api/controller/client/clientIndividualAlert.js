const {AlertNotification} = require('../../models/alert');

const getIndividualAlert = (vin)=>{
    return AlertNotification.findOne({vin});
};

module.exports = {getIndividualAlert};
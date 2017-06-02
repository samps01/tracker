const {mongoose} = require('../db/mongoose');

const AlertNotification =  mongoose.model('alert',{
    vin:{
        type:String,
        required:false
    },
    engineRpm:{
      type:Number
    },
    fuelVolume:{
      type:Number
    },
    tires:{

    },
    engineCoolantLow:{
        type:Boolean
    },
    checkEngineLightOn:{
        type:Boolean
    },
    priority:{
        type:String,
        default: 'Low'
    },
    timeStamp:{
        type:String
    }
});

module.exports = {AlertNotification};
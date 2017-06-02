const {mongoose} = require('../db/mongoose');

const Readings = mongoose.model('readings',{
    vin:{
        type:String,
        required:true
    },
    location: {
        type: Array
    },
    timestamp:[
        {
            type:String
        }
    ],
    fuelVolume:[
        {
            type:Number
        }
    ],
    speed:[
        {
            type:Number
        }
    ],
    engineHp:[
        {
            type:Number,
            default:0
        }
    ],
    checkEngineLightOn:[
        {
            type:Boolean
        }
    ],
    engineCoolantLow:[
        {
            type:Boolean
        }
    ],
    cruiseControlOn:[
        {
            type:Boolean
        }
    ],
    engineRpm:[
        {
            type:Number
        }
    ],
    tires:{
        type:Array
    }
});

module.exports={Readings};
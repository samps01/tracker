const {mongoose} = require('../db/mongoose');

const Vehicles = mongoose.model('vehicles',{
    vin:{
        type: String,
        required:true,
        trim: true
    },
    make:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    year:{
        type: Number,
        default:null
    },
    redlineRpm:{
        type: Number,
        default:null
    },
    maxFuelVolume:{
        type:Number,
        default:null
    },
    lastServiceDate:{
        type:String,
        default:null
    }
});

module.exports = {Vehicles};
const {mongoose} = require('../db/mongoose');

const AlertNotification = mongoose.model('alertNotification',{
    vin:{
        type:String,
        required:true
    },
    priority:{
        type:Array
    }
});

module.exports = {AlertNotification};
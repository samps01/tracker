const {AlertNotification} = require('../../models/alert');

const getHighAlerts = ()=>{
   return AlertNotification.find({}).then((alerts)=>{
       const highalert = {};
       let highPriority;
       alerts.forEach((alert)=>{
           highPriority = alert.priority.filter((data)=>{
               if(data['flag']==='HIGH'){
                   return true
               }
               return false
           });
           highalert[alert['vin']] = highPriority;
       });
       return highalert;
  }).catch((e)=>{
      console.log(e);
  })
};

module.exports = {getHighAlerts}
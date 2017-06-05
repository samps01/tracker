const nodemailer = require('nodemailer');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync("./config/config.json"));

//create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure:false,
    port:25,
    auth: {
        user: 'samps01@gmail.com',
        pass: config.password
    },
    tls:{
        rejectUnauthorized: false
    }
});


//alert function accepts target-mail-id, subject for the mail and the body
const alertMail = (to,subject,text)=>{

    const HelperOptions = helper(to,subject,text);
    transporter.sendMail(HelperOptions,(err,info)=>{
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });
};

const helper = (to,subject,text)=>{
    return {
        to,
        subject,
        text,
        from: 'Samson Sabu <samps01@gmail.com>'
    };
};

module.exports = {alertMail};

const transporter = require('../config/mailingConfig');
async function sendEMail(messageOptions){
    transporter.sendMail(messageOptions, (error, info) => {
        if (error) {
          console.log(error); 
        } 
      });
}

module.exports = {sendEMail};

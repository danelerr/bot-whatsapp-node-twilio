const TWILIO_ID = 'ACc3fdc16aeadfaa497ed95075d1e713c3';
const TWILIO_KEY = 'f22c9a71d373ea6cbf3c19b7f2fa6a7e';

const client = require('twilio')(TWILIO_ID, TWILIO_KEY);


client.messages  
      .create({  
         from: 'whatsapp:+14155238886', 
         body: 'Hol ',
         to: 'whatsapp:+59177667376'
       })
      .then(message => console.log(message.sid));
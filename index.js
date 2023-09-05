const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post('/sms', (req, res) => {
    console.log(req.body);
    const twiml = new MessagingResponse();

    const mensaje = req.body.Body;

    //consumir la api de chatGPT
    let chatGPT;
    if (mensaje.charAt(mensaje.length-1) === '?') {
      const num = Math.random();
      if (num >= 0.5) {
        chatGPT = 'Si';
      } else {
        chatGPT = 'No';
      }
    } else {
      chatGPT = 'Soy la respuesta de Node.js';
    }
    console.log(chatGPT);
    twiml.message(chatGPT);
    res.type('text/xml').send(twiml.toString());
});

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});

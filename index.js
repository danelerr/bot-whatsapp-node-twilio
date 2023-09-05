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
    twiml.message('The Robots are coming! Head for the hills!');
    res.type('text/xml').send(twiml.toString());
});

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});

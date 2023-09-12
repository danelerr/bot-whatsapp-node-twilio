const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const bodyParser = require('body-parser');
const OpenAI = require("openai");
const {config} = require('dotenv');
const path = require('path');


config();

const app = express();

const openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY});

//configuracion de la app
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//obtiene una respuesta de ChatGPT teniendo como prompt: @text
async function getRespuesta(text) {
  const completion = await openai.completions.create({
    model: "text-davinci-003",
    prompt: text,
    max_tokens: 40,
    temperature: 0,
  });

  return completion;
}

app.get('/', (req, res) => {
  res.send('api para topicos <strong>avanzados de progración</strong>');
});

app.get('/dariana.jpeg', (req, res) => {
  const imagePath = path.join(__dirname, 'images/dariana.jpeg');
  res.sendFile(imagePath);
});


app.post('/sms', async (req, res) => {

    const twiml = new MessagingResponse();

    const mensaje = req.body.Body;
  
    let respuesta = mensaje;
    // try {
    //   const chatGPT = await getRespuesta(mensaje);
    //   respuesta = chatGPT.choices[0].text;
    // } catch (err) {
    //   respuesta = 'Error en chatGPT: no me puedo comunicar';
    //   console.log(err);
    // }
    twiml.message("Eviar un simple mensaje");
    res.type('text/xml').send(twiml.toString());
});


app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});

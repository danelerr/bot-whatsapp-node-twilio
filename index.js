const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const bodyParser = require('body-parser');
const OpenAI = require("openai");

const app = express();

const openai = new OpenAI({ apiKey: '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'});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

async function getRespuesta(text) {
  const completion = await openai.completions.create({
    model: "text-davinci-003",
    prompt: text,
    max_tokens: 40,
    temperature: 0,
  });

  return completion;
}

app.post('/sms', async (req, res) => {

    const twiml = new MessagingResponse();

    const mensaje = req.body.Body;

    const chatGPT = await getRespuesta(mensaje);
    let respuesta;
    try {
      respuesta = chatGPT.cgithoices[0].text;
    } catch {
      respuesta = 'Error en chatGPT: no me puedo comunicar';
    }
    twiml.message(respuesta);
    res.type('text/xml').send(twiml.toString());
});

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});

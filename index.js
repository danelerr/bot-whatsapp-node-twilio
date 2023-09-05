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
  
    let respuesta;
    try {
      const chatGPT = await getRespuesta(mensaje);
      respuesta = chatGPT.choices[0].text;
    } catch (err) {
      respuesta = 'Error en chatGPT: no me puedo comunicar';
      console.log(err);
    }
    twiml.message(respuesta);
    res.type('text/xml').send(twiml.toString());
});

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});

const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const bodyParser = require('body-parser');
const OpenAI = require("openai");
const {config} = require('dotenv');
const path = require('path');
const http = require('http');
const { Server: SocketServer } = require('socket.io');
const cors = require("cors");

config();

const app = express();
const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173/guion/:id"
  }
});

app.use(cors());

io.on('connection', socket => {
  console.log('alguien se conecto a mi');
});

const openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY});

//configuracion de la app
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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

    // const searchText = encodeURI(mensaje);

    // const musicSearhQuery = await fetch(`https://audius-discovery-2.theblueprint.xyz/v1/tracks/search?query=${searchText} b2b&app_name=EXAMPLEAPP`)
    //   .then((res) => res.json());

    // const id = musicSearhQuery.data[0].id;

    // const audioUrl = `https://audius-discovery-2.theblueprint.xyz/v1/tracks/${id}/stream?app_name=EXAMPLEAPP`;
    
    // const msg = twiml.message("Tu el audio solicitado: ");
    // msg.media(audioUrl);
    twiml.message("Tu el video solicitado: ")

    io.emit('pruebita', mensaje);

    console.log(audioUrl);
    res.type('text/xml').send(twiml.toString());
});



//obtiene una respuesta de ChatGPT teniendo como prompt: @text

    /* CODIGO PARA COMUNICARSE CON CHATGPT */
    //let respuesta = mensaje;
    // try {
    //   const chatGPT = await getRespuesta(mensaje);
    //   respuesta = chatGPT.choices[0].text;
    // } catch (err) {
    //   respuesta = 'Error en chatGPT: no me puedo comunicar';
    //   console.log(err);
    // }

    /* CODIGO PARA COMUNICARASE CON D-ID, NO TERMINADO AL 100% */
    //const url = await getVideoUrl(mensaje);


// async function getRespuesta(text) {
//   const completion = await openai.completions.create({
//     model: "text-davinci-003",
//     prompt: text,
//     max_tokens: 40,
//     temperature: 0,
//   });

//   return completion;
// }



//PARA EL D-ID

// async function getVideoUrl(text) {
//   const url = "https://api.d-id.com/talks";
//   const requestData = {
//     "script": {
//       "type": "text",
//       "input": text,
//       "provider": {
//         "type": "microsoft",
//         "voice_id": "es-BO-SofiaNeural",
//         "voice_config": {
//           "style": "Cheerful"
//         }
//       }
//     },
//     "source_url": "https://twilio-nodejs-bot-whatsapp-chatgpt.onrender.com/dariana.jpeg"
//   }
//   const answer = await fetch(url, {
//     method: 'POST',
//     headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json",
//       "Authorization": "Basic " + process.env.D_ID_API_KEY
//     },
//     body: JSON.stringify(requestData)
//   });
//   const data = await answer.json();
//   console.log(data);
//   const {id} = data;
//   console.log(id);
//   const videoRequest = await fetch(url + "/" + id, {
//     method: 'GET',
//     headers: {
//       "Accept": "*/*",
//       "User-Agent": "Thunder Client (https://www.thunderclient.com)",
//       "Accept": "application/json",
//       "Content-Type": "application/json",
//       "Authorization": "Basic " + process.env.D_ID_API_KEY
//     }
//   });
//   const videoData = await videoRequest.json();
//   console.log(videoData);
//   const {audio_url} = videoData;
//   console.log(audio_url);
//   return audio_url;
// }




server.listen(3000, () => {
    console.log('Express server listening on port 3000');
});

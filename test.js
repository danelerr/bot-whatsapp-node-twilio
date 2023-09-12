const fetch = require('node-fetch');

// URL de la API
const apiUrl = 'https://api.d-id.com/animations';

// Credenciales de autorización (USERNAME y PASSWORD)


// Datos de la solicitud en formato JSON
const requestData = {
  source_url: 'https://twilio-nodejs-bot-whatsapp-chatgpt.onrender.com/dariana'
};

// Configura los encabezados de la solicitud
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// Concatena las credenciales de autorización
const auth = 'Basic ' + `${username}:${password}`;


// Agrega el encabezado de autorización
headers['Authorization'] = auth;

// Realiza la solicitud HTTP POST utilizando fetch

const req = fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestData)
    })
      .then(response => {
        // Verifica si la respuesta tiene un estado de éxito (por ejemplo, código 200)
        if (response.ok) {
          return response.json(); // Convierte la respuesta a JSON si es exitosa
        } else {
          throw new Error('Error en la solicitud HTTP');
        }
      })
      .then(data => {
        // Maneja los datos de la respuesta aquí
        console.log('Respuesta de la API:', data);
      })
      .catch(error => {
        // Maneja los errores aquí
        console.error('Error en la solicitud a la API:', error);
      });


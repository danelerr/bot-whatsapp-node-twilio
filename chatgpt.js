const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: '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'});

async function getRespuesta() {
  const completion = await openai.completions.create({
    model: "text-davinci-003",
    prompt: "Que es c++",
    max_tokens: 40,
    temperature: 0,
  });

  console.log(completion);
}

getRespuesta();

// const API_KEY = "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";

// async function getCompletion(prompt) {

//   const response = await fetch(`https://api.openai.com/v1/completions`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "text-davinci-003",
//        prompt: "dame un saludo",
//       prompt: prompt,
//       max_tokens: 20,
//     }),
//   });
//   const data = await response.json();
//   console.log(data)
//   return data;
// }

// getCompletion()

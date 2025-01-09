import express, { json } from 'express';
import cors from "cors";
import fetch from 'node-fetch';  // Para realizar solicitudes HTTP
import dotenv from 'dotenv'; // Para manejar variables de entorno

dotenv.config(); // Cargar las variables de entorno

const port = 4000;
const app = express();
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(json());

const apiKey = process.env.API_DEEPL_TOKEN

app.post('/translate', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send('No se proporcionó texto para traducir.');
  }

  try {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Authorization": `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: [text],
        target_lang: "ES"
      })
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    // Enviar la respuesta al cliente
    return res.status(200).json(json);
  } catch (error) {
    console.error(error.message);
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

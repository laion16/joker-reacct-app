const synth = window.speechSynthesis;

export async function speak(inputTxt, pitch, rate) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  if (inputTxt !== "") {
    // Llamar a la función de traducción y manejar la promesa
    translateTextToSpanish(inputTxt)
      .then((translatedText) => { //console.log("Texto traducido:", translatedText);
        // Crear y configurar el utterance
        const utterThis = new SpeechSynthesisUtterance(inputTxt);
        utterThis.onend = function () {
          console.log("SpeechSynthesisUtterance.onend");
        };
        utterThis.onerror = function () {
          console.error("SpeechSynthesisUtterance.onerror");
        };

        utterThis.pitch = pitch;
        utterThis.rate = rate;
        utterThis.text = translatedText
        
        // Hablar el texto traducido
        synth.speak(utterThis);
      })
      .catch((error) => {
        console.error("Error al traducir o hablar:", error);
      });
  }
}

const translateTextToSpanish = async (text) => {
  return fetch('http://localhost:4000/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la API:', errorData);
        throw new Error(errorData.error || 'Error al traducir el texto');
      }
      return response.json();
    })
    .then((data) => data.translations[0].text) // Retornar el texto traducido
    .catch((error) => {
      console.error('Hubo un error en la consulta a la API de DeepL:', error);
      throw error;
    });
};
import { useState, useEffect, useRef } from 'react'
import imageJoker from './assets/joker-image.png'
import './App.css'
import ListVoices from './components/listVoices'
import { speak } from './utils/voiceReader'

function App() {
  const [punchline, setPunchLine] = useState("")
  const [setup, setSetup] = useState("")
  const [pitch, setPitch] = useState(1)
  const [rate, setRate] = useState(1)
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");

  const url = "https://official-joke-api.appspot.com/jokes/programming/random"

  // Carga inicial de voces
  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name); // Selecciona la primera voz por defecto
      }
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleJoke = (event) => {
    event.preventDefault();

    fetch(url)
    .then(response => response.json())
    .then(result => {
      setPunchLine(result[0].punchline);
      setSetup(result[0].setup);

      // Espera un pequeño intervalo para asegurar la actualización del estado
      setTimeout(() => {
        handlePlay();
      }, 100); // Ajusta el tiempo si es necesario
    })
    .catch(error => console.log('error', error));
  }

  const handlePlay = () => {
    const textToSpeak = `${setup} ... ${punchline}`;
    speak(textToSpeak, pitch, rate);

    if (!setup && !punchline) {
      console.error("No hay texto para reproducir.");
      return;
    }
  };

  return (
    <>
      <section className="container section-joker">
        <div className="card card-joker">
          <h1>Joker Bot</h1>
          <img src={imageJoker} className="img-joker" alt="Joker" />
        </div>
        <form>
          <div>
            <label htmlFor="rate">Rate</label
            ><input type="range" min="0.5" max="2" value={rate} step="0.1" id="rate"
              onChange={(eve) => { setRate(eve.target.value) }} />
            <div className="rate-value">{rate}</div>
          </div>
          <div>
            <label htmlFor="pitch">Pitch</label
            ><input type="range" min="0" max="2" value={pitch} step="0.1" id="pitch"
              onChange={(eve) => { setPitch(eve.target.value) }} />
            <div className="pitch-value">{pitch}</div>
          </div>
          <label htmlFor="voices"></label>

          <ListVoices
            voices={voices}
            selectedVoice={selectedVoice}
            setSelectedVoice={setSelectedVoice}
          />

          <div className="card card-joker">
            <button type="button" className="btn btn-primary"
              onClick={(event) => {
                handleJoke(event)
              }}>
              Tell yourself a joke
            </button>
          </div>

        </form>
      </section>
    </>
  )
}

export default App

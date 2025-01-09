const ListVoices = ({voices, selectedVoice, setSelectedVoice}) => {

    const handleVoiceChange = (event) => {
        setSelectedVoice(event.target.value); // Actualiza la voz seleccionada
      };

    return (
        <div>
            <h1>Selecciona una Voz</h1>
            <select id="voice" value={selectedVoice} onChange={handleVoiceChange} disabled>
                <option value="" disabled>
                    Elige una voz
                </option>
                {voices.map((voice, index) => (
                    <option key={index} value={voice.name}>
                        {voice.name} ({voice.lang})
                    </option>
                ))}
            </select>
        </div>
    )
}

export default ListVoices
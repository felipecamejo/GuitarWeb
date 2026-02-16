import { useState, useEffect, useRef } from 'react'
import { HiVolumeUp } from 'react-icons/hi'

function Metronome() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState(120)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [volume, setVolume] = useState(0.85)
  
  const audioContextRef = useRef(null)
  const nextNoteTimeRef = useRef(0)
  const timerIdRef = useRef(null)
  const currentBeatRef = useRef(0)
  const gainNodeRef = useRef(null)

  // Función para convertir valor lineal a logarítmico
  const getLogVolume = (linearValue) => {
    if (linearValue === 0) return 0
    return Math.pow(linearValue, 1.5) * 5
  }

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    audioContextRef.current = audioContext
    
    const gainNode = audioContext.createGain()
    gainNode.gain.value = getLogVolume(volume)
    gainNode.connect(audioContext.destination)
    gainNodeRef.current = gainNode
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  useEffect(() => {
    if (gainNodeRef.current) {
      const logVolume = getLogVolume(volume)
      gainNodeRef.current.gain.setValueAtTime(logVolume, audioContextRef.current.currentTime)
    }
  }, [volume])

  // Escuchar tecla space para play/pause
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space' && !event.repeat) {
        event.preventDefault()
        handleToggle()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isPlaying])

  // Reiniciar el patrón cuando cambie el BPM mientras está reproduciéndose
  useEffect(() => {
    if (isPlaying) {
      // Detener el scheduler actual
      clearTimeout(timerIdRef.current)
      timerIdRef.current = null
      
      // Reiniciar inmediatamente con el nuevo tempo
      setCurrentBeat(0)
      currentBeatRef.current = 0
      nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.1
      scheduler()
    }
  }, [bpm])

  useEffect(() => {
    if (isPlaying && !timerIdRef.current) {
      nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.1
      scheduler()
    }
  }, [isPlaying])

  const scheduleNote = (time, beatNumber) => {
    if (time < audioContextRef.current.currentTime - 0.1) return
    
    const osc = audioContextRef.current.createOscillator()
    const envelope = audioContextRef.current.createGain()
    
    osc.frequency.value = beatNumber % 4 === 0 ? 1000 : 800
    envelope.gain.value = 1.5
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.05)
    
    osc.connect(envelope)
    envelope.connect(gainNodeRef.current)
    
    osc.start(time)
    osc.stop(time + 0.05)
    
    const currentBeatValue = beatNumber % 4
    currentBeatRef.current = currentBeatValue
    setCurrentBeat(currentBeatValue)
  }

  const scheduler = () => {
    if (!isPlaying) return
    
    const secondsPerBeat = 60.0 / bpm
    const currentTime = audioContextRef.current.currentTime
    
    // Programar notas dentro de la ventana de lookahead
    while (nextNoteTimeRef.current < currentTime + 0.1) {
      scheduleNote(nextNoteTimeRef.current, currentBeatRef.current)
      nextNoteTimeRef.current += secondsPerBeat
      currentBeatRef.current = (currentBeatRef.current + 1) % 4
    }
    
    // Programar el próximo scheduler
    timerIdRef.current = setTimeout(scheduler, 25)
  }

  const startMetronome = () => {
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }
    
    // Limpiar cualquier timer existente
    clearTimeout(timerIdRef.current)
    timerIdRef.current = null
    
    // Resetear estado
    setCurrentBeat(0)
    currentBeatRef.current = 0
    nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.1
    setIsPlaying(true)
  }

  const stopMetronome = () => {
    clearTimeout(timerIdRef.current)
    timerIdRef.current = null
    setIsPlaying(false)
    setCurrentBeat(0)
    currentBeatRef.current = 0
  }

  const handleToggle = () => {
    if (isPlaying) {
      stopMetronome()
    } else {
      startMetronome()
    }
  }

  const handleBpmChange = (e) => {
    setBpm(parseInt(e.target.value))
  }

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value))
  }

  return (
    <div className="metronome-container">
      <div className="metronome-content">
        <div className="display">
          <span className="value">{bpm}</span>
          <span className="label">BPM</span>
        </div>

        <div className="slider-container">
          <span className="min">40</span>
          <input
            type="range"
            min="40"
            max="240"
            value={bpm}
            onChange={handleBpmChange}
            className="slider"
            style={{'--value': `${((bpm - 40) / (240 - 40)) * 100}%`}}
          />
          <span className="max">240</span>
        </div>

        <div className="slider-container">
          <span className="min"><HiVolumeUp /></span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="slider"
            style={{'--value': `${volume * 100}%`}}
          />
          <span className="volume-value">{volume === 0 ? '0%' : `${Math.round(volume * 100)}%`}</span>
        </div>

        <div className="beat-indicator">
          {[0, 1, 2, 3].map((beat) => (
            <div
              key={beat}
              className={`beat ${currentBeat === beat && isPlaying ? 'active' : ''} ${beat === 0 ? 'first-beat' : ''}`}
            />
          ))}
        </div>

        <button 
          className={`metronome-btn ${isPlaying ? 'playing' : ''}`}
          onClick={handleToggle}
        >
          {isPlaying ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  )
}

export default Metronome
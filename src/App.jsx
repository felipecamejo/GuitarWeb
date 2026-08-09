import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Diagram from './components/Diagram'
import Selector from './components/Selector'
import Metronome from './components/Metronome'
import { getScaleNotes, TUNING_PATTERNS } from './utils/ScaleUtils'

import Footer from './components/page/Footer/Footer'
import Nav from './components/page/Nav/Nav'


function ScaleGenerator() {
  const [selectedNote, setSelectedNote] = useState('C')
  const [selectedScaleType, setSelectedScaleType] = useState('major')
  const [selectedTuningNote, setselectedTuningNote] = useState('E')
  const [selectedTuning, setSelectedTuning] = useState({
    value: 'guitar-standard',
    pattern: TUNING_PATTERNS.guitar.standard
  })


  function handleNoteChange(note) {
    setSelectedNote(note)
  }

  function handleScaleTypeChange(scaleType) {
    setSelectedScaleType(scaleType)
  }

  function handleTuningNoteChange(tuningNote) {
    setselectedTuningNote(tuningNote)
  }

  function handleTuningChange(tuning) {
    setSelectedTuning(tuning)
  }


  function nameScaleType(type) {
    switch(type) {
      case 'major': return 'Major'
      case 'minor': return 'Minor'
      case 'pentatonic_major': return 'Pentatonic Major'
      case 'pentatonic_minor': return 'Pentatonic Minor'
      case 'dorian': return 'Dorian'
      case 'phrygian': return 'Phrygian'
      case 'lydian': return 'Lydian'
      case 'mixolydian': return 'Mixolydian'
      case 'harmonic_minor': return 'Harmonic Minor'
      case 'blues': return 'Blues'
      case 'natural_minor': return 'Natural Minor'
      default: return type
    }
  }

  // Obtener las notas de la escala actual
  const scaleNotes = getScaleNotes(selectedNote, selectedScaleType)

  return (
    <div style={{ width: '100%', maxWidth: '1200px' }}>
      <h1>Scale Explorer</h1>
      
      <Selector 
        selectedNote={selectedNote}
        selectedScaleType={selectedScaleType}
        onNoteChange={handleNoteChange}
        onScaleTypeChange={handleScaleTypeChange}
        selectedTuning={selectedTuning.value}
        onTuningChange={handleTuningChange}
        selectedTuningNote={selectedTuningNote}
        onTuningNoteChange={handleTuningNoteChange}
      />

      <h3 style={{ textAlign: 'center', margin: '2rem 0 1rem 0' }}>
        {selectedNote} {nameScaleType(selectedScaleType)}
      </h3>
      
      <p style={{ textAlign: 'center', margin: '0.5rem 0 1.5rem 0', color: '#999', fontSize: '1.1rem' }}>
        ( {scaleNotes.join(' - ')} )
      </p>

      <div style={{ width: '80vw', marginLeft: 'calc(50% - 40vw)', overflowX: 'auto' }}>
        <Diagram 
          rootNote={selectedNote}
          scaleType={selectedScaleType}
          tuning={selectedTuning.pattern}
          tuningNote={selectedTuningNote}
        />
      </div>
    </div>
  )
}

function MetronomePage() {
  return (
    <div style={{ width: '100%', maxWidth: '1200px' }}>
      <h1>Metronome</h1>
      <Metronome />
    </div>
  )
}

function App() {

  const ficons = [
    { link: 'https://github.com/felipecamejo', fa: 'Github' },
    { link: 'https://linkedin.com/in/felipe-camejo', fa: 'Linkedin' }
  ]

  const buttons = [
    {to: '/scale', label: "Scale Explorer"},
    {to: '/metronome', label: "Metronome"}
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

    <Nav buttons={buttons}/>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/scale" replace />} />
          <Route path="/scale" element={<ScaleGenerator />} />
          <Route path="/metronome" element={<MetronomePage />} />
          <Route path="*" element={<Navigate to="/scale" replace />} />
        </Routes>
      </div>

      <Footer ficons={ficons}/>
    </div>
  )
}

export default App
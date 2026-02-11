import { useState } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import './App.css'
import Diagram from './components/Diagram'
import Selector from './components/Selector'
import Metronome from './components/Metronome'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

function ScaleGenerator() {
  const [selectedNote, setSelectedNote] = useState('C')
  const [selectedScaleType, setSelectedScaleType] = useState('major')
  const [easyRemember, setEasyRemember] = useState(false)
  const [selectedTuning, setSelectedTuning] = useState('standard_e')

  function handleNoteChange(note) {
    setSelectedNote(note)
  }

  function handleScaleTypeChange(scaleType) {
    setSelectedScaleType(scaleType)
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

  return (
    <div style={{ width: '100%', maxWidth: '1200px' }}>
      <h1>Scale Explorer</h1>
      
      <Selector 
        selectedNote={selectedNote}
        selectedScaleType={selectedScaleType}
        onNoteChange={handleNoteChange}
        onScaleTypeChange={handleScaleTypeChange}
        easyRemember={easyRemember}
        onEasyRememberChange={setEasyRemember}
        selectedTuning={selectedTuning}
        onTuningChange={handleTuningChange}
      />

      <h3 style={{ textAlign: 'center', margin: '2rem 0 1rem 0' }}>
        {selectedNote} {nameScaleType(selectedScaleType)}
      </h3>

      <div style={{ width: '80vw', marginLeft: 'calc(50% - 40vw)', overflowX: 'auto' }}>
        <Diagram 
          rootNote={selectedNote}
          scaleType={selectedScaleType}
          easyRemember={easyRemember}
          tuning={selectedTuning}
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
  const location = useLocation()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav className="main-nav">
        <Link 
          to="scale" 
          className={`nav-link ${(location.pathname === '/GuitarWeb/scale' || location.pathname === '/GuitarWeb/' || location.pathname === '/GuitarWeb') ? 'active' : ''}`}
        >
          Scale Explorer
        </Link>
        <Link 
          to="metronome" 
          className={`nav-link ${location.pathname === '/GuitarWeb/metronome' ? 'active' : ''}`}
        >
          Metronome
        </Link>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="scale" replace />} />
          <Route path="scale" element={<ScaleGenerator />} />
          <Route path="metronome" element={<MetronomePage />} />
          <Route path="*" element={<Navigate to="scale" replace />} />
        </Routes>
      </div>
      
      <footer className="github-footer">
        <a className="nav-link github-btn" href="https://github.com/felipecamejo" target="_blank" rel="noopener noreferrer">
          <FaGithub style={{color: 'white', fontSize: '24px'}} />
        </a>
        <a className="nav-link github-btn" href="https://linkedin.com/in/felipe-camejo" target="_blank" rel="noopener noreferrer">
          <FaLinkedin style={{color: 'white', fontSize: '24px'}} />
        </a>
      </footer>
    </div>
  )
}

export default App
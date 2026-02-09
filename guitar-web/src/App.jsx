import { useState } from 'react'
import './App.css'
import Diagram from './components/Diagram'
import Selector from './components/Selector'

function App() {
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

   return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', padding: '1rem', width: '100%' }}>
        <h1>Guitar Scale Generator</h1>
        
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
        

        <div style={{ width: '80vw', marginLeft: 'calc(50% - 40vw)', overflowX: 'auto' }}>
          <Diagram 
            rootNote={selectedNote}
            scaleType={selectedScaleType}
            easyRemember={easyRemember}
            tuning={selectedTuning}
          />
        </div>
      </div>
      
      <footer className="github-footer">
        <a href="https://github.com/felipecamejo" target="_blank" rel="noopener noreferrer" className="github-btn">
          Visit the Creator Github
        </a>
      </footer>
    </div>
  )
}

export default App

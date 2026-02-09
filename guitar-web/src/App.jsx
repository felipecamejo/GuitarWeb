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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
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
  )
}

export default App

import { NOTES, TUNING_PATTERNS } from '../utils/ScaleUtils'

function Selector({
  selectedNote,
  selectedScaleType,
  onNoteChange,
  onScaleTypeChange,
  easyRemember,
  onEasyRememberChange,
  selectedTuning,
  onTuningChange,
  selectedTuningNote,
  onTuningNoteChange

}) {
  
  const scaleTypes = [
    { value: 'major', label: 'Major' },
    { value: 'natural_minor', label: 'Natural Minor' },
    { value: 'pentatonic_major', label: 'Pentatonic Major' },
    { value: 'pentatonic_minor', label: 'Pentatonic Minor' },
    { value: 'dorian', label: 'Dorian' },
    { value: 'phrygian', label: 'Phrygian' },
    { value: 'lydian', label: 'Lydian' },
    { value: 'mixolydian', label: 'Mixolydian' },
    { value: 'harmonic_minor', label: 'Harmonic Minor' },
    { value: 'blues', label: 'Blues' },
  ]

  const tuneTypes = [
    { value: 'guitar-standard', label: 'Guitar Standard', pattern: TUNING_PATTERNS.guitar.standard },
    { value: 'guitar-drop', label: 'Guitar Drop', pattern: TUNING_PATTERNS.guitar.drop },
    { value: 'seven-guitar-standard', label: '7th Guitar Standard', pattern: TUNING_PATTERNS.sevenGuitar.standard},
    { value: 'seven-guitar-drop', label: '7th Guitar Drop', pattern: TUNING_PATTERNS.sevenGuitar.drop },
    { value: 'bass-standard', label: 'Bass Standard', pattern: TUNING_PATTERNS.bass.standard },
    { value: 'bass-drop', label: 'Bass Drop', pattern: TUNING_PATTERNS.bass.drop },
    { value: 'five-bass-standard', label: '5th Bass Standard', pattern: TUNING_PATTERNS.fiveBass.standard },
    { value: 'five-bass-drop', label: '5th Bass Drop', pattern: TUNING_PATTERNS.fiveBass.drop },
  ]

  return (
    <div className="card">
      Scale
      <select 
        value={selectedNote} 
        onChange={(e) => onNoteChange(e.target.value)}
      >
        {NOTES.map(note => (
          <option key={note} value={note}>{note}</option>
        ))}
      </select>

      <select 
        value={selectedScaleType} 
        onChange={(e) => onScaleTypeChange(e.target.value)}
      >
        {scaleTypes.map(scale => (
          <option key={scale.value} value={scale.value}>{scale.label}</option>
        ))}
      </select>
      Tuning
      <select
        value={selectedTuning}
        onChange={(e) => {
          const selectedOption = tuneTypes.find(t => t.value === e.target.value)
          onTuningChange(selectedOption || tuneTypes[0])
        }}
      >
        {tuneTypes.map(t => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>
      <select
        value={selectedTuningNote}
        onChange={(e) => onTuningNoteChange(e.target.value)}
      >
        {NOTES.map(tn => (
          <option key={tn} value={tn}>{tn}</option>
        ))}
      </select>
    </div>
  )
}

export default Selector
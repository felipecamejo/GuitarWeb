import { NOTES } from '../utils/ScaleUtils'

function Selector({
  selectedNote,
  selectedScaleType,
  onNoteChange,
  onScaleTypeChange,
  easyRemember,
  onEasyRememberChange,
  selectedTuning,
  onTuningChange
}) {
  
  const scaleTypes = [
    { value: 'major', label: 'Major' },
    { value: 'minor', label: 'Minor' },
    { value: 'pentatonic_major', label: 'Pentatonic Major' },
    { value: 'pentatonic_minor', label: 'Pentatonic Minor' },
    { value: 'dorian', label: 'Dorian' },
    { value: 'phrygian', label: 'Phrygian' },
    { value: 'lydian', label: 'Lydian' },
    { value: 'mixolydian', label: 'Mixolydian' },
    { value: 'harmonic_minor', label: 'Harmonic Minor' },
    { value: 'blues', label: 'Blues' },
    { value: 'natural_minor', label: 'Natural Minor' }
  ]

  const tuneTypes = [
    { value: 'standard E', label: 'Standard E' },
    { value: 'standard D#', label: 'Standard D#' },
    { value: 'standard D', label: 'Standard D' },
    { value: 'standard C#', label: 'Standard C#' },
    { value: 'standard C', label: 'Standard C' },

    { value: 'drop_d', label: 'Drop D' },
    { value: 'drop_d#', label: 'Drop D#' },
    { value: 'drop_c#', label: 'Drop C#' },
    { value: 'drop_c', label: 'Drop C' }
  ]

  return (
    <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
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

      <select
        value={selectedTuning}
        onChange={(e) => onTuningChange(e.target.value)}
      >
        {tuneTypes.map(t => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        <input 
          type="checkbox"
          checked={easyRemember}
          onChange={(e) => onEasyRememberChange(e.target.checked)}
        />
        Easy Remember
      </label>
    </div>
  )
}

export default Selector
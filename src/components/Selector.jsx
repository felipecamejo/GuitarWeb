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
    { value: 'standard_e', label: 'Standard E' },
    { value: 'bass_standard_e', label:'Bass Standard E'},
    { value: 's_standard_b', label:'Seven String Standard B'},
    { value: 'standard_ds', label: 'Standard D#' },
    { value: 'standard_d', label: 'Standard D' },
    { value: 'standard_cs', label: 'Standard C#' },
    { value: 'standard_c', label: 'Standard C' },

    { value: 'drop_d', label: 'Drop D' },
    { value: 'drop_ds', label: 'Drop D#' },
    { value: 'drop_cs', label: 'Drop C#' },
    { value: 'drop_c', label: 'Drop C' }
  ]

  return (
    <div className="card">
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
    </div>
  )
}

export default Selector
import { NOTES, PossibleNotes, Scale, SCALE_TYPES, SelectedTuning, TuningKey, TUNING_OPTIONS } from '../utils/ScaleUtils'
import Button from './FormInputs/Button/Button'


type SelectorProps = {
  selectedNote: PossibleNotes
  onNoteChange: (value: PossibleNotes) => void
  selectedScaleType: Scale
  onScaleTypeChange: (value: Scale) => void
  selectedTuning: TuningKey
  onTuningChange: (tuning: SelectedTuning) => void
  selectedTuningNote: PossibleNotes
  onTuningNoteChange: (value: PossibleNotes) => void
  onRefresh: () => void
  hasDiagramChanges: boolean
}

export default function Selector({
  selectedNote,
  onNoteChange,
  selectedScaleType,
  onScaleTypeChange,
  selectedTuning,
  onTuningChange,
  selectedTuningNote,
  onTuningNoteChange,
  onRefresh,
  hasDiagramChanges

}: SelectorProps) {

  return (
    <div className="card">
      <div className="selector-group selector-scale">
        <span>Scale</span>
        <select
          value={selectedNote}
          onChange={(e) => onNoteChange(e.target.value as PossibleNotes)}
        >
          {NOTES.map(note => (
            <option key={note} value={note}>{note}</option>
          ))}
        </select>

        <select
          value={selectedScaleType}
          onChange={(e) => onScaleTypeChange(e.target.value as Scale)}
        >
          {SCALE_TYPES.map(scale => (
            <option key={scale.value} value={scale.value}>{scale.label}</option>
          ))}
        </select>
      </div>

      <div className="selector-group selector-tuning">
        <span>Tuning</span>
        <select
          value={selectedTuning}
          onChange={(e) => {
            const selectedOption = TUNING_OPTIONS.find(t => t.value === e.target.value)
            onTuningChange(selectedOption || TUNING_OPTIONS[0])
          }}
        >
          {TUNING_OPTIONS.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <select
          value={selectedTuningNote}
          onChange={(e) => onTuningNoteChange(e.target.value as PossibleNotes)}
        >
          {NOTES.map(tn => (
            <option key={tn} value={tn}>{tn}</option>
          ))}
        </select>
      </div>

      {hasDiagramChanges && (
        <div className="selector-refresh">
          <Button
            fa="refresh"
            onClick={onRefresh}
          />
        </div>
      )}
    </div>
  )
}

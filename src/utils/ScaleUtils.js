// Notas cromáticas
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']


export const TUNINGS = {
  standard_e: ['E', 'A', 'D', 'G', 'B', 'E'],
  bass_standard_e: ['E', 'A', 'D', 'G'],
  s_standard_b : ['B', 'E', 'A', 'D', 'G', 'B', 'E'],
  standard_ds: ['D#', 'G#', 'C#', 'F#', 'A#', 'D#'],
  standard_d: ['D', 'G', 'C', 'F', 'A', 'D'],
  standard_cs: ['C#', 'F#', 'B', 'E', 'G#', 'C#'],
  standard_c: ['C', 'F', 'A#', 'D#', 'G', 'C'],
  drop_d: ['D', 'A', 'D', 'G', 'B', 'E'],
  drop_ds: ['D#', 'A#', 'D#', 'G#', 'B', 'E'],
  drop_cs: ['C#', 'G#', 'C#', 'F#', 'A#', 'D#'],
  drop_c: ['C', 'G', 'C', 'F', 'A', 'D']
}


// Intervalos para diferentes escalas (en semitonos)
export const SCALE_INTERVALS = {
  'major': [0, 2, 4, 5, 7, 9, 11], 
  'natural_minor': [0, 2, 3, 5, 7, 8, 10],            // Eólica
  'pentatonic_major': [0, 2, 4, 7, 9],
  'pentatonic_minor': [0, 3, 5, 7, 10],
  'dorian': [0, 2, 3, 5, 7, 9, 10],
  'phrygian': [0, 1, 3, 5, 7, 8, 10],
  'lydian': [0, 2, 4, 6, 7, 9, 11],
  'mixolydian': [0, 2, 4, 5, 7, 9, 10],
  'harmonic_minor': [0, 2, 3, 5, 7, 8, 11],
  'blues': [0, 3, 5, 6, 7, 10],

}

export const MAX_FRETS = 22

// Calcular las notas de una escala
export function getScaleNotes(rootNote, scaleType) {
  const rootIndex = NOTES.indexOf(rootNote)
  const intervals = SCALE_INTERVALS[scaleType] || SCALE_INTERVALS.major
  
  return intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % 12
    return NOTES[noteIndex]
  })
}

export function findNotePositions(note, tuning) {
  const positions = []
  const strings = TUNINGS[tuning] || TUNINGS.standard_e

  strings.forEach((openString, stringIndex) => {
    const openStringIndex = NOTES.indexOf(openString)
    for (let fret = 0; fret <= MAX_FRETS; fret++) {
      const fretNoteIndex = (openStringIndex + fret) % 12
      const fretNote = NOTES[fretNoteIndex]
      if (fretNote === note) {
        positions.push({ string: stringIndex, fret, note })
      }
    }
  })

  return positions
}

// Obtener todas las posiciones para una escala
export function getScalePositions(rootNote, scaleType, tuning) {
  const scaleNotes = getScaleNotes(rootNote, scaleType)
  const allPositions = {}
  
  scaleNotes.forEach(note => {
    allPositions[note] = findNotePositions(note, tuning)
  })
  
  return allPositions
}
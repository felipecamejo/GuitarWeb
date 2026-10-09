// Notas cromáticas
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
export const indexedFrets: number[] = [1, 3, 5, 7, 9, 15, 17, 19, 21];

export type ArrayToPossibleType<T extends readonly unknown[]> = T[number]
export type PossibleNotes = ArrayToPossibleType<typeof NOTES>

export const TUNING_PATTERNS = {
  guitar: {
    standard: [5, 5, 5, 4, 5],
    drop: [7, 5, 5, 5, 5],
  },

  sevenGuitar: {
    standard: [5, 5, 5, 4, 5, 5],
    drop: [7, 5, 5, 5, 5, 5]
  },

  bass: {
    standard: [5, 5, 5],
    drop: [7, 5, 5],
  },

  fiveBass: {
    standard: [5, 5, 5, 5],
    drop: [7, 5, 5, 5]
  }
} as const

export type ObjectToPossibleType<T extends object> = T[keyof T]

type TuningGroup = ObjectToPossibleType<typeof TUNING_PATTERNS>
export type TuningFamily = keyof typeof TUNING_PATTERNS
export type TuningName = keyof TuningGroup
export type TuningKey = keyof typeof tuningPatterns
export type TuningPattern = readonly number[];

const tuningPatterns = {
    'guitar-standard': TUNING_PATTERNS.guitar.standard,
    'guitar-drop': TUNING_PATTERNS.guitar.drop,
    'seven-guitar-standard': TUNING_PATTERNS.sevenGuitar.standard,
    'seven-guitar-drop': TUNING_PATTERNS.sevenGuitar.drop,
    'bass-standard': TUNING_PATTERNS.bass.standard,
    'bass-drop': TUNING_PATTERNS.bass.drop,
    'five-bass-standard': TUNING_PATTERNS.fiveBass.standard,
    'five-bass-drop': TUNING_PATTERNS.fiveBass.drop,
} as const


export function getTuningPattern(tuningKey: TuningKey): TuningPattern {
  return tuningPatterns[tuningKey]
}

// Intervalos para diferentes escalas (en semitonos)
export const SCALE_INTERVALS = {
  'major': [0, 2, 4, 5, 7, 9, 11], 
  'natural_minor': [0, 2, 3, 5, 7, 8, 10],         
  'pentatonic_major': [0, 2, 4, 7, 9],
  'pentatonic_minor': [0, 3, 5, 7, 10],
  'dorian': [0, 2, 3, 5, 7, 9, 10],
  'phrygian': [0, 1, 3, 5, 7, 8, 10],
  'lydian': [0, 2, 4, 6, 7, 9, 11],
  'mixolydian': [0, 2, 4, 5, 7, 9, 10],
  'harmonic_minor': [0, 2, 3, 5, 7, 8, 11],
  'blues': [0, 3, 5, 6, 7, 10],
}

export type ScaleInterval = ObjectToPossibleType<typeof SCALE_INTERVALS>
export type Scale = keyof typeof SCALE_INTERVALS


export const MAX_FRETS = 23

export type Tuning = readonly PossibleNotes[]
export type NotePosition = {
  string: number,
  fret: number,
  note: PossibleNotes
}
export type ScalePositions = Partial<Record<PossibleNotes, NotePosition[]>>

export function generateTuning(rootNote: PossibleNotes, tuningPattern: TuningPattern) {
  const rootIndex = NOTES.indexOf(rootNote)

  if (rootIndex === -1 || !Array.isArray(tuningPattern) || tuningPattern.length === 0) {
    return []
  }

  const tuning = [rootNote]
  let currentIndex = rootIndex

  tuningPattern.forEach(interval => {
    currentIndex = (currentIndex + interval) % 12
    tuning.push(NOTES[currentIndex])
  })

  return tuning
}


// Calcular las notas de una escala
export function getScaleNotes(rootNote: PossibleNotes, scaleType: Scale) {
  const rootIndex = NOTES.indexOf(rootNote)
  const intervals = SCALE_INTERVALS[scaleType] || SCALE_INTERVALS.major
  
  return intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % 12
    return NOTES[noteIndex]
  })
}

export function findNotePositions(note: PossibleNotes, tuning: Tuning): NotePosition[] {
  const positions: NotePosition[] = []

  tuning.forEach((openString, stringIndex) => {
    const openStringIndex = NOTES.indexOf(openString)

    for (let fret = 0; fret <= MAX_FRETS; fret++) {
      const fretNoteIndex = (openStringIndex + fret) % 12
      const fretNote = NOTES[fretNoteIndex]

      if (fretNote === note) {
        positions.push({
          string: stringIndex,
          fret,
          note
        })
      }
    }
  })

  return positions;
}

// Obtener todas las posiciones para una escala
export function getScalePositions(rootNote: PossibleNotes, scaleType: Scale, tuning: Tuning): ScalePositions {
  const scaleNotes = getScaleNotes(rootNote, scaleType)
  const allPositions: ScalePositions = {}

  scaleNotes.forEach(note => {
    allPositions[note] = findNotePositions(note, tuning)
  })

  return allPositions;
}

import { getScalePositions, MAX_FRETS, TUNINGS } from '../utils/ScaleUtils'
import { useState, useEffect } from 'react'

function Diagram({ rootNote, scaleType, tuning}) {
  const scalePositions = getScalePositions(rootNote, scaleType, tuning)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 778)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])
  
  // Obtener todas las posiciones donde hay notas del acorde
  const activePositions = []

  Object.values(scalePositions).forEach(positions => {
    positions.forEach(pos => activePositions.push(pos))
  })


  const hasNote = (string, fret) => {
    return activePositions.some(pos => pos.string === string && pos.fret === fret)
  }

  const isRootNote = (note) => {
    return note === rootNote
  }

  const fretHasNotes = (fret) => {
    return activePositions.some(pos => pos.fret === fret)
  }

  const findNextFretWithNotes = (startFret) => {
    for (let f = startFret; f <= 12; f++) {
      if (fretHasNotes(f)) return f
    }
    return null
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

  const WIDTH = 1010
  const HEIGHT = 260
  const STRING_Y_START = 50
  const STRING_SPACING = 32
  const FRET_TOP = 30


  let FRET_BOTTOM = 230

  const NAMED_STRINGS = [];

  if (TUNINGS[tuning].length !== 6) {
    FRET_BOTTOM = TUNINGS[tuning].length * (230 / 5.5)


    if (TUNINGS[tuning].length < 6) {
      
      for (let l = 0; l < 6 - TUNINGS[tuning].length; l++){
            NAMED_STRINGS.push(null)
      }
      NAMED_STRINGS.push(...TUNINGS[tuning]);
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          minWidth: isSmallScreen ? '1000px' : 'auto',
          height: 'auto',
          display: 'block'
        }}
      >
      
        {/* Dibujar cuerdas horizontales */}
        {Array.from({ length: TUNINGS[tuning].length }, (_, string) => (
          <line
            key={`string-${string}`}
            x1={50}
            y1={STRING_Y_START + string * STRING_SPACING}
            x2={930}
            y2={STRING_Y_START + string * STRING_SPACING}
            stroke="#6d6d6d"
            strokeWidth="2"
          />
        ))}
      
      
        {/* Dibujar trastes verticales */}
        {Array.from({ length: MAX_FRETS }, (_, fret) => {
          
          return (
            <line
              style={{ display: fret === 0 ? 'none' : 'block' }}
              key={`fret-${fret}`}
              x1={50 + fret * 40}
              y1={FRET_TOP}
              x2={50 + fret * 40}
              y2={FRET_BOTTOM}
              stroke={ "#6d6d6d"}
              strokeWidth={fret === 1 ? "2" : "1"}
            />
          )
        })}
        
        
        {/* Dibujar puntos de las notas */}
        {Array.from({ length: TUNINGS[tuning].length}, (_, string) =>
          Array.from({ length: MAX_FRETS }, (_, fret) => {
            const position = activePositions.find(pos => pos.string === string && pos.fret === fret)
            return position && (
              <g key={`note-${string}-${fret}`}>
                <circle
                  cx={50 + fret * 40 + 20}
                  cy={STRING_Y_START + (TUNINGS[tuning].length - 1 - string) * STRING_SPACING}
                  r="11"
                  fill={isRootNote(position.note) ? "#e76363" : "#6d6d6d"}
                  stroke={isRootNote(position.note) ? "#e76363" : "#6d6d6d"}
                  strokeWidth="2"
                />
                <text
                  x={50 + fret * 40 + 20}
                  y={STRING_Y_START + (TUNINGS[tuning].length - 1 - string) * STRING_SPACING + 5}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="bold"
                  fill="white"
                >
                  {position.note}
                </text>
              </g>
            )
          })
        )}
        
        {/* Números de trastes */}
        {Array.from({ length: MAX_FRETS }, (_, fret) => (
        <text
            key={`fret-num-${fret}`}
            x={70 + fret * 40}
            y={20}
            textAnchor="middle"
            fontSize="12"
            fill="#666"
        >
            {fret}
        </text>
        ))}
        
        {/* Nombres de cuerdas - Dinámico basado en tuning */}
        {( NAMED_STRINGS.length > 0 ? NAMED_STRINGS : TUNINGS[tuning] || TUNINGS.standard_e).slice().reverse().map((note, index) => (
          <text
            key={`string-name-${index}`}
            x={25}
            y={STRING_Y_START + index * STRING_SPACING + 5}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#6d6d6d"
          >
            {note}
          </text>
        ))}
      </svg>
    </div>
  )

  
}

export default Diagram
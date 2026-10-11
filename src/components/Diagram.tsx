import { generateTuning, getScalePositions, MAX_FRETS, PossibleNotes, Scale, Tuning, TuningPattern } from '../utils/ScaleUtils'
import { useState, useEffect } from 'react'
import { indexedFrets } from '../utils/ScaleUtils'

type DiagramProps = {
  rootNote: PossibleNotes,
  scaleType: Scale,
  tuning: TuningPattern,
  tuningNote: PossibleNotes
}

export default function Diagram({ rootNote, scaleType, tuning, tuningNote}: DiagramProps) {
  const tuningNotes = generateTuning(tuningNote, tuning)
  const stringCount = tuningNotes.length || 6
  const scalePositions = getScalePositions(rootNote, scaleType, tuningNotes)

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
  const activePositions: Array<{ string: number; fret: number; note: PossibleNotes }> = []

  Object.values(scalePositions).forEach(positions => {
    positions.forEach(pos => activePositions.push(pos))
  })

  const isRootNote = (note: PossibleNotes) => {
    return note === rootNote
  }

  const WIDTH = 1010
  const HEIGHT = 260
  const STRING_Y_START = 50
  const STRING_SPACING = 32
  const FRET_TOP = 30

  let FRET_BOTTOM = 230

  if (stringCount !== 6) {
    FRET_BOTTOM = stringCount * (230 / 5.5)
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
        {Array.from({ length: stringCount }, (_, string) => (
          <line
            key={`string-${string}`}
            x1={50}
            y1={STRING_Y_START + string * STRING_SPACING}
            x2={42.12 * MAX_FRETS}
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
              stroke={ fret ===1 ? "#e76363": "#6d6d6d"}
              strokeWidth={fret === 1 ? "2" : "1"}
            />
          )
        })}
        
        
        {/* Dibujar puntos de las notas */}
        {Array.from({ length: stringCount }, (_, string) =>
          Array.from({ length: MAX_FRETS }, (_, fret) => {
            const position = activePositions.find(pos => pos.string === string && pos.fret === fret)
            return position && (
              <g key={`note-${string}-${fret}`}>
                <circle
                  cx={50 + fret * 40 + 20}
                  cy={STRING_Y_START + (stringCount - 1 - string) * STRING_SPACING}
                  r="11"
                  fill={isRootNote(position.note) ? "#e76363" : "#6d6d6d"}
                  stroke={isRootNote(position.note) ? "#e76363" : "#6d6d6d"}
                  strokeWidth="2"
                />
                <text
                  x={50 + fret * 40 + 20}
                  y={STRING_Y_START + (stringCount - 1 - string) * STRING_SPACING + 4}
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

        {/* Puntitos de los trastes*/}
        {Array.from({ length: MAX_FRETS }, (_, fret) => (
           fret === 12 ? (
            <g key={`fret-marker-${fret}`}>
              <circle
                cx={70 + fret * 40 - 8}
                cy={240}
                r="3"
                fill="#e76363"
              />

              <circle
                cx={70 + fret * 40 + 8}
                cy={240}
                r="3"
                fill="#e76363"
              />
            </g>
          ) : indexedFrets.includes(fret) && (
            <circle
              key={`fret-marker-${fret}`}
              cx={70 + fret * 40}
              cy={240}
              r="3"
              fill="#e76363"
              strokeWidth="0.3"
            />
          )
        ))},
        
        {/* Nombres de cuerdas - Dinámico basado en tuning */}
        {tuningNotes.slice().reverse().map((note, index) => (
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

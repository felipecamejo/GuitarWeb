import { getScalePositions, MAX_FRETS } from '../utils/ScaleUtils'
import { useState, useEffect } from 'react'

function Diagram({ rootNote, scaleType, easyRemember, tuning}) {
  const scalePositions = getScalePositions(rootNote, scaleType, tuning)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768)
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

  // Verificar si hay una nota en esta posición
  const hasNote = (string, fret) => {
    return activePositions.some(pos => pos.string === string && pos.fret === fret)
  }

  // Verificar si es la nota raíz
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

      const getRedFrets = () => {
    if (!easyRemember) return []
    
  const redFrets = []
    let offset = 0
    
    // Calcular para los primeros 12 trastes
    for (let fret = 4; fret <= 12; fret += 4) {
      const targetFret = fret + offset
      
      if (targetFret > 12) break
      
      if (fretHasNotes(targetFret)) {
        redFrets.push(targetFret)
      } else {
        const nextFret = findNextFretWithNotes(targetFret + 1)
        if (nextFret && nextFret <= 12) {
          redFrets.push(nextFret)
          offset += (nextFret - targetFret)
        }
      }
    }

    // Asegurar que el traste 12 esté incluido
    if (!redFrets.includes(12)) {
      redFrets.push(12)
    }
    
    
    // Repetir el patrón sumando 12 (segunda octava)
    const secondOctave = redFrets.map(fret => fret + 12).filter(fret => fret <= MAX_FRETS)
    
    return [...redFrets, ...secondOctave]
  }

  const redFrets = getRedFrets()


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
  const FRET_BOTTOM = 230

  return (
    <div className="chord-diagram" style={{ width: '100%' }}>
      <h3>{rootNote} {nameScaleType(scaleType)}</h3>
      
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
        {Array.from({ length: 6 }, (_, string) => (
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
          const shouldBeRed = redFrets.includes(fret)
          
          return (
            <line
              style={{ display: fret === 0 ? 'none' : 'block' }}
              key={`fret-${fret}`}
              x1={50 + fret * 40}
              y1={FRET_TOP}
              x2={50 + fret * 40}
              y2={FRET_BOTTOM}
              stroke={shouldBeRed ? "#e76363" : "#6d6d6d"}
              strokeWidth={fret === 1 || shouldBeRed ? "2" : "1"}
            />
          )
        })}
        
        
        {/* Dibujar puntos de las notas */}
        {Array.from({ length: 6 }, (_, string) =>
          Array.from({ length: MAX_FRETS }, (_, fret) => {
            const position = activePositions.find(pos => pos.string === string && pos.fret === fret)
            return position && (
              <g key={`note-${string}-${fret}`}>
                <circle
                  cx={50 + fret * 40 + 20}
                  cy={STRING_Y_START + (5 - string) * STRING_SPACING}
                  r="14"
                  fill={isRootNote(position.note) ? "#e76363" : "#6d6d6d"}
                  stroke={isRootNote(position.note) ? "#e76363" : "#6d6d6d"}
                  strokeWidth="2"
                />
                <text
                  x={50 + fret * 40 + 20}
                  y={STRING_Y_START + (5 - string) * STRING_SPACING + 5}
                  textAnchor="middle"
                  fontSize="12"
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
        
        {/* Nombres de cuerdas - Orden correcto de 6ta a 1ra */}
        {['E', 'B', 'G', 'D', 'A', 'E'].map((note, index) => (
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
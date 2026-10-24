import { generateTuning, getScalePositions, MAX_FRETS, NOTES, PossibleNotes, Scale, TuningPattern, indexedFrets } from '../utils/ScaleUtils'
import { useState, useEffect, useRef } from 'react'


type DiagramProps = {
  rootNote: PossibleNotes,
  scaleType: Scale,
  tuning: TuningPattern,
  tuningNote: PossibleNotes,
  refreshKey: number,
  onDiagramChanges: (hasChanges: boolean) => void
}

export default function Diagram({
  rootNote,
  scaleType,
  tuning,
  tuningNote,
  refreshKey,
  onDiagramChanges
}: DiagramProps) {
  const tuningNotes = generateTuning(tuningNote, tuning)
  const stringCount = tuningNotes.length || 6
  const scalePositions = getScalePositions(rootNote, scaleType, tuningNotes)

  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [hiddenPositions, setHiddenPositions] = useState<Set<string>>(new Set())
  const [addedPositions, setAddedPositions] = useState<Set<string>>(new Set())
  const [clickedPosition, setClickedPosition] = useState<{
    key: string
    direction: 'add' | 'remove'
  } | null>(null)
  const clickAnimationTimeout = useRef<number | undefined>(undefined)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 778)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    setHiddenPositions(new Set())
    setAddedPositions(new Set())
    setClickedPosition(null)
    onDiagramChanges(false)
  }, [rootNote, scaleType, tuningNote, tuning, refreshKey])

  useEffect(() => {
    return () => {
      if (clickAnimationTimeout.current !== undefined) {
        window.clearTimeout(clickAnimationTimeout.current)
      }
    }
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
  const STRING_Y_START = 50
  const STRING_SPACING = 32
  const FRET_TOP = 30

  let FRET_BOTTOM = 230

  if (stringCount !== 6) {
    FRET_BOTTOM = stringCount * (230 / 5.5)
  }

  if (stringCount > 6) {
    FRET_BOTTOM = STRING_Y_START + (stringCount - 1) * STRING_SPACING + 20
  }

  const HEIGHT = Math.max(260, FRET_BOTTOM + 10)

  const positionKey = (string: number, fret: number) => `${string}-${fret}`

  const handleClickFret = (string: number, fret: number) => {
    const key = positionKey(string, fret)
    const position = activePositions.find(pos => pos.string === string && pos.fret === fret)
    const isCurrentlyVisible = position
      ? !hiddenPositions.has(key)
      : addedPositions.has(key)

    if (!isCurrentlyVisible && !position) {
      return;
    }

    setClickedPosition({ key, direction: isCurrentlyVisible ? 'remove' : 'add' })
    if (clickAnimationTimeout.current !== undefined) {
      window.clearTimeout(clickAnimationTimeout.current)
    }
    clickAnimationTimeout.current = window.setTimeout(() => {
      setClickedPosition(null)
    }, 220)

    if (position) {
      setHiddenPositions(current => {
        const next = new Set(current)
        if (next.has(key)) {
          next.delete(key)
        } else {
          next.add(key)
        }
        onDiagramChanges(next.size > 0 || addedPositions.size > 0)
        return next
      })
      return
    }

    setAddedPositions(current => {
      const next = new Set(current)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      onDiagramChanges(hiddenPositions.size > 0 || next.size > 0)
      return next
    })
  }

  const getNoteAtPosition = (string: number, fret: number): PossibleNotes => {
    const openStringIndex = NOTES.indexOf(tuningNotes[string])
    return NOTES[(openStringIndex + fret) % NOTES.length]
  }

  return (
    <div style={{ width: '100%', marginBottom: '3rem' }}>
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
        
        
        {/* Dibujar puntos de las notas y celdas clickeables */}
        {Array.from({ length: stringCount }, (_, string) =>
          Array.from({ length: MAX_FRETS }, (_, fret) => {
            const position = activePositions.find(pos => pos.string === string && pos.fret === fret)
            const key = positionKey(string, fret)
            const note = position?.note ?? getNoteAtPosition(string, fret)
            const isVisible = Boolean((position && !hiddenPositions.has(key)) || addedPositions.has(key))
            const isGhost = Boolean(position && hiddenPositions.has(key))
            const isAnimatingRemoval = clickedPosition?.key === key && clickedPosition.direction === 'remove'
            const y = STRING_Y_START + (stringCount - 1 - string) * STRING_SPACING

            return (
              <g
                key={`note-${string}-${fret}`}
                className={`fret-position${clickedPosition?.key === key ? ` fret-position-${clickedPosition.direction}` : ''}`}
                opacity={isGhost ? 0.3 : 1}
                onClick={() => handleClickFret(string, fret)}
              >
                <rect
                  x={50 + fret * 40}
                  y={y - STRING_SPACING / 2}
                  width="40"
                  height={STRING_SPACING}
                  fill="transparent"
                />
                {(isVisible || isGhost || isAnimatingRemoval) && (
                  <>
                    <circle
                      cx={50 + fret * 40 + 20}
                      cy={y}
                      r="11"
                      fill={isRootNote(note) ? "#e76363" : "#6d6d6d"}
                      stroke={isRootNote(note) ? "#e76363" : "#6d6d6d"}
                      strokeWidth="2"
                    />
                    <text
                      x={50 + fret * 40 + 20}
                      y={y + 4}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight="bold"
                      fill="white"
                    >
                      {note}
                    </text>
                  </>
                )}
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
                cy={FRET_BOTTOM}
                r="3"
                fill="#e76363"
              />

              <circle
                cx={70 + fret * 40 + 8}
                cy={FRET_BOTTOM}
                r="3"
                fill="#e76363"
              />
            </g>
          ) : indexedFrets.includes(fret) && (
            <circle
              key={`fret-marker-${fret}`}
              cx={70 + fret * 40}
              cy={FRET_BOTTOM}
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

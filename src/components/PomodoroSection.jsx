import { useState, useEffect, useRef, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import SectionShell from './SectionShell'
import { SUBJECTS } from '../data/constants'

const MODES = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 }
const POMO_LABELS = { pc: '🔬 PC', math: '📐 Math', svt: '🌱 SVT', english: '🌍 Anglais', philo: '💭 Philo' }
const CIRC = 565.48

export default function PomodoroSection() {
  const { addStudyMins, getPomoCount, getPomoTotal, incrementPomo } = useApp()
  const [subject, setSubject] = useState('pc')
  const [mode, setMode] = useState('focus')
  const [remaining, setRemaining] = useState(MODES.focus)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  const reset = useCallback((m = mode) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setRunning(false)
    setRemaining(MODES[m])
  }, [mode])

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  const onComplete = useCallback(() => {
    document.title = '⏰ TERMINÉ! — BAC MISSION'
    if (mode === 'focus') {
      incrementPomo()
      addStudyMins(subject, 25)
      setMode('short')
      setRemaining(MODES.short)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('BAC MISSION', { body: 'Session terminée!' })
      } else {
        alert('⏰ Session terminée!')
      }
    } else {
      setRemaining(MODES[mode])
      alert('⏰ Pause terminée!')
    }
  }, [mode, subject, incrementPomo, addStudyMins])

  const start = () => {
    if (running) return
    setRunning(true)
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          onComplete()
          return 0
        }
        return r - 1
      })
    }, 1000)
  }

  const pause = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setRunning(false)
  }

  const m = Math.floor(remaining / 60)
  const s = remaining % 60
  const sub = SUBJECTS.find((x) => x.id === subject)
  const count = getPomoCount()
  const total = getPomoTotal()

  return (
    <SectionShell id={7} label="07 — FOCUS" title="Minuteur d'Étude">
      <div className="card pomo-card">
        <div className="pomo-subjects">
          {SUBJECTS.map((x) => (
            <button
              key={x.id}
              type="button"
              className={`pomo-sub${subject === x.id ? ' active' : ''}`}
              onClick={() => setSubject(x.id)}
            >
              {POMO_LABELS[x.id]}
            </button>
          ))}
        </div>
        <div className="pomo-modes">
          {[
            ['focus', 'FOCUS 25min'],
            ['short', 'COURTE PAUSE 5min'],
            ['long', 'LONGUE PAUSE 15min'],
          ].map(([k, label]) => (
            <button
              key={k}
              type="button"
              className={`pomo-mode${mode === k ? ' active' : ''}`}
              onClick={() => {
                setMode(k)
                if (intervalRef.current) clearInterval(intervalRef.current)
                setRunning(false)
                setRemaining(MODES[k])
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="pomo-ring-wrap">
          <svg className="pomo-ring" viewBox="0 0 200 200" aria-hidden>
            <circle className="pomo-ring-bg" cx="100" cy="100" r="90" />
            <circle
              className="pomo-ring-fill"
              cx="100"
              cy="100"
              r="90"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - remaining / MODES[mode])}
            />
          </svg>
          <div className="pomo-center">
            <div className="pomo-time">{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}</div>
            <div className="pomo-subject-name">{sub.icon} {sub.name}</div>
          </div>
        </div>
        <div className="pomo-controls">
          <button type="button" className="btn pomo-btn" onClick={start}>▶ Démarrer</button>
          <button type="button" className="btn pomo-btn" onClick={pause}>⏸ Pause</button>
          <button type="button" className="btn pomo-btn" onClick={() => reset()}>↺ Reset</button>
        </div>
        <div className="pomo-stats">
          Pomodoros aujourd&apos;hui: <strong>{count}</strong>
          <br />
          Temps total concentré: <strong>{Math.floor(total / 60)}h {total % 60}min</strong>
          <div className="tomatoes">{'🍅'.repeat(Math.min(count, 8))}</div>
        </div>
      </div>
    </SectionShell>
  )
}

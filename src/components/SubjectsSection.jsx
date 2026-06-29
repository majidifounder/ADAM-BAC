import { useState } from 'react'
import { useApp } from '../context/AppContext'
import SectionShell from './SectionShell'
import {
  SUBJECTS, PRIORITY_CLS, COEFF_CLS,
} from '../data/constants'
import { gradeColor, urgencyScore, prepLevel } from '../utils/helpers'

const GRID_ORDER = ['pc', 'math', 'english', 'svt', 'philo']

export default function SubjectsSection() {
  const { getStudyMins, addStudyMins, fmtMins, goToNotes } = useApp()
  const [flash, setFlash] = useState(null)

  const ordered = GRID_ORDER
    .map((id) => SUBJECTS.find((s) => s.id === id))
    .filter(Boolean)
    .sort((a, b) => urgencyScore(b) - urgencyScore(a))
    .sort((a, b) => GRID_ORDER.indexOf(a.id) - GRID_ORDER.indexOf(b.id))

  const uniqueOrdered = GRID_ORDER.map((id) => ordered.find((s) => s.id === id)).filter(Boolean)

  return (
    <SectionShell id={3} label="03 — PRIORITÉS" title="Tableau de Bord">
      <div className="subjects-grid">
        {uniqueOrdered.map((s) => {
          const urg = urgencyScore(s).toFixed(1)
          const prep = prepLevel(s, getStudyMins)
          return (
            <div
              key={s.id}
              className={`card sub-card ${s.cls}${s.priority === 'CRITIQUE' ? ' critical-glow' : ''}`}
            >
              <div className="sub-header">
                <span className="sub-name">{s.icon} {s.name}</span>
                <span className={`coeff-pill ${COEFF_CLS[s.coeff]}`}>×{s.coeff}</span>
              </div>
              <div className="grade-row">
                <span className="muted-sm">Note actuelle:</span>
                <span className={`grade-val ${gradeColor(s.grade)}`}>{s.grade}/20</span>
                <span className={`priority-badge ${PRIORITY_CLS[s.priority]}`}>{s.priority}</span>
              </div>
              <div className="urgency">
                <div className="urgency-label">Score d&apos;urgence: {urg}</div>
                <div className="urgency-bar">
                  <div className="urgency-fill" style={{ width: `${(urg / 7) * 100}%` }} />
                </div>
              </div>
              <div className="study-hours">
                Heures étudiées aujourd&apos;hui: <strong>{fmtMins(getStudyMins(s.id, 'today'))}</strong>
                <br />
                Total cette session: <strong className={flash === s.id ? 'flash-green' : ''}>
                  {fmtMins(getStudyMins(s.id, 'total'))}
                </strong>
              </div>
              <div className="quick-btns">
                {[25, 60, 120].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    className="quick-btn"
                    onClick={() => {
                      addStudyMins(s.id, mins)
                      if (mins === 60) {
                        setFlash(s.id)
                        setTimeout(() => setFlash(null), 400)
                      }
                    }}
                  >
                    {mins === 25 ? '+25min' : mins === 60 ? '+1h' : '+2h'}
                  </button>
                ))}
                <button type="button" className="notes-link" onClick={() => goToNotes(s.id)} aria-label={`Notes ${s.name}`}>
                  ✏️
                </button>
              </div>
              <div className="prep-bar-wrap">
                <div className="prep-label">
                  <span>Niveau de préparation estimé</span>
                  <span>{prep}%</span>
                </div>
                <div className="prep-bar">
                  <div className="prep-fill" style={{ width: `${prep}%` }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SectionShell>
  )
}

import { useState, useMemo } from 'react'
import SectionShell from './SectionShell'
import { SUBJECTS, COEFF_CLS, TOTAL_COEFF } from '../data/constants'
import { gradeColor } from '../utils/helpers'

const COLORS = { pc: '#171717', english: '#525252', math: '#404040', philo: '#737373', svt: '#262626' }
const LABELS = { pc: 'PC', english: 'Ang', math: 'Math', philo: 'Philo', svt: 'SVT' }

export default function CalculatorSection() {
  const [grades, setGrades] = useState(() =>
    Object.fromEntries(SUBJECTS.map((s) => [s.id, s.grade]))
  )

  const result = useMemo(() => {
    let sum = 0
    SUBJECTS.forEach((s) => { sum += (grades[s.id] || 0) * s.coeff })
    const avg = sum / TOTAL_COEFF
    let color = 'grade-red'
    let badge = '✗ Non admis — Continue !'
    let badgeCls = 'badge-fail'
    let marginText = `Points manquants: ${(10 - avg).toFixed(2)}`
    if (avg >= 10) {
      color = 'grade-green'
      badge = '✓ ADMIS — Félicitations!'
      badgeCls = 'badge-pass'
      marginText = `Points d'avance: +${(avg - 10).toFixed(2)}`
    } else if (avg >= 8) {
      color = 'grade-amber'
      badge = '⚠ ADMIS sous réserve (jury)'
      badgeCls = 'badge-warn'
      marginText = `Points manquants: ${(10 - avg).toFixed(2)}`
    }
    const totalContrib = SUBJECTS.reduce((a, s) => a + (grades[s.id] * s.coeff) / TOTAL_COEFF, 0)
    const segments = SUBJECTS.map((s) => {
      const contrib = (grades[s.id] * s.coeff) / TOTAL_COEFF
      const w = totalContrib > 0 ? (contrib / totalContrib) * 100 : 20
      return { id: s.id, contrib, w }
    })
    return { avg, color, badge, badgeCls, marginText, segments, formula: `(PC×7 + Ang×2 + Math×7 + Philo×2 + SVT×5) ÷ 23 = ${avg.toFixed(2)}/20` }
  }, [grades])

  const setGrade = (id, val) => {
    const n = Math.min(20, Math.max(0, parseFloat(val) || 0))
    setGrades((g) => ({ ...g, [id]: n }))
  }

  return (
    <SectionShell
      id={6}
      label="06 — SIMULATION"
      title="Simulateur de Note Finale"
      subtitle="Entrez vos estimations pour le rattrapage"
    >
      <div className="card">
        {SUBJECTS.map((s) => (
          <div key={s.id} className="calc-row">
            <div className="calc-label">
              {s.icon} {s.name}
              <span className={`coeff-pill ${COEFF_CLS[s.coeff]}`}>×{s.coeff}</span>
            </div>
            <input
              type="range"
              className="calc-slider"
              min="0"
              max="20"
              step="0.5"
              value={grades[s.id]}
              onChange={(e) => setGrade(s.id, e.target.value)}
            />
            <input
              type="number"
              className="calc-input"
              min="0"
              max="20"
              step="0.5"
              value={grades[s.id]}
              onChange={(e) => setGrade(s.id, e.target.value)}
            />
            <span className="calc-old">(ancienne: {s.grade}/20)</span>
          </div>
        ))}
        <div className="calc-result">
          <div className="calc-formula">{result.formula}</div>
          <div className={`calc-big ${result.color}`}>{result.avg.toFixed(2)}/20</div>
          <div className={`calc-badge ${result.badgeCls}`}>{result.badge}</div>
          <div className="calc-margin">{result.marginText}</div>
          <div className="stacked-bar">
            {result.segments.map((seg) => (
              <div
                key={seg.id}
                className="stack-seg"
                style={{ width: `${seg.w}%`, background: COLORS[seg.id] }}
                title={`${LABELS[seg.id]}: ${seg.contrib.toFixed(2)}`}
              >
                {seg.w > 10 ? LABELS[seg.id] : ''}
              </div>
            ))}
          </div>
          <div className="stack-legend">
            {result.segments.map((seg) => (
              <span key={seg.id}>
                <span className="legend-dot" style={{ background: COLORS[seg.id] }} />
                {LABELS[seg.id]} ({seg.contrib.toFixed(1)})
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

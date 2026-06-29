import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import SectionShell from './SectionShell'
import {
  getCountdown, weightedStudyHours, currentWeightedAvg, countAllTopics,
} from '../utils/helpers'

export default function HeroSection() {
  const { tick, panic, togglePanic, getStudyMins, isTopicDone } = useApp()
  const { days, hrs, mins, secs, urgent } = getCountdown()
  const readiness = Math.min(100, Math.round(weightedStudyHours(getStudyMins) / 30 * 100))
  const topics = countAllTopics((subId, idx) => isTopicDone(subId, idx))
  const daysLeft = Math.ceil(Math.max(0, getCountdown().target - new Date()) / 86400000)
  const avg = currentWeightedAvg()
  const dateStr = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  useEffect(() => {
    document.title = `⏱ ${days}j ${hrs}h ${mins}m — BAC MISSION`
  }, [days, hrs, mins, tick])

  return (
    <SectionShell id={1} label="01 — COMPTE À REBOURS" title="MISSION BACCALAURÉAT">
      <div className="topbar">
        <div className="logo-text">
          <span className="live-dot" />
          BAC MISSION 2025
          <span className="live-tag">LIVE</span>
        </div>
        <div className="topbar-right">
          <span>{dateStr}</span>
          <button type="button" className="btn btn-panic" onClick={togglePanic}>
            {panic ? 'DÉSACTIVER PANIC MODE' : 'PANIC MODE'}
          </button>
        </div>
      </div>

      <p className="hero-sub">PC • Sciences Physiques • Session de Rattrapage</p>

      <div className="stats-strip">
        <div className="stat-chip crit">
          <div className="stat-chip-val">{daysLeft}</div>
          <div className="stat-chip-label">Jours restants</div>
        </div>
        <div className="stat-chip warn">
          <div className="stat-chip-val">{avg.toFixed(1)}</div>
          <div className="stat-chip-label">Moyenne actuelle</div>
        </div>
        <div className="stat-chip ok">
          <div className="stat-chip-val">{readiness}%</div>
          <div className="stat-chip-label">Préparation</div>
        </div>
        <div className="stat-chip">
          <div className="stat-chip-val">{topics.done}/{topics.total}</div>
          <div className="stat-chip-label">Chapitres</div>
        </div>
      </div>

      <div className={`countdown${urgent ? ' urgent' : ''}`}>
        {[['JOURS', days], ['HEURES', hrs], ['MINUTES', mins], ['SECONDES', secs]].map(([l, v]) => (
          <div key={l} className="count-block">
            <div className="count-num">{String(v).padStart(2, '0')}</div>
            <div className="count-label">{l}</div>
          </div>
        ))}
      </div>

      <div className="readiness">
        <span className="readiness-label">Préparation globale</span>
        <div className="readiness-bar">
          <div className="readiness-fill" style={{ width: `${readiness}%` }} />
        </div>
        <span className="readiness-pct">{readiness}%</span>
      </div>
    </SectionShell>
  )
}

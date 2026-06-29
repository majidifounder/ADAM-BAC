import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import SectionShell from './SectionShell'
import { QUOTES, SUBJECTS } from '../data/constants'
import { countAllTopics, countAllPlanTasks } from '../utils/helpers'

export default function FooterSection() {
  const { getStudyMins, isTopicDone, isPlanTaskDone, fmtMins } = useApp()
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setFade(true)
      setTimeout(() => {
        setQuoteIdx((i) => (i + 1) % QUOTES.length)
        setFade(false)
      }, 500)
    }, 8000)
    return () => clearInterval(id)
  }, [])

  let totalMins = 0
  SUBJECTS.forEach((s) => { totalMins += getStudyMins(s.id, 'total') })
  const topics = countAllTopics(isTopicDone)
  const plan = countAllPlanTasks((di, ti) => isPlanTaskDone(di, ti))

  return (
    <SectionShell id={9} label="09 — MOTIVATION" title="">
      <div className="quote-wrap">
        <p className={`quote${fade ? ' fade' : ''}`}>{QUOTES[quoteIdx]}</p>
      </div>
      <div className="footer-stats">
        <div>Heures totales étudiées: <strong>{fmtMins(totalMins)}</strong></div>
        <div>Chapitres validés: <strong>{topics.done} / {topics.total}</strong></div>
        <div>Tâches journalières complétées: <strong>{plan.done} / {plan.total}</strong></div>
      </div>
      <p className="copyright">BAC MISSION 2025 • Bonne chance ! 🎓</p>
    </SectionShell>
  )
}

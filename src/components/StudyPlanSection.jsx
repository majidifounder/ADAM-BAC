import { useState } from 'react'
import { useApp } from '../context/AppContext'
import SectionShell, { TaskCheck } from './SectionShell'
import { PLAN } from '../data/constants'
import { getPlanDayIndex } from '../utils/helpers'

export default function StudyPlanSection() {
  const { isPlanTaskDone, togglePlanTask } = useApp()
  const todayTab = getPlanDayIndex()
  const [activeDay, setActiveDay] = useState(todayTab)

  const day = PLAN[activeDay]
  const doneCount = day.tasks.filter((_, ti) => isPlanTaskDone(activeDay, ti)).length

  return (
    <SectionShell id={4} label="04 — PLANNING" title="Plan d'Étude Quotidien">
      <div className="tabs" role="tablist">
        {PLAN.map((p, i) => (
          <button
            key={p.label}
            type="button"
            role="tab"
            aria-selected={activeDay === i}
            className={`tab${activeDay === i ? ' active' : ''}${i === todayTab ? ' has-dot' : ''}`}
            onClick={() => setActiveDay(i)}
          >
            {p.label}
            <span className="tab-dot" />
          </button>
        ))}
      </div>

      <div className="tab-panel active" role="tabpanel">
        {day.tasks.map((t, ti) => {
          const done = isPlanTaskDone(activeDay, ti)
          return (
            <div key={ti} className={`plan-task${done ? ' done' : ''}`}>
              <TaskCheck
                checked={done}
                onToggle={() => togglePlanTask(activeDay, ti)}
                label={t.d}
              />
              <div className="task-meta">
                <span className="task-time">{t.t}</span>
                <span className={`task-badge ${t.bc}`}>{t.b}</span>
              </div>
              <span className="task-desc">{t.d}</span>
            </div>
          )
        })}
        <div className="day-progress">
          <span>{doneCount} / {day.tasks.length} tâches complétées</span>
          <div className="day-progress-bar">
            <div className="day-progress-fill" style={{ width: `${(doneCount / day.tasks.length) * 100}%` }} />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

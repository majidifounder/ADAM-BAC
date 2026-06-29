import { useApp } from '../context/AppContext'
import SectionShell, { TaskCheck } from './SectionShell'
import { SUBJECTS, TOPICS } from '../data/constants'

export default function TopicsSection() {
  const { isTopicDone, toggleTopic, isAccordionOpen, toggleAccordion } = useApp()

  return (
    <SectionShell id={5} label="05 — CHAPITRES" title="Chapitres à Maîtriser">
      {SUBJECTS.map((s) => {
        const topics = TOPICS[s.id]
        const open = isAccordionOpen(s.id)
        const doneCount = topics.filter((_, i) => isTopicDone(s.id, i)).length
        return (
          <div key={s.id} className="accordion">
            <button
              type="button"
              className="acc-header"
              aria-expanded={open}
              onClick={() => toggleAccordion(s.id)}
            >
              <span className="acc-title">{s.icon} {s.name}</span>
              <span className="acc-count">{doneCount}/{topics.length} chapitres</span>
            </button>
            {open && (
              <div className="acc-body open">
                {topics.map((t, i) => {
                  const done = isTopicDone(s.id, i)
                  return (
                    <div
                      key={i}
                      className={`acc-item${done ? ' done' : ''}`}
                      onClick={() => toggleTopic(s.id, i)}
                      onKeyDown={(e) => e.key === 'Enter' && toggleTopic(s.id, i)}
                      role="button"
                      tabIndex={0}
                    >
                      <TaskCheck
                        checked={done}
                        onToggle={() => toggleTopic(s.id, i)}
                        label={t}
                      />
                      <span>{t}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </SectionShell>
  )
}

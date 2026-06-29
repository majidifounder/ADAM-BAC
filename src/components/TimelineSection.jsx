import SectionShell from './SectionShell'
import { DAY_NAMES } from '../data/constants'
import { getTimelineDays, getTimelineCard } from '../utils/helpers'

export default function TimelineSection() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <SectionShell id={2} label="02 — CALENDRIER" title="Timeline des Examens">
      <div className="timeline-wrap">
        <div className="timeline">
          {getTimelineDays().map((d) => {
            const { dow, isToday, isPast, isExam, content } = getTimelineCard(d, today)
            return (
              <div
                key={d.toISOString()}
                className={`tl-card${isToday ? ' today' : ''}${isExam ? ' exam' : ''}${isPast ? ' past' : ''}`}
              >
                {isExam && <span className="exam-badge">EXAM</span>}
                <div className="tl-day">{DAY_NAMES[dow]}</div>
                <div className="tl-date">{d.getDate()}</div>
                <div className="tl-content">{content}</div>
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}

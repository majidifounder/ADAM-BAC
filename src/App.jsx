import { useEffect } from 'react'
import { useApp } from './context/AppContext'
import { SECTIONS } from './data/constants'
import { getCountdown } from './utils/helpers'
import HeroSection from './components/HeroSection'
import TimelineSection from './components/TimelineSection'
import SubjectsSection from './components/SubjectsSection'
import StudyPlanSection from './components/StudyPlanSection'
import TopicsSection from './components/TopicsSection'
import CalculatorSection from './components/CalculatorSection'
import PomodoroSection from './components/PomodoroSection'
import NotesSection from './components/NotesSection'
import FooterSection from './components/FooterSection'

const SECTION_MAP = {
  1: HeroSection,
  2: TimelineSection,
  3: SubjectsSection,
  4: StudyPlanSection,
  5: TopicsSection,
  6: CalculatorSection,
  7: PomodoroSection,
  8: NotesSection,
  9: FooterSection,
}

function TopBar() {
  const { panic, togglePanic } = useApp()
  const { days, hrs, mins, secs, urgent } = getCountdown()

  return (
    <header className="top-bar">
      <div className="top-bar-brand">
        <span className="live-dot" aria-hidden="true" />
        <span className="top-bar-title">BAC 2025</span>
      </div>
      <span className={`sticky-countdown${urgent ? ' urgent' : ''}`} aria-live="polite">
        {days}j {hrs}h {mins}m {secs}s
      </span>
      <button
        type="button"
        className={`btn btn-panic btn-sm top-panic${panic ? ' active' : ''}`}
        onClick={togglePanic}
        aria-pressed={panic}
      >
        {panic ? 'PANIC ON' : 'PANIC'}
      </button>
    </header>
  )
}

function BottomNav() {
  const { activeSection, setActiveSection } = useApp()

  return (
    <nav className="bottom-nav" aria-label="Navigation principale">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          className={`bottom-nav-btn${activeSection === s.id ? ' active' : ''}`}
          onClick={() => setActiveSection(s.id)}
          aria-current={activeSection === s.id ? 'page' : undefined}
          aria-label={s.title}
        >
          <span className="bottom-nav-icon" aria-hidden="true">{s.icon}</span>
          <span className="bottom-nav-label">{s.short}</span>
        </button>
      ))}
    </nav>
  )
}

export default function App() {
  const { panic, activeSection } = useApp()
  const ActiveComponent = SECTION_MAP[activeSection] || HeroSection

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('root')?.scrollTo?.({ top: 0, behavior: 'instant' })
  }, [activeSection])

  return (
    <div className={`app${panic ? ' panic' : ''}`}>
      {panic && (
        <div className="panic-banner" role="alert">
          PANIC MODE — Concentre-toi sur PC et Maths
        </div>
      )}
      <div className="wrap">
        <TopBar />
        <main className="section-block" key={activeSection}>
          <ActiveComponent />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}

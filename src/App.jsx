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
  const { panic, togglePanic, activeSection, setActiveSection } = useApp()
  const { days, hrs, mins, secs, urgent } = getCountdown()

  return (
    <header className="top-bar">
      <span className={`sticky-countdown${urgent ? ' urgent' : ''}`}>
        ⏱ {days}j {hrs}h {mins}m {secs}s
      </span>
      <nav className="nav-jump" aria-label="Sections">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`nav-btn${activeSection === s.id ? ' active' : ''}`}
            onClick={() => setActiveSection(s.id)}
            aria-current={activeSection === s.id ? 'page' : undefined}
          >
            {s.label}
          </button>
        ))}
      </nav>
      <button type="button" className="btn btn-panic btn-sm" onClick={togglePanic}>
        {panic ? 'OFF' : 'PANIC'}
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
        >
          <span className="bottom-nav-icon">{s.icon}</span>
          <span className="bottom-nav-label">{s.title}</span>
        </button>
      ))}
    </nav>
  )
}

export default function App() {
  const { panic, activeSection } = useApp()
  const ActiveComponent = SECTION_MAP[activeSection] || HeroSection

  return (
    <div className={`app${panic ? ' panic' : ''}`}>
      {panic && (
        <div className="panic-banner" role="alert">
          ⚠ PANIC MODE — Concentre-toi sur l&apos;ESSENTIEL
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

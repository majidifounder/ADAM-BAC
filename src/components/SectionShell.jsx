import { useApp } from '../context/AppContext'

export default function SectionShell({ id, label, title, subtitle, children }) {
  return (
    <section className="section-view" id={`s${id}`} aria-labelledby={`title-${id}`}>
      <p className="sec-label">{label}</p>
      <h2 className="sec-title" id={`title-${id}`}>{title}</h2>
      {subtitle && <p className="sec-sub">{subtitle}</p>}
      {children}
    </section>
  )
}

export function TaskCheck({ checked, onToggle, label }) {
  return (
    <button
      type="button"
      className={`task-check${checked ? ' checked' : ''}`}
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={(e) => { e.stopPropagation(); onToggle() }}
    >
      {checked ? '✓' : ''}
    </button>
  )
}

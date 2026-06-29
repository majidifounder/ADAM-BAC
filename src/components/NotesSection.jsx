import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import SectionShell from './SectionShell'
import { SUBJECTS } from '../data/constants'

export default function NotesSection() {
  const { notesSubject, setNotesSubject, getNote, saveNote } = useApp()
  const [text, setText] = useState(() => getNote(notesSubject))
  const [saved, setSaved] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    setText(getNote(notesSubject))
  }, [notesSubject, getNote])

  const onChange = (val) => {
    setText(val)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      saveNote(notesSubject, val)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 500)
  }

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const sub = SUBJECTS.find((s) => s.id === notesSubject)

  return (
    <SectionShell id={8} label="08 — NOTES" title="Notes Rapides">
      <div className="tabs" role="tablist">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={notesSubject === s.id}
            className={`tab${notesSubject === s.id ? ' active' : ''}`}
            onClick={() => setNotesSubject(s.id)}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>
      <div className="tab-panel active">
        <textarea
          className="notes-area"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Notez vos formules clés, points importants, et rappels ici..."
          aria-label={`Notes ${sub?.name}`}
        />
        <div className="notes-meta">
          <span className={`saved-msg${saved ? ' show' : ''}`}>Sauvegardé automatiquement ✓</span>
          <span>{words} mots</span>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              if (confirm('Êtes-vous sûr ?')) {
                setText('')
                saveNote(notesSubject, '')
              }
            }}
          >
            Effacer
          </button>
        </div>
      </div>
    </SectionShell>
  )
}

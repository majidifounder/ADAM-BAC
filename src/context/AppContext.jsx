import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { SUBJECTS, TOPICS, PLAN } from '../data/constants'
import { ls, ss, getRaw, setRaw, checkDayReset } from '../utils/storage'
import { fmtMins } from '../utils/helpers'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [tick, setTick] = useState(0)
  const [panic, setPanic] = useState(() => ls('panic_mode', false))
  const [activeSection, setActiveSection] = useState(1)
  const [notesSubject, setNotesSubject] = useState('pc')
  const [version, setVersion] = useState(0)
  const bump = useCallback(() => setVersion((v) => v + 1), [])

  useEffect(() => {
    checkDayReset(SUBJECTS)
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    ss('panic_mode', panic)
    document.body.classList.toggle('panic', panic)
  }, [panic])

  const getStudyMins = useCallback((subId, type) => {
    const k = type === 'today' ? `study_hours_TODAY_${subId}` : `study_hours_TOTAL_${subId}`
    return ls(k, 0)
  }, [version])

  const addStudyMins = useCallback((subId, mins) => {
    ss(`study_hours_TODAY_${subId}`, getStudyMins(subId, 'today') + mins)
    ss(`study_hours_TOTAL_${subId}`, getStudyMins(subId, 'total') + mins)
    bump()
  }, [getStudyMins, bump])

  const isPlanTaskDone = useCallback((dayIdx, taskIdx) => {
    return ls(`plan_day${dayIdx + 1}_task${taskIdx}`, false)
  }, [version])

  const togglePlanTask = useCallback((dayIdx, taskIdx) => {
    const key = `plan_day${dayIdx + 1}_task${taskIdx}`
    ss(key, !ls(key, false))
    bump()
  }, [bump])

  const isTopicDone = useCallback((subId, idx) => {
    return ls(`topic_${subId}_${idx}`, false)
  }, [version])

  const toggleTopic = useCallback((subId, idx) => {
    const key = `topic_${subId}_${idx}`
    ss(key, !ls(key, false))
    bump()
  }, [bump])

  const isAccordionOpen = useCallback((subId) => {
    const defaults = { pc: true, math: true, svt: false, english: false, philo: false }
    return ls(`accordion_state_${subId}`, defaults[subId] ?? false)
  }, [version])

  const toggleAccordion = useCallback((subId) => {
    ss(`accordion_state_${subId}`, !isAccordionOpen(subId))
    bump()
  }, [isAccordionOpen, bump])

  const getNote = useCallback((subId) => getRaw(`notes_${subId}`, ''), [version])

  const saveNote = useCallback((subId, text) => {
    setRaw(`notes_${subId}`, text)
    bump()
  }, [bump])

  const getPomoCount = useCallback(() => ls('pomodoro_count_today', 0), [version])
  const getPomoTotal = useCallback(() => ls('pomodoro_total_minutes', 0), [version])

  const incrementPomo = useCallback(() => {
    ss('pomodoro_count_today', getPomoCount() + 1)
    ss('pomodoro_total_minutes', getPomoTotal() + 25)
    bump()
  }, [getPomoCount, getPomoTotal, bump])

  const togglePanic = useCallback(() => {
    setPanic((p) => {
      const next = !p
      if (next) {
        setActiveSection(4)
        ;['svt', 'english', 'philo'].forEach((id) => ss(`accordion_state_${id}`, false))
        ;['pc', 'math'].forEach((id) => ss(`accordion_state_${id}`, true))
        bump()
      }
      return next
    })
  }, [bump])

  const goToNotes = useCallback((subId) => {
    setNotesSubject(subId)
    setActiveSection(8)
  }, [])

  const value = useMemo(() => ({
    tick, panic, setPanic, togglePanic, activeSection, setActiveSection,
    notesSubject, setNotesSubject, goToNotes, version, bump,
    getStudyMins, addStudyMins, fmtMins,
    isPlanTaskDone, togglePlanTask,
    isTopicDone, toggleTopic,
    isAccordionOpen, toggleAccordion,
    getNote, saveNote,
    getPomoCount, getPomoTotal, incrementPomo,
  }), [
    tick, panic, togglePanic, activeSection, notesSubject, goToNotes, version, bump,
    getStudyMins, addStudyMins, isPlanTaskDone, togglePlanTask,
    isTopicDone, toggleTopic, isAccordionOpen, toggleAccordion,
    getNote, saveNote, getPomoCount, getPomoTotal, incrementPomo,
  ])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
